"use client";

import { useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "@/app/store/services/productApi";
import { Product, ProductStockSort } from "@/app/types/product";
import ProductCard from "./ProductCard";

type Props = {
  initialProducts: Product[];
  sort: ProductStockSort;
  isActive: boolean;
};

const ProductList = ({ initialProducts, sort, isActive }: Props) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ✅ RTK Query (next pages)
  const { data, isFetching } = useGetProductsQuery({
    skip: page * limit,
    limit,
    sort,
    isActive,
  });

  // ✅ Reset when sort changes
  useEffect(() => {
    setAllProducts(initialProducts);
    setPage(1);
  }, [initialProducts, sort, isActive]);

  // ✅ Append new products
  useEffect(() => {
    if (data?.length) {
      setAllProducts((prev) => {
        const ids = new Set(prev.map((p) => p.uid));
        const newItems = data.filter((p: Product) => !ids.has(p.uid));
        return [...prev, ...newItems];
      });
    }
  }, [data]);

  // ✅ Infinite Scroll Observer
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

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts.map((p) => (
          <ProductCard key={p.uid} product={p} />
        ))}
      </div>

      {/* Loader */}
      {isFetching && <p className="text-center mt-4">Loading...</p>}

      {/* Trigger */}
      <div ref={loadMoreRef} className="h-10" />
    </>
  );
};

export default ProductList;

// "use client";

// import { useEffect, useState } from "react";
// import { Product } from "@/app/types/product";
// import ProductCard from "./ProductCard";

// const ProductList = ({ initialProducts }: any) => {
//   const [allProducts, setAllProducts] = useState(initialProducts);

//   // ✅ FIX: update when server data changes
//   useEffect(() => {
//     setAllProducts(initialProducts);
//   }, [initialProducts]);

//   return (
//     <main className="container mx-auto">
//       <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {allProducts?.map((p: Product) => (
//           <ProductCard key={p.uid} product={p} />
//         ))}
//       </div>
//     </main>
//   );
// };

// export default ProductList;
