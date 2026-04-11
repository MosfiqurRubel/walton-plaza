import Button from "@/app/components/ui/Button";

type StockCTAProps = {
  inStock: boolean;
};

const StockCTA = ({ inStock }: StockCTAProps) => {
  return (
    <>
      {inStock ? (
        <Button
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
      )}
    </>
  );
};

export default StockCTA;
