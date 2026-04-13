import ProductGridSkeleton from "@/app/components/ui/skeleton/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="flex gap-6">
      <div className="w-72 bg-white rounded-xl p-5 h-125 animate-pulse" />

      <div className="grow">
        <ProductGridSkeleton count={9} />
      </div>
    </div>
  );
}

// const loading = () => {
//   return (
//     <div className="flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );
// };

// export default loading;
