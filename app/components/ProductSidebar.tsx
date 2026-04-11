"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "@/app/components/ui/Select";
import Input from "@/app/components/ui/Input";
import Heading from "@/app/components/ui/Heading";

const categories = [
  "Electronics",
  "Fashion",
  "Home Appliances",
  "Books",
  "Sports",
];

export default function ProductSidebar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(50000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ LOCAL STATE (IMPORTANT)
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const categoryOptions = [{ value: "C-L9Z525", label: "Smartphone" }];

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className="xl:flex-none xl:w-74 bg-white shadow-md rounded-md p-5">
      <div className="space-y-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>

        <div className="space-y-2">
          <Heading as="h4" className="capitalize" children="Shop by category" />
          <Select
            className="w-full"
            name="category"
            options={categoryOptions}
            value={searchParams.get("category") || ""}
            placeholder="Category"
            onChange={(val) => updateParam("category", val)}
          />
        </div>

        <div className="space-y-2">
          <Heading as="h4" className="capitalize" children="price" />

          <div className="flex gap-4 justify-between">
            {/* Min Price */}
            <Input
              name="min"
              type="number"
              placeholder="Min"
              value={min}
              onChange={setMin}
              onBlur={() => updateParam("min", min)}
              className="w-full"
            />

            {/* Max Price */}
            <Input
              name="max"
              type="number"
              placeholder="Max"
              value={max}
              onChange={setMax}
              onBlur={() => updateParam("max", max)}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="inStock"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-sky-600"
          />
          <label htmlFor="inStock" className="text-gray-700">
            In Stock Only
          </label>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="font-semibold mb-2">Category</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-md transition ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-2">Price Range</h3>
          <input
            type="range"
            min={0}
            max={100000}
            step={5000}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-sky-600"
          />
          <p className="mt-2 text-gray-600">
            Up to ৳{priceRange.toLocaleString()}
          </p>
        </div>

        {/* Apply Button */}
        <button
          onClick={() =>
            alert(
              `Applied Filters:\nCategory: ${selectedCategory}\nPrice: ${priceRange}\nIn Stock: ${inStockOnly}`,
            )
          }
          className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
