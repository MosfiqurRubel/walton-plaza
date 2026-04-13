"use client";

import Button from "@/app/components/ui/Button";

type StockCTAProps = {
  qty: number;
  onClick: () => void;
};

const StockCTA = ({ qty, onClick }: StockCTAProps) => {
  return qty > 0 ? (
    <Button
      onClick={onClick}
      label="Buy Now"
      variant="primary"
      size="medium"
      className="w-full"
    />
  ) : (
    <Button
      disabled
      label="Out of Stock"
      variant="secondary"
      size="medium"
      className="w-full"
    />
  );
};

export default StockCTA;
