type SightSelectorProps = {
  sights: string[];
  value: string;
  onChange: (value: string) => void;
};

export function SightSelector({ sights, value, onChange }: SightSelectorProps) {
  return (
    <label className="field choiceCard">
      <span className="choiceLabel">כוונת</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="בחירת כוונת"
      >
        {sights.map((sight) => (
          <option key={sight} value={sight}>
            {sight}
          </option>
        ))}
      </select>
    </label>
  );
}
