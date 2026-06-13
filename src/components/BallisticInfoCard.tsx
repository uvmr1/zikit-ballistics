import type { BallisticProfile } from "../data/ballistics";

type BallisticInfoCardProps = {
  profile: BallisticProfile;
};

export function BallisticInfoCard({ profile }: BallisticInfoCardProps) {
  return (
    <section className="infoCard" aria-label="פרטי פרופיל">
      <div>
        <span>נשק</span>
        <strong>{profile.weapon}</strong>
      </div>
      <div>
        <span>כוונת</span>
        <strong>{profile.sight}</strong>
      </div>
      <div>
        <span>מתאפס לראשונה</span>
        <strong>{profile.zeroRangeMeters} מטר</strong>
      </div>
    </section>
  );
}
