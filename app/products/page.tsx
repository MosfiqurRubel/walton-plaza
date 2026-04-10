import { serverFetch } from "@/app/lib/graphql/serverFetch";
import { GET_PRODUCTS } from "@/app/lib/graphql/queries";
import ProductList from "@/app/components/product/ProductList";
import ProductFilter from "@/app/components/product/ProductFilter";
import { ProductStockSort } from "@/app/types/product";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    min?: string;
    max?: string;
    isActive?: boolean;
    posItemCode?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const category = params?.category || "";
  const min = Number(params?.min || 0);
  const max = Number(params?.max || 0);
  const isActive = params?.isActive || true;
  const sort = (params?.sort as ProductStockSort) || ProductStockSort.NONE;

  try {
    const data = await serverFetch(GET_PRODUCTS, {
      skip: 0,
      limit: 10,
      category,
      minPrice: min,
      maxPrice: max,
      isActive,
      sort,
    });

    const products = data?.getProducts?.result?.products || [];
    const count = data?.getProducts?.result?.count || 0;

    // console.log("posItemCode", products?.variants[0].posItemCode);

    return (
      <>
        <div className="flex sm:justify-between max-sm:flex-col gap-2">
          <p>
            <b>{count}</b> items found
          </p>

          <ProductFilter />
        </div>

        <ProductList initialProducts={products} sort={sort} />
      </>
    );
  } catch (error) {
    return (
      <p className="text-center text-red-500 mt-10">Failed to load products</p>
    );
  }
}
