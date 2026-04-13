"use client";

import Image from "next/image";
import { shimmer, toBase64 } from "@/app/utils/helper";
import RemoveCart from "@/app/components/product/RemoveCart";

type Product = {
  uid: string;
  name: string;
  image?: string; // string instead of { url }
  price?: number;
  quantity?: number;
};

type Props = {
  items: Product[];
  total: number;
};

const splitName = (name: string) => {
  const parts = name?.split(" ") || [];
  return {
    firstLine: parts.slice(0, 2).join(" "),
    secondLine: parts.slice(2).join(" "),
  };
};

const ProductTable: React.FC<Props> = ({ items, total }) => {
  return (
    <table className="w-full border-collapse border border-gray-200 text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-3 py-2 text-left">Image</th>
          <th className="border px-3 py-2 text-left">Name</th>
          <th className="border px-3 py-2 text-left">MRP</th>
          <th className="border px-3 py-2 text-left">Qty</th>
          <th className="border px-3 py-2 text-left">Selling Price</th>
          <th className="border px-3 py-2 text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((p) => (
          <tr key={p.uid} className="hover:bg-gray-50">
            <td className="border px-3 py-2">
              <div className="relative w-24 h-18">
                <Image
                  src={p.image || ""}
                  alt={p.name || "product"}
                  fill
                  sizes="100px"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(100, 75))}`}
                  className="object-cover rounded"
                />
              </div>
            </td>
            <td className="border px-3 py-2">
              <div className="flex flex-col">
                <span className="text-gray-600">
                  {splitName(p.name).firstLine}
                </span>
                {splitName(p.name).secondLine}
              </div>
            </td>
            <td className="border px-3 py-2 text-red-600 line-through">
              ৳{p?.price?.toLocaleString()}
            </td>
            <td className="border px-3 py-2">{total}</td>
            <td className="border px-3 py-2 font-semibold text-green-600">
              ৳{p?.quantity?.toLocaleString()}
            </td>
            <td className="border px-3 py-2 text-center">
              <RemoveCart uid={p.uid} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
