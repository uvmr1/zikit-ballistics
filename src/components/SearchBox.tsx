import { Search } from "lucide-react";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className="field">
      <span>חיפוש מהיר</span>
      <div className="inputIconWrap">
        <Search aria-hidden="true" size={18} />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="לדוגמה: M4 מכבים"
          aria-label="חיפוש לפי נשק או כוונת"
        />
      </div>
    </label>
  );
}
