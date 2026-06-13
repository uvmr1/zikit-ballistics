type WeaponSelectorProps = {
  weapons: string[];
  value: string;
  onChange: (value: string) => void;
};

export function WeaponSelector({
  weapons,
  value,
  onChange,
}: WeaponSelectorProps) {
  return (
    <label className="field">
      <span>בחירת נשק</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="בחירת נשק"
      >
        {weapons.map((weapon) => (
          <option key={weapon} value={weapon}>
            {weapon}
          </option>
        ))}
      </select>
    </label>
  );
}
