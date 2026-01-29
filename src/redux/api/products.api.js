import { apiReducer } from ".";

const productApi = apiReducer.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getUserbyId: builder.query({
      query: () => `/user/me`,
    }),
  }),
});

export const { useLazyGetProductsQuery , useLazyGetProductByIdQuery , useLazyGetUserbyIdQuery} = productApi;  