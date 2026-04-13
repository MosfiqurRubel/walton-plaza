export default function Loading() {
  return (
    <div className="grid grid-cols-2 gap-10 animate-pulse">
      <div className="h-125 bg-gray-200 rounded-xl" />
      <div className="space-y-4">
        <div className="h-8 w-2/3 bg-gray-200 rounded" />
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
