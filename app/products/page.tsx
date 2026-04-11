import { serverFetch } from "@/app/lib/graphql/serverFetch";
import { GET_PRODUCTS } from "@/app/lib/graphql/queries";
import ProductList from "@/app/components/product/ProductList";
import ProductFilter from "@/app/components/product/ProductFilter";
import { ProductStockSort } from "@/app/types/product";
import ProductSidebar from "@/app/components/ProductSidebar";
import { FileText } from "lucide-react";
import Heading from "../components/ui/Heading";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    min?: string;
    max?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const category = params?.category || "";
  const min = Number(params?.min || 0);
  const max = Number(params?.max || 0);
  const sort = (params?.sort as ProductStockSort) || ProductStockSort.NONE;

  try {
    const data = await serverFetch(GET_PRODUCTS, {
      skip: 0,
      limit: 10,
      sort,
      filter: {
        isActive: true,
        // posItemCode: "25311",
        categoryUid: category || undefined,
        priceFilterOption: {
          min,
          max,
        },
        filterOptions: [],
      },
    });

    const products = data?.getProducts?.result?.products || [];
    const count = data?.getProducts?.result?.count || 0;

    // console.log("posItemCode", products?.variants[0].posItemCode);

    return (
      <>
        <div className="flex sm:items-center sm:justify-between max-sm:flex-col gap-2 mb-5">
          <Heading as="p" className="grow flex items-center gap-1">
            <FileText size={20} />
            <b>{count}</b> items found
          </Heading>

          <ProductFilter />
        </div>

        <div className="flex max-xl:flex-col gap-6">
          <ProductSidebar />
          <ProductList
            initialProducts={products}
            sort={sort}
            category={category}
            minPrice={min}
            maxPrice={max}
          />
        </div>
      </>
    );
  } catch (error) {
    return (
      <p className="text-center text-red-500 mt-10">Failed to load products</p>
    );
  }
}
