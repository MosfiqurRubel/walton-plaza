"use client";

import { useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "@/app/store/services/productApi";
import { Product } from "@/app/types/product";
import Loading from "@/app/components/ui/loading";
import ProductCard from "@/app/components/product/ProductCard";

type ProductListProps = {
  initialProducts: any[];
};

const ProductList = ({ initialProducts }: ProductListProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data: newProducts = [],
    isLoading,
    isError,
    isFetching,
  } = useGetProductsQuery({ skip: page * limit, limit });

  const [allProducts, setAllProducts] = useState<any[]>(initialProducts);

  // Append new products
  useEffect(() => {
    if (newProducts?.length > 0) {
      setAllProducts((prev) => {
        const ids = new Set(prev.map((p) => p.uid));
        const filterd = newProducts.filter((p) => !ids.has(p.uid));
        return [...prev, ...filterd];
      });
    }
  }, [newProducts]);

  // Infinite Scroll (Auto Load)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching) {
        setPage((prev) => prev + 1);
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [isFetching]);

  //   const allProducts = [...initialProducts, ...(newProducts || [])];
  // const {
  //   data: products,
  //   isLoading,
  //   isError,
  // } = useGetProductsQuery({
  //   skip: (page - 1) * limit,
  //   limit,
  //   uid: "",
  //   // posItemCode: "25311",
  //   sort: ProductStockSort.NONE,
  // });

  if (isLoading && allProducts.length === 0) return <Loading />;

  if (isError)
    return <p className="text-center text-red-500">Failed to load</p>;

  return (
    <main className="container mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts?.map((p: Product) => (
          <ProductCard key={p.uid} product={p} />
        ))}
      </div>

      {isFetching && (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}

      <div ref={loadMoreRef} className="h-10"></div>
    </main>
  );
};

export default ProductList;
