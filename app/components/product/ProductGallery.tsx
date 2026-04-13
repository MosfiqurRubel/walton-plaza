"use client";

import { useState } from "react";
import Image from "next/image";

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
    <div>
      <div className="border rounded-xl overflow-hidden">
        <Image
          src={selectedImage}
          alt="Product"
          width={700}
          height={700}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="flex gap-3 mt-4 overflow-x-auto">
        {images.map((img) => (
          <button
            key={img.signedUrl}
            onClick={() => setSelectedImage(img.signedUrl)}
            className="border rounded-lg overflow-hidden"
          >
            <Image src={img.signedUrl} alt={img.name} width={80} height={80} />
          </button>
        ))}
      </div>
    </div>
  );
}

// import Image from "next/image";
// import { shimmer, toBase64 } from "@/app/utils/helper";

// type ProductGalleryProps = {
//   images: {
//     url: string;
//   }[];
// };

// const ProductGallery = ({ images }: ProductGalleryProps) => {
//   return (
//     <div className="space-y-4">
//       <div className="relative w-full aspect-4/3 overflow-hidden rounded-md">
//         <Image
//           src={images?.[0]?.url}
//           alt="Product Image"
//           fill
//           sizes="(max-width: 768px) 100vw, 50vw"
//           placeholder="blur"
//           blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
//           className="object-contain w-full h-full"
//         />
//       </div>
//       <div className="flex gap-2 overflow-x-auto">
//         {images?.slice(1).map((image, index) => (
//           <Image
//             key={index}
//             src={image.url}
//             alt={`Product Image ${index + 1}`}
//             sizes="80px"
//             placeholder="blur"
//             blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
//             className="w-20 h-20 object-cover rounded-md cursor-pointer hover:ring-2 hover:ring-blue-500"
//           />
//         ))}
//         fdsaf
//       </div>
//     </div>
//   );
// };

// export default ProductGallery;
