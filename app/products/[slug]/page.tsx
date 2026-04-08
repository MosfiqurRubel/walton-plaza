import { fetchGraphQL } from "@/app/lib/graphql/client";
import ProductGallery from "@/app/components/product/ProductGallery";
import PriceDisplay from "@/app/components/product/PriceDisplay";
import StockCTA from "@/app/components/product/StockCTA";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 🔥 MUST DO

  const data = await fetchGraphQL(
    `
    query ($uid: String!) {
      getProducts(
        filter: { uid: $uid }
        pagination: { skip: 0, limit: 1 }
      ) {
        result {
          products {
            uid
            enName
            images {
              url
            }
            variants {
              mrpPrice
              quantity
              discount {
                amount
                value
                type
              }
            }
          }
        }
      }
    }`,
    { uid: slug },
  );

  const product = data?.getProducts?.result?.products?.[0];
  const variant = product.variants?.[0];

  if (!product) return <p className="text-red-500">Product not found</p>;

  console.log("Product details ", product);

  const splitName = (str: string) => {
    const parts = str.split("|");
    return {
      firstLine: parts[0] ? parts[0].trim() : str,
      secondLine: parts[1] ? parts[1].trim() : "",
    };
  };

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
          price={variant?.mrpPrice}
          discount={variant?.discount?.value}
        />

        <StockCTA inStock={variant?.quantity > 0} />

        {/* <img
          src={product.images?.[0]?.url}
          alt={splitName(product.enName).firstLine}
          className="w-full max-w-md"
        /> */}
      </div>
    </div>
  );
}
