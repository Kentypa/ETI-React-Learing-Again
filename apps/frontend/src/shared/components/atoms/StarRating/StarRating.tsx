import type { FC } from "react";

type Props = { rating: number };

export const StarRating: FC<Props> = ({ rating }) => {
  return (
    <div className="flex gap-1 text-yellow-500 text-lg">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
};
