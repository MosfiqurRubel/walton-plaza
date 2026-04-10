"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProductStockSort } from "@/app/types/product";
import Select from "@/app/components/ui/Select";

const ProductFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const sortOptions = [
    { value: ProductStockSort.NONE, label: "Best Match" },
    { value: ProductStockSort.PRICE_LOW_TO_HIGH, label: "Price Low to High" },
    { value: ProductStockSort.PRICE_HIGH_TO_LOW, label: "Price High to Low" },
  ];

  return (
    <Select
      options={sortOptions}
      value={currentSort}
      onChange={handleSortChange}
      className="border p-2 rounded"
    />
  );
};

export default ProductFilter;

// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { ProductStockSort } from "@/app/types/product";

// const ProductFilter = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const currentSort = searchParams.get("sort") || "";

//   const handleSortChange = (value: string) => {
//     const params = new URLSearchParams(searchParams.toString());

//     if (value) {
//       params.set("sort", value);
//     } else {
//       params.delete("sort");
//     }

//     router.push(`?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <select
//       value={currentSort}
//       onChange={(e) => handleSortChange(e.target.value)}
//       className="border p-2 rounded"
//     >
//       <option value="">Default</option>
//       <option value={ProductStockSort.PRICE_LOW_TO_HIGH}>
//         Price Low to High
//       </option>
//       <option value={ProductStockSort.PRICE_HIGH_TO_LOW}>
//         Price High to Low
//       </option>
//     </select>
//   );
// };

// export default ProductFilter;

// "use client";

// import { useRouter, useSearchParams } from "next/navigation";

// const ProductFilter = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const handleSortChange = (value: string) => {
//     const params = new URLSearchParams(searchParams.toString());

//     params.set("sort", value); // ✅ update sort

//     router.push(`?${params.toString()}`);
//   };

//   return (
//     <select onChange={(e) => handleSortChange(e.target.value)}>
//       <option value="">Default</option>
//       <option value="PRICE_LOW_TO_HIGH">Low to High</option>
//       <option value="PRICE_HIGH_TO_LOW">High to Low</option>
//     </select>
//   );
// };

// export default ProductFilter;

// "use client";

// import { useRouter, useSearchParams } from "next/navigation";

// export default function ProductFilter() {
//   const router = useRouter();
//   const params = useSearchParams();

//   const updateParam = (key: string, value: string) => {
//     const newParams = new URLSearchParams(params.toString());

//     if (value) newParams.set(key, value);
//     else newParams.delete(key);

//     router.push(`/products?${newParams.toString()}`);
//   };

//   return (
//     <div className="flex gap-4 mb-6 flex-wrap">
//       {/* Category */}
//       <select
//         onChange={(e) => updateParam("category", e.target.value)}
//         className="border px-4 py-2 rounded"
//       >
//         <option value="">All Category</option>
//         <option value="Split AC">Split AC</option>
//       </select>

//       {/* Sort */}
//       <select
//         onChange={(e) => updateParam("sort", e.target.value)}
//         className="border px-4 py-2 rounded"
//       >
//         <option value="">Default</option>
//         <option value="PRICE_LOW_TO_HIGH">Low → High</option>
//         <option value="PRICE_HIGH_TO_LOW">High → Low</option>
//       </select>

//       {/* Price */}
//       <input
//         type="number"
//         placeholder="Min"
//         onBlur={(e) => updateParam("min", e.target.value)}
//         className="border px-2 py-1 w-24"
//       />

//       <input
//         type="number"
//         placeholder="Max"
//         onBlur={(e) => updateParam("max", e.target.value)}
//         className="border px-2 py-1 w-24"
//       />
//     </div>
//   );
// }
