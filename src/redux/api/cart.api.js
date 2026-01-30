import { apiReducer } from ".";

const cartApi = apiReducer.injectEndpoints({
  endpoints: (builder) => ({
    addTocart: builder.mutation({
      query: (cartItem) => ({
        url: "/cart/add",
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["getItems"],
    }),

    deletecart: builder.mutation({
      query: (id) => ({
        url: `/cart/remove/${id}`,
        method: "DELETE",
        // params: id,
      }),
      invalidatesTags: ["getItems"],
    }),

    updateCart: builder.mutation({
      query: (cartItem) => ({
        url: `/cart/update`,
        method: "PUT",
        body: cartItem,
      }),
      invalidatesTags: ["getItems"],
    }),

    // mergeCart: builder.mutation({
    //   query: (cartItem) => ({
    //     url: `/cart/merge`,
    //     method: "POST",
    //     body: cartItem,
    //   }),
    //   invalidatesTags: ["getItems"],
    // }),

    getCart: builder.query({
      query: () => ({
        url: `/cart/get-items`,
        method: "GET",
      }),
      providesTags: ["getItems"],
    }),
  }),
});

export const {
  useAddTocartMutation,
  useDeletecartMutation,
  useLazyGetCartQuery,
  useUpdateCartMutation,
  // useMergeCartMutation
} = cartApi;
