type StockCTAProps = {
  inStock: boolean;
};

const StockCTA = ({ inStock }: StockCTAProps) => {
  return (
    <div className="mt-6">
      {inStock ? (
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Add to Cart
        </button>
      ) : (
        <button
          disabled
          className="bg-gray-400 text-white px-6 py-2 rounded-md cursor-not-allowed"
        >
          Out of Stock
        </button>
      )}
    </div>
  );
};

export default StockCTA;
