"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  const dispatch = useDispatch();
  // console.log(product);

  const variant = product.variants?.[0];
  const hasDiscount = variant?.discount !== null;

  const sellingPrice = hasDiscount
    ? variant.discount?.value
    : variant?.mrpPrice;

  const discountText =
    variant?.discount?.type === "percentage"
      ? `${variant.discount?.amount}% OFF`
      : `Save ৳${variant.discount?.amount}`;

  const splitName = (str: string) => {
    const parts = str.split("|");
    return {
      firstLine: parts[0] ? parts[0].trim() : str,
      secondLine: parts[1] ? parts[1].trim() : "",
    };
  };

  return (
    <div className="product-card">
      <Link href={`/products/${product.uid}`} className="block group">
        <div className="relative w-full aspect-4/3 overflow-hidden rounded-t-md">
          <Image
            src={product.images?.[0]?.url}
            alt={product.enName}
            fill
            sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 50vw,
                 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <div className="product-title flex flex-col">
          <span className="text-gray-600">
            {splitName(product.enName).firstLine}
          </span>
          {splitName(product.enName).secondLine}
        </div>

        {/* Price Section */}
        <div className="flex flex-col">
          {hasDiscount && (
            <span className="text-sm text-red-600 line-through">
              ৳{variant?.mrpPrice?.toLocaleString()}
            </span>
          )}

          <div className="grow flex items-center justify-between">
            {/* Discount Badge */}
            {hasDiscount && (
              <span className="inline-block text-xs font-medium text-gray-500">
                {discountText}
              </span>
            )}

            <span className="product-price">
              ৳{sellingPrice?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Stock & CTA */}
        <button
          onClick={() => dispatch(addToCart(product))}
          disabled={variant?.quantity === 0}
          className={`mt-3 w-full rounded-md py-2 text-sm font-medium transition-all ${
            variant?.quantity === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-sky-900 text-white cursor-pointer hover:bg-sky-700"
          }`}
        >
          {variant?.quantity === 0 ? "Out of Stock" : "Buy Now"}
        </button>
      </div>
    </div>
  );
}
