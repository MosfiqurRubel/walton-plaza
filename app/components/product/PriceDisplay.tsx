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

  // sellingPrice = mrpPrice - discount.amount
  // sellingPrice = mrpPrice - (mrpPrice × discount.amount / 100)

  // sellingPrice = 45000 - (45000 × 15 / 100) = 45000 - 6750 = 38,250
  // discount.value would be 38250
  // You’d show: ৳38,250  (৳45,000 strikethrough)  15% OFF badge

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
