import type { ChangeEvent, FC } from "react";

type SearchBarProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
};

export const SearchBar: FC<SearchBarProps> = ({ onChange, value, name }) => {
  return (
    <label className="flex flex-col text-center">
      Search by tag
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="rounded-md border-2 border-neutral-950 p-1 mb-5"
      />
    </label>
  );
};
