import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (value: string) => void;
  onEnter?: (value: string) => void;
}

const SearchBox = ({ onChange, onEnter }: SearchBoxProps) => {
  return (
    <input
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onEnter) {
          onEnter(e.currentTarget.value);
        }
      }}
      className={css.input}
      type="text"
      name="search"
      placeholder="Search notes"
    />
  );
};

export default SearchBox;
