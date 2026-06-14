import { useMemo, useRef } from "react";
import {
  CartesianGrid,
  Line,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";
import type { BallisticProfile } from "../data/ballistics";
import {
  buildVisualCurveSeries,
  clampRange,
  getInterpolatedDeviation,
  getSortedPoints,
  type InterpolatedDeviation,
} from "../utils/interpolation";

type BallisticChartProps = {
  profile: BallisticProfile;
  marker: InterpolatedDeviation;
  onMarkerChange: (reading: InterpolatedDeviation) => void;
};

const chartMargins = { top: 26, right: 0, bottom: 22, left: 0 };
const pointerInset = { left: 2, right: 4 };

export function BallisticChart({
  profile,
  marker,
  onMarkerChange,
}: BallisticChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const sortedPoints = useMemo(
    () => getSortedPoints(profile.points),
    [profile.points],
  );

  const series = useMemo(
    () => buildVisualCurveSeries(sortedPoints),
    [sortedPoints],
  );

  const yDomain = useMemo(() => {
    const deviations = sortedPoints.map((point) => point.deviationCm);
    const min = Math.min(...deviations, 0);
    const max = Math.max(...deviations, 0);
    const padding = Math.max(4, Math.ceil((max - min) * 0.15));

    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [sortedPoints]);

  const minRange = 0;
  const maxRange = sortedPoints[sortedPoints.length - 1].rangeMeters;

  const updateFromClientX = (clientX: number) => {
    const rect = chartRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const usableWidth = Math.max(
      rect.width - pointerInset.left - pointerInset.right,
      1,
    );
    const x = Math.min(
      Math.max(clientX - rect.left - pointerInset.left, 0),
      usableWidth,
    );
    const ratio = x / usableWidth;
    const rangeMeters = clampRange(
      sortedPoints,
      minRange + ratio * (maxRange - minRange),
    );

    onMarkerChange(getInterpolatedDeviation(sortedPoints, rangeMeters));
  };

  return (
    <section className="chartPanel" aria-label="גרף סטייה לפי טווח">
      <div
        className="chartWrap"
        ref={chartRef}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (event.buttons > 0 || event.pointerType === "touch") {
            updateFromClientX(event.clientX);
          }
        }}
        onPointerUp={(event) => {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={series}
            margin={chartMargins}
            accessibilityLayer
            onMouseMove={(state) => {
              const chartState = state as {
                activePayload?: { payload?: InterpolatedDeviation }[];
              };
              const point = chartState.activePayload?.[0]?.payload;

              if (point) {
                onMarkerChange(getInterpolatedDeviation(sortedPoints, point.rangeMeters));
              }
            }}
          >
            <CartesianGrid stroke="#24442e" strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="rangeMeters"
              domain={[minRange, maxRange]}
              padding={{ left: 0, right: 0 }}
              tick={{ fill: "#d6ead8", fontSize: 12 }}
              tickLine={{ stroke: "#4f7659" }}
              axisLine={{ stroke: "#4f7659" }}
              unit=" מ׳"
            />
            <YAxis
              type="number"
              domain={yDomain}
              tick={false}
              tickLine={false}
              axisLine={false}
              width={0}
            />
            <ReferenceLine
              y={0}
              stroke="#9dbb9f"
              strokeDasharray="4 4"
              label={{
                value: "קו איפוס",
                fill: "#bdd5bf",
                fontSize: 12,
                position: "insideTopRight",
              }}
            />
            <Line
              type="natural"
              dataKey="deviationCm"
              stroke="#62d36f"
              strokeWidth={4}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
            <ReferenceLine
              x={marker.rangeMeters}
              stroke="#f4ffe7"
              strokeOpacity={0.55}
            />
            <ReferenceDot
              x={marker.rangeMeters}
              y={marker.deviationCm}
              r={5}
              fill="#f4ffe7"
              stroke="#0c160e"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="chartNote">
        המספרים מחושבים בקירוב לינארי; הקו מוחלק להצגה חזותית.
      </p>
    </section>
  );
}
