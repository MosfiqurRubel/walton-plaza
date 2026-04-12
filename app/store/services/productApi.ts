import { Product, ProductStockSort } from "@/app/types/product";
import { GET_PRODUCT, GET_PRODUCTS } from "@/app/lib/graphql/queries";
import { baseApi } from "@/app/store/services/baseApi";

type GetProductsArgs = {
  skip: number;
  limit: number;
  sort?: ProductStockSort;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

type GetProductsResponse = {
  products: Product[];
  count: number;
};

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsArgs>({
      query: ({ skip, limit, sort, category, minPrice, maxPrice }) => ({
        url: "/",
        method: "POST",
        body: {
          query: GET_PRODUCTS,
          variables: {
            sort,
            pagination: {
              skip,
              limit,
            },
            filter: {
              isActive: true,
              categoryUid: category || undefined,
              filterOptions: [],
              priceFilterOption: {
                min: minPrice || 0,
                max: maxPrice || 0,
              },
            },
          },
        },
      }),

      transformResponse: (response: any) => ({
        products: response?.data?.getProducts?.result?.products || [],
        count: response?.data?.getProducts?.result?.count || 0,
      }),

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return {
          endpointName,
          sort: queryArgs.sort,
          category: queryArgs.category,
          minPrice: queryArgs.minPrice,
          maxPrice: queryArgs.maxPrice,
        };
      },

      merge: (currentCache, newItems, { arg }) => {
        if (arg.skip === 0) {
          currentCache.products = newItems.products;
        } else {
          const ids = new Set(currentCache.products.map((p) => p.uid));

          const uniqueProducts = newItems.products.filter(
            (p) => !ids.has(p.uid),
          );

          currentCache.products.push(...uniqueProducts);
        }

        currentCache.count = newItems.count;
      },

      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.sort !== previousArg?.sort ||
          currentArg?.category !== previousArg?.category ||
          currentArg?.minPrice !== previousArg?.minPrice ||
          currentArg?.maxPrice !== previousArg?.maxPrice
        );
      },
    }),

    getProduct: builder.query<Product, { uid: string }>({
      query: ({ uid }) => ({
        url: "/",
        method: "POST",
        body: {
          query: GET_PRODUCT,
          variables: { uid },
        },
      }),

      transformResponse: (res: any) =>
        res?.data?.getProducts?.result?.products?.[0],

      providesTags: (result, error, { uid }) => [{ type: "Product", id: uid }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
