import React from "react";

type PriceDisplayProps = {
  price: number;
  discount?: number;
};

const PriceDisplay = ({ price, discount }: PriceDisplayProps) => {
  // If type is 'flat'
  const sellingPrice = discount ? price - discount : price;

  // If type is 'percentage'
  const discountedPrice = discount ? price - (price * discount) / 100 : price;
  return (
    <div className="mt-4">
      <p>৳{price}</p>
      {discount && (
        <p className="line-through text-gray-500">
          Save: {discountedPrice.toFixed(2)} (Original: ৳{price.toFixed(2)})
        </p>
      )}
    </div>
  );
};

export default PriceDisplay;
