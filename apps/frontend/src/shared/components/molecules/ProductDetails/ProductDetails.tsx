import type { FC } from "react";
import { StarRating } from "../../atoms/StarRating/StarRating";

type Props = {
  title: string;
  description: string;
  price: number;
  rating: number;
};

export const ProductDetails: FC<Props> = ({
  title,
  description,
  price,
  rating,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <StarRating rating={rating} />
      <p className="text-gray-600">{description}</p>
      <span className="text-xl font-bold text-blue-600">
        ${price.toFixed(2)}
      </span>
    </div>
  );
};
