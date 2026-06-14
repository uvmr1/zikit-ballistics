import { useEffect, useMemo, useState } from "react";
import { BallisticChart } from "../components/BallisticChart";
import { DeviationReadout } from "../components/DeviationReadout";
import { SightSelector } from "../components/SightSelector";
import { WeaponSelector } from "../components/WeaponSelector";
import { ballisticProfiles, uniqueWeapons } from "../data/ballistics";
import {
  getInterpolatedDeviation,
  type InterpolatedDeviation,
} from "../utils/interpolation";

export function BallisticsPage() {
  const [selectedWeapon, setSelectedWeapon] = useState(uniqueWeapons[0]);
  const [selectedSight, setSelectedSight] = useState(
    ballisticProfiles[0].sight,
  );
  const [marker, setMarker] = useState<InterpolatedDeviation>(() =>
    getInterpolatedDeviation(
      ballisticProfiles[0].points,
      ballisticProfiles[0].points[0].rangeMeters,
    ),
  );

  const visibleProfiles = useMemo(() => {
    return ballisticProfiles;
  }, []);

  const weapons = useMemo(() => {
    const source = visibleProfiles.length > 0 ? visibleProfiles : ballisticProfiles;
    return Array.from(new Set(source.map((profile) => profile.weapon)));
  }, [visibleProfiles]);

  const sights = useMemo(() => {
    const source = visibleProfiles.length > 0 ? visibleProfiles : ballisticProfiles;
    return Array.from(
      new Set(
        source
          .filter((profile) => profile.weapon === selectedWeapon)
          .map((profile) => profile.sight),
      ),
    );
  }, [selectedWeapon, visibleProfiles]);

  const selectedProfile = useMemo(() => {
    return (
      ballisticProfiles.find(
        (profile) =>
          profile.weapon === selectedWeapon && profile.sight === selectedSight,
      ) ?? ballisticProfiles[0]
    );
  }, [selectedSight, selectedWeapon]);

  useEffect(() => {
    if (!weapons.includes(selectedWeapon)) {
      setSelectedWeapon(weapons[0]);
      return;
    }

    if (sights.length > 0 && !sights.includes(selectedSight)) {
      setSelectedSight(sights[0]);
    }
  }, [selectedSight, selectedWeapon, sights, weapons]);

  useEffect(() => {
    setMarker(
      getInterpolatedDeviation(
        selectedProfile.points,
        selectedProfile.points[0].rangeMeters,
      ),
    );
  }, [selectedProfile]);

  return (
    <main className="appShell">
      <header className="hero">
        <img className="companyLogo" src="/zikit-flat.png" alt="לוגו זיקית" />
        <div>
          <h1>ZIKIT BALLISTICS</h1>
        </div>
      </header>

      <section className="controls" aria-label="בחירת פרופיל">
        <WeaponSelector
          weapons={weapons}
          value={selectedWeapon}
          onChange={setSelectedWeapon}
        />
        <SightSelector
          sights={sights}
          value={selectedSight}
          onChange={setSelectedSight}
        />
      </section>

      <DeviationReadout reading={marker} />

      <BallisticChart
        profile={selectedProfile}
        marker={marker}
        onMarkerChange={setMarker}
      />

      <footer>רכוש פלגה ב</footer>
    </main>
  );
}
