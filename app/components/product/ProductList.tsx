"use client";

import { useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "@/app/store/services/productApi";
import { Product, ProductStockSort } from "@/app/types/product";
import ProductCard from "@/app/components/product/ProductCard";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";
import ProductGridSkeleton from "@/app/components/ui/skeleton/ProductGridSkeleton";

type ProductListProps = {
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
}: ProductListProps) => {
  const limit = 10;

  const [page, setPage] = useState(0);

  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const hasMore = allProducts.length < totalCount;

  const { data, isFetching, isError, refetch } = useGetProductsQuery(
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
      if (entries[0].isIntersecting && !isFetching && hasMore && !isError) {
        setPage((prev) => prev + 1);
      }
    });

    const node = loadMoreRef.current;

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [isFetching, hasMore, isError]);

  // Empty state
  if (!allProducts.length && !isFetching) {
    return (
      <div className="grow text-center py-20 space-y-2">
        <Heading as="h3" children="No products found" />

        <Heading
          as="p"
          className="text-gray-500"
          children="Try changing your filters."
        />
      </div>
    );
  }

  return (
    <div className="grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {allProducts.map((p) => (
          <ProductCard key={p.uid} product={p} />
        ))}
      </div>

      {/* Loading more skeleton */}
      {isFetching && (
        <div className="mt-6">
          <ProductGridSkeleton count={3} />
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center mt-8">
          <Heading as="p" variant="danger" children="Failed to load products" />

          <button
            onClick={() => refetch()}
            className="mt-3 px-4 py-2 bg-black text-white rounded-md hover:opacity-90"
          >
            Retry
          </button>

          <Button variant="primary" label="Retry" onClick={() => refetch()} />
        </div>
      )}

      {/* Scroll trigger */}
      {hasMore && !isError && <div ref={loadMoreRef} className="h-10" />}
    </div>
  );
};

export default ProductList;
