"use client";

import Image from "next/image";
import { shimmer, toBase64 } from "@/app/utils/helper";
import RemoveCart from "@/app/components/product/RemoveCart";
import { CartItem } from "@/app/store/slices/cartSlice";

type Props = {
  items: CartItem[];
};

const splitName = (name?: string) => {
  const parts = name?.split(" ") || [];

  return {
    firstLine: parts.slice(0, 2).join(" "),
    secondLine: parts.slice(2).join(" "),
  };
};

const ProductTable: React.FC<Props> = ({ items }) => {
  if (!items?.length) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-sm bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2 text-left">
              Image
            </th>
            <th className="border border-gray-300 px-3 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-3 py-2 text-left">MRP</th>
            <th className="border border-gray-300 px-3 py-2 text-left">Qty</th>
            <th className="border border-gray-300 px-3 py-2 text-left">
              Subtotal
            </th>
            <th className="border border-gray-300 px-3 py-2 text-center">
              Delete
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((p) => (
            <tr key={p.uid} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2">
                <div className="relative w-24 h-20">
                  <Image
                    src={p?.image || "/placeholder.png"}
                    alt={p?.name || "product"}
                    fill
                    sizes="100px"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(100, 75),
                    )}`}
                    className="object-cover rounded"
                  />
                </div>
              </td>

              <td className="border border-gray-300 px-3 py-2">
                <div className="flex flex-col">
                  <span className="text-gray-600">
                    {splitName(p?.name).firstLine}
                  </span>
                  <span>{splitName(p?.name).secondLine}</span>
                </div>
              </td>

              <td className="border border-gray-300 px-3 py-2">
                ৳{p?.price.toLocaleString()}
              </td>

              <td className="border border-gray-300 px-3 py-2">
                {p?.quantity}
              </td>

              <td className="border border-gray-300 px-3 py-2 font-semibold text-green-600">
                ৳{(p?.price * p?.quantity).toLocaleString()}
              </td>

              <td className="border border-gray-300 px-3 py-2 text-center">
                <RemoveCart uid={p.uid} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
