"use client";

import { useAppSelector } from "@/app/store/hooks";
import ProductTable from "@/app/components/product/ProductTable";

export default function Cart() {
  const items = useAppSelector((state) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <ProductTable items={items} total={total} />
    </div>
  );
}
