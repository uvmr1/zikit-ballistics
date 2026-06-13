from __future__ import annotations

import json
import re
from collections import OrderedDict
from pathlib import Path

import openpyxl


ROOT = Path(__file__).resolve().parents[1]
INPUT_XLSX = ROOT / "ballistics_table.xlsx"
OUTPUT_TS = ROOT / "src" / "data" / "ballistics.ts"
SHEET_NAME = "פורמט לאפליקציה"


def normalize_number(value):
    if isinstance(value, float) and value.is_integer():
        return int(value)
    return value


def extract_number(value):
    if isinstance(value, (int, float)):
        return normalize_number(value)

    match = re.search(r"-?\d+(?:\.\d+)?", str(value))
    if not match:
        raise ValueError(f"Cannot extract number from {value!r}")

    number = float(match.group(0))
    return normalize_number(number)


def split_sight_options(value):
    return [
        sight.strip()
        for sight in str(value).split(",")
        if sight and sight.strip()
    ]


def load_profiles():
    workbook = openpyxl.load_workbook(INPUT_XLSX, data_only=True)
    worksheet = workbook[SHEET_NAME]
    rows = list(worksheet.iter_rows(values_only=True))
    headers = [str(header).strip() for header in rows[0]]
    profiles = OrderedDict()

    for row in rows[1:]:
        if not row or not row[0]:
            continue

        record = dict(zip(headers, row))
        profile_id = str(record["profile_id"])
        profile = profiles.setdefault(
            profile_id,
            {
                "id": profile_id,
                "weapon": str(record["weapon"]),
                "sight": str(record["sight"]),
                "zeroRangeMeters": extract_number(record["zero_range_m"]),
                "points": [],
            },
        )
        profile["points"].append(
            {
                "rangeMeters": extract_number(record["range_m"]),
                "deviationCm": normalize_number(record["deviation_cm"]),
            }
        )

    for profile in profiles.values():
        profile["points"].sort(key=lambda point: point["rangeMeters"])

    expanded_profiles = []

    for profile in profiles.values():
        sights = split_sight_options(profile["sight"])

        for index, sight in enumerate(sights):
            expanded_profiles.append(
                {
                    **profile,
                    "id": (
                        profile["id"]
                        if len(sights) == 1
                        else f"{profile['id']}_{index + 1:02d}"
                    ),
                    "sight": sight,
                    "points": [dict(point) for point in profile["points"]],
                }
            )

    return expanded_profiles


def write_typescript(profiles):
    payload = json.dumps(profiles, ensure_ascii=False, indent=2)
    source = f"""export type BallisticPoint = {{
  rangeMeters: number;
  deviationCm: number;
}};

export type BallisticProfile = {{
  id: string;
  weapon: string;
  sight: string;
  zeroRangeMeters: number;
  points: BallisticPoint[];
}};

export const ballisticProfiles: BallisticProfile[] = {payload};

export const uniqueWeapons = Array.from(
  new Set(ballisticProfiles.map((profile) => profile.weapon)),
);
"""
    OUTPUT_TS.write_text(source, encoding="utf-8")


if __name__ == "__main__":
    write_typescript(load_profiles())
    print(f"Wrote {OUTPUT_TS}")
