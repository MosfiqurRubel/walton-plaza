import { baseApi } from "@/app/store/services/baseApi";
import { Product, ProductStockSort } from "@/app/types/product";
import { GET_PRODUCT, GET_PRODUCTS } from "@/app/lib/graphql/queries";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product[],
      {
        skip: number;
        limit: number;
        sort?: ProductStockSort;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
      }
    >({
      query: ({ skip, limit, sort, category, minPrice, maxPrice }) => ({
        url: "/",
        method: "POST",
        body: {
          query: GET_PRODUCTS,
          variables: {
            skip,
            limit,
            sort,
            filter: {
              isActive: true,
              categoryUid: category || undefined,
              priceFilterOption: {
                min: minPrice || 0,
                max: maxPrice || 0,
              },
              filterOptions: [],
            },
          },
        },
      }),

      transformResponse: (response: any) =>
        response?.data?.getProducts?.result?.products ?? [],

      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs;
      },

      merge: (currentCache, newItems, { arg }) => {
        if (arg.skip === 0) {
          return newItems; // filter change → reset
        }
        currentCache.push(...newItems);
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.skip !== previousArg?.skip;
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ uid }) => ({
                type: "Product" as const,
                id: uid,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
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
