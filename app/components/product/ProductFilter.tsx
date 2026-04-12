"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpWideNarrow } from "lucide-react";
import { ProductStockSort } from "@/app/types/product";
import Heading from "@/app/components/ui/Heading";
import Select from "@/app/components/ui/Select";

const ProductFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const sortOptions = [
    { value: ProductStockSort.NONE, label: "Best Match" },
    { value: ProductStockSort.PRICE_LOW_TO_HIGH, label: "Low to High" },
    { value: ProductStockSort.PRICE_HIGH_TO_LOW, label: "High to Low" },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      <div className="flex-center space-x-2">
        <div className="flex-center gap-0.5">
          <ArrowUpWideNarrow size={20} />
          <Heading as="h5" className="capitalize" children="Sort" />
        </div>
        <Select
          name="sort"
          options={sortOptions}
          value={searchParams.get("sort") || ""}
          onChange={(val) => updateParam("sort", val)}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
