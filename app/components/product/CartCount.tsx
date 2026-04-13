"use client";

import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/app/store/hooks";

export default function CartCount() {
  const items = useAppSelector((state) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative cursor-pointer">
      <ShoppingCart className="w-6 h-6 text-sky-900" />

      {total > 0 && (
        <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-semibold">
          {total}
        </span>
      )}
    </div>
  );
}
