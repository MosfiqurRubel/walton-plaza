export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
      <div className="w-full h-56 bg-gray-200 rounded-lg" />

      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        <div className="h-4 bg-gray-200 rounded w-1/2" />

        <div className="h-8 bg-gray-200 rounded w-1/3 mt-4" />
      </div>
    </div>
  );
}
