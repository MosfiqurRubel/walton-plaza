"use client";
import Image from "next/image";
import React, { useState } from "react";

type ImageGalleryProps = {
  images: string[];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full aspect-4/3 overflow-hidden rounded-md shadow-md">
        <Image
          src={selectedImage}
          alt="Selected product"
          fill
          className="object-contain w-full h-full"
        />
      </div>

      <div className="flex gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 rounded-md overflow-hidden border-2 relative ${
              selectedImage === img
                ? "border-blue-500"
                : "border-gray-300 cursor-pointer"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
