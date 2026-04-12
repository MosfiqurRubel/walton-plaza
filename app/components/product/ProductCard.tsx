"use client";

import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { splitName } from "@/app/utils/helper";
import { addToCart } from "@/app/store/slices/cartSlice";
import DiscountBadge from "@/app/components/ui/DiscountBadge";
import { shimmer, toBase64 } from "@/app/utils/helper";

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

  // const DiscountBadge = dynamic(
  //   () => import("@/app/components/ui/DiscountBadge"),
  // );

  return (
    <div className="product-card relative group">
      {variant.discount?.percentage === 0 && (
        <DiscountBadge value={3} className="absolute! -top-1 left-2.5 z-10 " />
      )}
      <Link href={`/products/${product.uid}`} className="block group">
        <div className="relative w-full aspect-4/3 overflow-hidden rounded-t-md">
          <Image
            src={product.images?.[0]?.url || "/placeholder.png"}
            alt={product.enName || "product"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
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
              MRP ৳{variant?.mrpPrice?.toLocaleString()}
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
          className={`mt-3 w-full rounded-md py-2 text-sm font-medium transition-all group-hover:bg-sky-700 ${
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
