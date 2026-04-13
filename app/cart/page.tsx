"use client";

import { useAppSelector } from "@/app/store/hooks";
import ProductTable from "@/app/components/product/ProductTable";
import { Product } from "@/app/types/product";

type Props = {
  items: Product[];
};

export default function Cart() {
  const items = useAppSelector((state) => state.cart.items);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <ProductTable items={items} />
    </div>
  );
}
