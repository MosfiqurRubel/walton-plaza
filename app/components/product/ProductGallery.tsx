import Image from "next/image";

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
          className="object-contain w-full h-full"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images?.slice(1).map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Product Image ${index + 1}`}
            className="w-20 h-20 object-cover rounded-md cursor-pointer hover:ring-2 hover:ring-blue-500"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
