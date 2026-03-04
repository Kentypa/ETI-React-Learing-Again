import type { FC } from "react";
import { Button } from "../../atoms/Button/Button";

type Props = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onBuy: () => void;
};

export const ProductActions: FC<Props> = ({
  quantity,
  onIncrease,
  onDecrease,
  onBuy,
}) => {
  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="flex items-center border rounded">
        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="px-3 py-1 bg-gray-100 disabled:opacity-50"
        >
          -
        </button>
        <span className="px-4 py-1 font-medium">{quantity}</span>
        <button onClick={onIncrease} className="px-3 py-1 bg-gray-100">
          +
        </button>
      </div>
      <Button variant="primary" onClick={onBuy}>
        Buy
      </Button>
    </div>
  );
};
