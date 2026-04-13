"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/slices/cartSlice";
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

  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(
      addToCart({
        uid: product.uid,
        name: product.enName,
        price: variant?.mrpPrice || 0,
        image: product?.images?.[0],
        stock: variant?.quantity,
      }),
    );
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

          <StockCTA onClick={handleCart} qty={variant?.quantity || 0} />
        </div>
      </div>
    </div>
  );
}
