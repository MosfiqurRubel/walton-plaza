"use client";

import { useState } from "react";
import Image from "next/image";
import { shimmer, toBase64 } from "@/app/utils/helper";

type ProductGalleryProps = {
  images: {
    signedUrl: string;
    url: string;
    name: string;
  }[];
};

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images?.[0]?.url);

  return (
    <div className="space-y-4">
      <div className="rounded-md shadow overflow-hidden">
        <Image
          src={selectedImage}
          alt="Selected Product"
          width={700}
          height={700}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {images.map((img) => (
          <button
            key={img.url}
            onClick={() => setSelectedImage(img.url)}
            className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
              selectedImage ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <Image src={img.url} alt="{img.name}" width={80} height={80} />
          </button>
        ))}
      </div>
    </div>
  );
}
