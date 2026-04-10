type StockCTAProps = {
  inStock: boolean;
};

const StockCTA = ({ inStock }: StockCTAProps) => {
  return (
    <div className="mt-6">
      {inStock ? (
        <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Buy Now
        </button>
      ) : (
        <button
          disabled
          className="w-full bg-gray-400 text-white px-6 py-2 rounded-md cursor-not-allowed"
        >
          Out of Stock
        </button>
      )}
    </div>
  );
};

export default StockCTA;
