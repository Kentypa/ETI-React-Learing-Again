import type { FC, PropsWithChildren } from "react";
import styles from "./Card.module.css";

type CardProps = {
  className?: string;
};

export const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  className,
}) => {
  return <div className={`${styles.card}${className}`}>{children}</div>;
};
