"use client";

import { useState } from "react";
import { useGetProductsQuery } from "@/app/store/services/productApi";
import ProductCard from "@/app/components/product/ProductCard";
import { Product } from "@/app/types/product";
import Loading from "@/app/components/ui/loading";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery({
    skip: (page - 1) * limit,
    limit,
    uid: "",
  });

  if (isLoading) return <Loading />;

  if (isError)
    return <p className="text-center text-red-500">Failed to load</p>;

  return (
    <main className="container mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((p: Product) => (
          <ProductCard key={p.uid} product={p} />
        ))}
      </div>

      <button
        onClick={() => setPage((prev) => prev + 1)}
        className="mt-4 bg-black text-white px-4 py-2"
      >
        Load More
      </button>
    </main>
  );
}
