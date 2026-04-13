"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/app/components/ui/Input";
import Heading from "@/app/components/ui/Heading";
import FilterAccordion from "@/app/components/ui/FilterAccordion";

type ProductSidebarProps = {
  filterOptions: any[];
  priceFilterOption: {
    min: number;
    max: number;
  };
};

export default function ProductSidebar({
  filterOptions,
  priceFilterOption,
}: ProductSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`/products?${params.toString()}`);
  };

  return (
    <aside className="xl:flex-none xl:w-74 bg-white shadow-md rounded-xl pt-px">
      <FilterAccordion title="Price">
        <div className="space-y-3">
          <div className="flex gap-4">
            <Input
              name="min"
              type="number"
              placeholder="Min"
              defaultValue={searchParams.get("min") || ""}
              onBlur={(e: any) => updateParam("min", e)}
              className="border rounded px-3 py-2 w-full"
            />

            <Input
              name="max"
              type="number"
              placeholder="Max"
              defaultValue={searchParams.get("max") || ""}
              onBlur={(e: any) => updateParam("max", e)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <Heading as="p" override className="text-sm text-gray-500">
            ৳{priceFilterOption.min} - ৳{priceFilterOption.max}
          </Heading>
        </div>
      </FilterAccordion>

      {filterOptions.map((filter) => (
        <FilterAccordion
          key={filter.key}
          title={filter.key}
          scrollable={filter.values.length > 5}
        >
          <div className="space-y-2">
            {filter.values.map((value: any) => {
              const isChecked = searchParams.get(filter.key) === value.enName;

              return (
                <label
                  key={value.enName}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                >
                  <input
                    type="radio"
                    name={filter.key}
                    checked={isChecked}
                    onChange={() => updateParam(filter.key, value.enName)}
                  />

                  <span>{value.enName}</span>
                </label>
              );
            })}
          </div>
        </FilterAccordion>
      ))}

      <FilterAccordion title="Availability">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={searchParams.get("available") === "true"}
            onChange={(e) =>
              updateParam("available", e.target.checked ? "true" : "")
            }
          />

          <span>In Stock</span>
        </label>
      </FilterAccordion>
    </aside>
  );
}
