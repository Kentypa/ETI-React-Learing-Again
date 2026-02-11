import type { FC, InputHTMLAttributes } from "react";

type LabelProps = {
  label?: {
    name: string;
    className: string;
  };
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & LabelProps;

export const Input: FC<InputProps> = ({ label, ...otherProps }) => {
  return (
    <label className={label?.className}>
      {label?.name}
      <input {...otherProps} />
    </label>
  );
};
