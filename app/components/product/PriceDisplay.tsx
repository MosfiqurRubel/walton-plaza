import { Discount } from "@/app/types/product";

type PriceDisplayProps = {
  mrpPrice: number;
  discount?: Discount;
};

const PriceDisplay = ({ mrpPrice, discount }: PriceDisplayProps) => {
  let sellingPrice = mrpPrice;

  if (discount) {
    if (discount.type === "flat") {
      sellingPrice = mrpPrice - discount.amount;
    } else if (discount.type === "percentage") {
      sellingPrice = mrpPrice - (mrpPrice * discount.amount) / 100;
    }

    if (discount.value) {
      sellingPrice = discount.value;
    }
  }

  // If type is 'flat'
  // const sellingPrice = discount ? price - discount : price;

  // // If type is 'percentage'
  // const discountedPrice = discount ? price - (price * discount) / 100 : price;
  return (
    <div className="mt-4">
      <p className="text-xl font-bold text-green-600">
        ৳{mrpPrice.toLocaleString()}
      </p>

      {discount && (
        <div className="flex items-center gap-2">
          <p className="line-through text-gray-500">
            ৳{sellingPrice.toLocaleString()}
          </p>
          {discount.type === "flat" ? (
            <span className="text-red-500 text-sm">
              Save ৳{discount.amount}
            </span>
          ) : (
            <span className="text-red-500 text-sm">{discount.amount}% OFF</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;
