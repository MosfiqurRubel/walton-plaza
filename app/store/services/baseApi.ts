import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    // baseUrl: "/api/graphql",
    // baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_API || "/api/graphql",
    baseUrl:
      typeof window !== "undefined"
        ? process.env.NEXT_PUBLIC_GRAPHQL_API || "/api/graphql"
        : "/api/graphql",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Products", "Product"],
  endpoints: () => ({}),
});
