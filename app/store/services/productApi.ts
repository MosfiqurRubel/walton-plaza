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
        uid?: string;
        posItemCode?: string;
        sort?: ProductStockSort;
      }
    >({
      query: ({ skip, limit, uid, posItemCode, sort }) => ({
        url: "/",
        method: "POST",
        body: {
          query: GET_PRODUCTS,
          variables: { skip, limit, uid, posItemCode, sort },
        },
      }),

      transformResponse: (response: any) =>
        response?.data?.getProducts?.result?.products ?? [],

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItem) => {
        currentCache.push(...newItem);
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
