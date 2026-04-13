"use client";

import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { splitName } from "@/app/utils/helper";
import { addToCart } from "@/app/store/slices/cartSlice";
import DiscountBadge from "@/app/components/ui/DiscountBadge";
import { shimmer, toBase64 } from "@/app/utils/helper";
import Heading from "../ui/Heading";

export default function ProductCard({ product }: any) {
  const dispatch = useDispatch();

  const variant = product.variants?.[0];
  const hasDiscount = variant?.discount !== null;

  // sellingPrice = 45000 - (45000 × 15 / 100) = 45000 - 6750 = 38,250
  const sellingPrice =
    variant?.mrpPrice -
    (variant?.mrpPrice * variant?.discount.percentage) / 100;

  const discountText =
    variant?.discount?.type === "PERCENTAGE"
      ? `${variant.discount?.amount}% OFF`
      : `Save ৳${variant.discount?.amount}`;

  return (
    <div className="product-card relative group">
      <Link href={`/products/${product.uid}`} className="block group">
        {variant.discount?.percentage !== 0 && (
          <DiscountBadge
            value={variant.discount?.percentage}
            className="absolute! -top-1 left-2.5 z-10 "
          />
        )}
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
        <div>
          <div className="product-title flex flex-col mb-4">
            <span className="text-gray-600">
              {splitName(product.enName).firstLine}
            </span>
            {splitName(product.enName).secondLine}
          </div>

          <div className="flex gap-2">
            <div className="grow space-y-2">
              <span className="text-sm text-red-600 line-through">
                MRP ৳ {variant?.mrpPrice?.toLocaleString()}
              </span>

              {hasDiscount && (
                <div className="flex gap-1">
                  <span className="inline-block text-xs font-medium text-gray-500">
                    Save: ৳ {variant.discount?.amount}
                  </span>
                  <span className="inline-block text-xs font-bold text-green-500 uppercase">
                    ({variant.discount?.value}% off)
                  </span>
                </div>
              )}
              <Heading
                as="p"
                className="capitalize"
                children="Available In Selected Plaza"
              />
            </div>
            <div className="shrink-0">
              <span className="product-price text-xs">
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
      </Link>
    </div>
  );
}
