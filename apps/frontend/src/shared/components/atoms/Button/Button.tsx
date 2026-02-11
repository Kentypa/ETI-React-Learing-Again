import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary";
  className?: string;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant,
  className = "",
  ...otherProps
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
