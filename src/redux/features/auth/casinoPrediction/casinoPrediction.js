import { apiSlice } from "../../../api/apiSlice";

export const pokerPredictionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCasinoPrediction: builder.query({
            query: () => ({
                url: `/casino-reviews/all`,
                method: "GET"
            }),
        }),
        getSinngleCasinoPrediction: builder.query({
            query: (id) => ({
                url: `/casino-reviews/single/${id}`,
                method: "GET"
            }),
        }),
        submiteReview: builder.mutation({
            query: (data) => ({
                url: `/casino-reviews/take-review`,
                method: "POST",
                body: data,
            }),
        }),
        getAllReviewOfThisPost: builder.query({
            query: (id) => ({
                url: `/casino-reviews/all-review/${id}`,
                method: "GET"
            }),
        }),

    }),
});

export const { useGetAllCasinoPredictionQuery, useGetSinngleCasinoPredictionQuery, useSubmiteReviewMutation , useGetAllReviewOfThisPostQuery } = pokerPredictionApi;
