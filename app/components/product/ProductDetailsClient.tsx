"use client";

import dynamic from "next/dynamic";
import { splitName } from "@/app/utils/helper";
import StockCTA from "@/app/components/product/StockCTA";
import PriceDisplay from "@/app/components/product/PriceDisplay";

const ProductGallery = dynamic(
  () => import("@/app/components/product/ProductGallery"),
);

type ProductDetailsClientProps = {
  product: any;
};

export default function ProductDetailsClient({
  product,
}: ProductDetailsClientProps) {
  const variant = product?.variants?.[0];

  const handleCart = () => {
    console.log("Added to cart");

    // localStorage example
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: product.id,
      name: product.enName,
      quantity: 1,
      price: variant?.mrpPrice,
      image: product?.images?.[0],
    };

    cart.push(newItem);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-4">
      <ProductGallery images={product.images} />

      <div className="flex flex-col justify-between md:border-l md:border-gray-300 md:pl-8 space-y-6">
        <div className="space-y-4">
          <div>
            <h1 className="text-base text-gray-600">
              {splitName(product.enName).firstLine}
            </h1>
            <h2 className="text-base">
              {splitName(product.enName).secondLine}
            </h2>
          </div>

          <PriceDisplay variant={variant} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold">Quantity</label>
            <span className="text-sm font-bold border border-gray-300 py-3 px-4 rounded-md">
              {variant?.quantity}
            </span>
          </div>

          <StockCTA onClick={handleCart} qty={variant?.quantity} />
        </div>
      </div>
    </div>
  );
}
