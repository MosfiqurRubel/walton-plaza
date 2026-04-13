import { notFound } from "next/navigation";
import { serverFetch } from "@/app/lib/graphql/serverFetch";
import { GET_PRODUCT } from "@/app/lib/graphql/queries";
import ProductDetailsClient from "@/app/components/product/ProductDetailsClient";

type ProductDetailsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { slug } = await params;

  const data = await serverFetch(GET_PRODUCT, {
    uid: slug,
  });

  const product = data?.getProducts?.result?.products?.[0];

  if (!product) return notFound();

  return <ProductDetailsClient product={product} />;
}
