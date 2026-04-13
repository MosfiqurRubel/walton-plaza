"use client";

import React from "react";
import Heading from "@/app/components/ui/Heading";

type Discount = {
  amount: number;
  value: number; // percentage
  percentage: number;
};

type Variant = {
  mrpPrice: number;
  discount: Discount | null;
};

type Props = {
  variant: Variant;
};

const PriceDisplay: React.FC<Props> = ({ variant }) => {
  const hasDiscount = variant?.discount !== null;

  const sellingPrice =
    variant?.mrpPrice -
    (variant?.mrpPrice * (variant?.discount?.percentage ?? 0)) / 100;

  return (
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

        <Heading as="p" className="capitalize">
          Available In Selected Plaza
        </Heading>
      </div>

      <div className="shrink-0">
        <span className="product-price text-xs">
          ৳{sellingPrice?.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PriceDisplay;
