"use client";

import { useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "@/app/store/services/productApi";
import { Product, ProductStockSort } from "@/app/types/product";
import ProductCard from "@/app/components/product/ProductCard";
import Loading from "@/app/components/ui/loading";

type Props = {
  initialProducts: Product[];
  totalCount: number;
  sort: ProductStockSort;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

const ProductList = ({
  initialProducts,
  totalCount,
  sort,
  category,
  minPrice,
  maxPrice,
}: Props) => {
  const limit = 10;

  const [page, setPage] = useState(0);

  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const hasMore = allProducts.length < totalCount;

  const { data, isFetching, isError } = useGetProductsQuery(
    {
      skip: page * limit,
      limit,
      sort,
      category,
      minPrice,
      maxPrice,
    },
    {
      skip: !hasMore,
    },
  );

  const products = data?.products || [];

  // Reset products when filters change
  useEffect(() => {
    setAllProducts(initialProducts);
    setPage(1);
  }, [initialProducts]);

  // Append new products
  useEffect(() => {
    if (products.length) {
      setAllProducts((prev) => {
        const ids = new Set(prev.map((p) => p.uid));

        const newItems = products.filter((p: Product) => !ids.has(p.uid));

        return [...prev, ...newItems];
      });
    }
  }, [products]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    const node = loadMoreRef.current;

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [isFetching, hasMore]);

  return (
    <div className="grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {allProducts.map((p) => (
          <ProductCard key={p.uid} product={p} />
        ))}
      </div>

      {isFetching && <Loading />}

      {isError && (
        <p className="text-center text-red-500 mt-4">
          Failed to load more products
        </p>
      )}

      {hasMore && <div ref={loadMoreRef} className="h-10" />}
    </div>
  );
};

export default ProductList;
