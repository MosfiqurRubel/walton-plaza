import { serverFetch } from "@/app/lib/graphql/serverFetch";
import { GET_PRODUCTS } from "@/app/lib/graphql/queries";
import ProductList from "@/app/components/product/ProductList";

export default async function ProductsPage() {
  const limit = 10;

  try {
    const data = await serverFetch(GET_PRODUCTS, {
      skip: 0,
      limit: 10,
    });

    const products = data?.getProducts?.result?.products || [];

    return <ProductList initialProducts={products} />;
  } catch (error) {
    return <p className="text-center text-red-500">Failed to load products</p>;
  }
}
