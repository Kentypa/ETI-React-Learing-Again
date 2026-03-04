import { useState, type FC } from "react";
import { ProductActions } from "../../molecules/ProductActions/ProductActions";
import { ProductDetails } from "../../molecules/ProductDetails/ProductDetails";

const mockProduct = {
  id: "p1",
  title: "Headphones Sony WH-1000XM5",
  description:
    "The best noise cancellation on the market. 30 hours of battery life.",
  price: 349.99,
  rating: 5,
  image:
    "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTe-PhEZ7RUHLPIrppwChWTPcbniYRCqGf_GmIqgquP4Vji4JN1f0XOBurlWnkvWAGKCTrumVYGEcaYbIcz-Lq_3npQFQ1nxkqZsJhuI9pmY1OqspHw8STFG-VZ0x1ysa5ZggO57z-QRws&usqp=CAc",
};

export const ProductContainer: FC = () => {
  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    alert(
      `Bought ${quantity} qt. product "${mockProduct.title}" on $${(mockProduct.price * quantity).toFixed(2)}`,
    );
    setQuantity(1);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-200">
      <div className="flex-1">
        <img
          src={mockProduct.image}
          alt={mockProduct.title}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <ProductDetails
          title={mockProduct.title}
          description={mockProduct.description}
          price={mockProduct.price}
          rating={mockProduct.rating}
        />
        <ProductActions
          quantity={quantity}
          onIncrease={() => setQuantity((q) => q + 1)}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          onBuy={handleBuy}
        />
      </div>
    </div>
  );
};
