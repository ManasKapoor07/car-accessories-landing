import { apiReducer } from ".";

const productApi = apiReducer.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
        }),
    }),
});

export const { useLazyGetProductsQuery , useLazyGetProductByIdQuery} = productApi;  