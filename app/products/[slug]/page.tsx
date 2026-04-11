import { serverFetch } from "@/app/lib/graphql/serverFetch";
import { GET_PRODUCT } from "@/app/lib/graphql/queries";
import { splitName } from "@/app/utils/helper";
import dynamic from "next/dynamic";
import PriceDisplay from "@/app/components/product/PriceDisplay";
import StockCTA from "@/app/components/product/StockCTA";
import VariantSelector from "@/app/components/VariantSelector";
// import { notFound } from "next/navigation";
// import ImageGallery from "@/app/components/ImageGallery";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 🔥 MUST DO

  const data = await serverFetch(GET_PRODUCT, {
    uid: slug,
  });

  // if (!data) notFound();

  const product = data?.getProducts?.result?.products?.[0];
  const variant = product.variants?.[0];

  if (!product) return <p className="text-red-500">Product not found</p>;

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

        <PriceDisplay
          mrpPrice={variant?.mrpPrice}
          discount={{
            amount: variant?.discount?.value,
            type: variant?.discount?.type,
            value: variant?.discount?.amount,
          }}
          // discount={{ amount: 38250, type: "percentage", value: 15 }}
        />

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
