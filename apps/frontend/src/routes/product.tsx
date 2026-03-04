import { createFileRoute } from "@tanstack/react-router";
import { ProductContainer } from "../shared/components/organisms/ProductContainer/ProductContainer";

export const Route = createFileRoute("/product")({
  component: () => (
    <main className="min-h-screen bg-gray-50 p-10 flex items-center justify-center">
      <ProductContainer />
    </main>
  ),
});
