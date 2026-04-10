import { serverFetch } from "@/app/lib/graphql/serverFetch";
import { GET_PRODUCT } from "@/app/lib/graphql/queries";
import { splitName } from "@/app/utils/helper";
import dynamic from "next/dynamic";
import PriceDisplay from "@/app/components/product/PriceDisplay";
import StockCTA from "@/app/components/product/StockCTA";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 🔥 MUST DO

  const data = await serverFetch(GET_PRODUCT, {
    uid: slug,
  });

  const product = data?.getProducts?.result?.products?.[0];
  const variant = product.variants?.[0];

  if (!product) return <p className="text-red-500">Product not found</p>;

  console.log("Product details ", product);

  const ProductGallery = dynamic(
    () => import("@/app/components/product/ProductGallery"),
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-4">
      <ProductGallery images={product.images} />

      <div className="md:border-l md:border-gray-300 md:pl-8">
        <div>
          <h1 className="text-base text-gray-600">
            {splitName(product.enName).firstLine}
          </h1>
          <h2 className="text-base">{splitName(product.enName).secondLine}</h2>
        </div>

        <PriceDisplay
          mrpPrice={variant?.mrpPrice}
          discount={{
            amount: variant?.discount?.amount,
            type: variant?.discount?.type,
            value: variant?.discount?.value,
          }}
          // discount={{ amount: 15, type: "percentage", value: 38250 }}
        />

        <StockCTA inStock={variant?.quantity > 0} />
      </div>
    </div>
  );
}
