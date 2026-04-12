import Image from "next/image";
import { shimmer, toBase64 } from "@/app/utils/helper";

type ProductGalleryProps = {
  images: {
    url: string;
  }[];
};

const ProductGallery = ({ images }: ProductGalleryProps) => {
  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-4/3 overflow-hidden rounded-md">
        <Image
          src={images?.[0]?.url}
          alt="Product Image"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images?.slice(1).map((image, index) => (
          <Image
            key={index}
            src={image.url}
            alt={`Product Image ${index + 1}`}
            sizes="80px"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            className="w-20 h-20 object-cover rounded-md cursor-pointer hover:ring-2 hover:ring-blue-500"
          />
        ))}
        fdsaf
      </div>
    </div>
  );
};

export default ProductGallery;
