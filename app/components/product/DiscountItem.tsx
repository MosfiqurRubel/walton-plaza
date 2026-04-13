"use client";

import React from "react";
import Heading from "@/app/components/ui/Heading";

type Discount = {
  amount: number;
  value: number; // percentage
  percentage: number;
  type: string;
};

type Variant = {
  mrpPrice: number;
  discount: Discount | null;
};

type Props = {
  variant: Variant;
};

const DiscountItem: React.FC<Props> = ({ variant }) => {
  const discount = variant?.discount;
  let price = discount?.amount;

  const sellingPrice =
    variant?.mrpPrice -
    (variant?.mrpPrice * (variant?.discount?.percentage ?? 0)) / 100;

  // If type is "flat":
  if (discount?.type === "FLAT") {
    price = variant?.mrpPrice - discount?.amount;
  } else if (discount?.type === "PERCENTAGE") {
    price =
      variant?.mrpPrice -
      (variant?.mrpPrice * (variant?.discount?.percentage ?? 0)) / 100;
  } else {
    price = variant?.mrpPrice;
  }

  return (
    <div className="flex gap-2">
      <div>{price}</div>

      <div className="shrink-0">
        <span className="product-price text-sm">
          ৳{sellingPrice?.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default DiscountItem;
