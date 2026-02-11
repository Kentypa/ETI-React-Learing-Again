import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...otherProps
}) => {
  return <button {...otherProps}>{children}</button>;
};
