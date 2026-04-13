import { notFound } from "next/navigation";
import { serverFetch } from "@/app/lib/graphql/serverFetch";
import { GET_PRODUCT } from "@/app/lib/graphql/queries";
import { splitName } from "@/app/utils/helper";
import dynamic from "next/dynamic";
import StockCTA from "@/app/components/product/StockCTA";
import PriceDisplay from "@/app/components/product/PriceDisplay";
import VariantSelector from "@/app/components/VariantSelector";
import Heading from "@/app/components/ui/Heading";
// import { notFound } from "next/navigation";
// import ImageGallery from "@/app/components/ImageGallery";

type ProductDetailsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { slug } = await params; // 🔥 MUST DO

  const data = await serverFetch(GET_PRODUCT, {
    uid: slug,
  });

  const product = data?.getProducts?.result?.products?.[0];
  const variant = product.variants?.[0];
  const hasDiscount = variant?.discount !== null;

  // sellingPrice = 45000 - (45000 × 15 / 100) = 45000 - 6750 = 38,250
  const sellingPrice =
    variant?.mrpPrice -
    (variant?.mrpPrice * variant?.discount.percentage) / 100;

  if (!product) return notFound();

  console.log("Product details ", product);

  const ProductGallery = dynamic(
    () => import("@/app/components/product/ProductGallery"),
  );

  const ImageGallery = dynamic(() => import("@/app/components/ImageGallery"));

  const ProductImages = ["/1.jpeg", "/2.jpeg", "/3.jpeg"];

  const variantOptions = ["Small", "Medium", "Large", "XL"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-4">
      <ProductGallery images={product.images} />

      <div className="md:border-l md:border-gray-300 md:pl-8 space-y-4">
        <div>
          <h1 className="text-base text-gray-600">
            {splitName(product.enName).firstLine}
          </h1>
          <h2 className="text-base">{splitName(product.enName).secondLine}</h2>
        </div>

        <PriceDisplay variant={variant} />

        <ImageGallery images={ProductImages} />

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">T-Shirt</h1>
          <VariantSelector variants={variantOptions} />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-sm font-bold">Quantity</label>
          <span className="text-sm font-bold border border-gray-300 py-3 px-4 rounded-md">
            {variant?.quantity}
          </span>
        </div>

        <StockCTA inStock={variant?.quantity > 0} />
      </div>
    </div>
  );
}
