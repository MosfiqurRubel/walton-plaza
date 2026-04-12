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
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="/blur-placeholder.jpg"
          className="object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 flex-wrap">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(img)}
            className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
              selectedImage === img ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="80px"
              placeholder="blur"
              blurDataURL="/blur-placeholder.jpg"
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
