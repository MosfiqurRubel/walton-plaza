import { baseApi } from "@/app/store/services/baseApi";
import { Product } from "@/app/types/product";
import { GET_PRODUCT_QUERY } from "@/app/lib/graphql/queries";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product[],
      { skip: number; limit: number; uid?: string }
    >({
      query: ({ skip, limit, uid }) => ({
        url: "/",
        method: "POST",
        body: {
          query: GET_PRODUCT_QUERY,
          variables: { skip, limit, uid },
        },
      }),

      transformResponse: (response: any) =>
        response?.data?.getProducts?.result?.products ?? [],

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
          query: `
            query GetProduct($uid: String!) {
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
            }
          `,
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
