import { serverFetch } from "@/app/lib/graphql/serverFetch";
import { GET_PRODUCTS } from "@/app/lib/graphql/queries";
import { FileText } from "lucide-react";
import { ProductStockSort } from "@/app/types/product";
import ProductList from "@/app/components/product/ProductList";
import ProductFilter from "@/app/components/product/ProductFilter";
import ProductSidebar from "@/app/components/ProductSidebar";
import Heading from "@/app/components/ui/Heading";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    min?: string;
    max?: string;
    available?: string;
    [key: string]: string | undefined;
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

  const graphQlFilterOptions = Object.entries(params)
    .filter(
      ([key]) => !["category", "sort", "min", "max", "available"].includes(key),
    )
    .map(([key, value]) => ({
      key,
      values: [value],
    }));

  try {
    const data = await serverFetch(GET_PRODUCTS, {
      // skip: 0,
      // limit: 10,
      // sort,
      // filter: {
      //   isActive: true,
      //   // posItemCode: "25311",
      //   categoryUid: category || undefined,
      //   priceFilterOption: {
      //     min,
      //     max,
      //   },
      //   filterOptions: [],
      // },

      sort,
      pagination: {
        skip: 0,
        limit: 10,
      },
      filter: {
        isActive: true,
        categoryUid: category || undefined,
        isStockAvailable: params.available === "true" ? true : undefined,
        filterOptions: graphQlFilterOptions,
        priceFilterOption: {
          min,
          max,
        },
      },
    });

    const products = data?.getProducts?.result?.products || [];
    const totalCount = data?.getProducts?.result?.count || 0;
    const filterOptions = data?.getProducts?.result?.filterOptions || [];
    const priceFilterOption =
      data?.getProducts?.result?.priceFilterOption || {};

    // console.log(filterOptions, "filter options");
    // console.log(priceFilterOption, "priceFilterOption");
    // console.log(availability, "availability");

    // console.log("posItemCode", products);

    return (
      <>
        <div className="flex sm:items-center sm:justify-between max-sm:flex-col gap-2 mb-5">
          <Heading as="p" className="grow flex items-center gap-1">
            <FileText size={20} />
            <b>{totalCount}</b> items found
          </Heading>

          <ProductFilter />
        </div>

        <div className="flex max-xl:flex-col gap-6">
          <ProductSidebar
            filterOptions={filterOptions}
            priceFilterOption={priceFilterOption}
          />
          <ProductList
            initialProducts={products}
            totalCount={totalCount}
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
