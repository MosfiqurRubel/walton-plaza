import ProductCardSkeleton from "@/app/components/ui/skeleton/ProductCardSkeleton";

type Props = {
  count?: number;
};

export default function ProductGridSkeleton({ count = 6 }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
