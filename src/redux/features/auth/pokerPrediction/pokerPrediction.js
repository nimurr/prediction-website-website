import { apiSlice } from "../../../api/apiSlice";

export const pokerPredictionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPokerPrediction: builder.query({
            query: (data) => ({
                url: `/poker-tournament/getall`,
                method: "GET",
                body: data,
            }),
        }),
        submitePokerPrediction: builder.mutation({
            query: (data) => ({
                url: `/poker-tournament/join-tournament`,
                method: "POST",
                body: data,
            }),
        })
    }),
});

export const { useGetAllPokerPredictionQuery, useSubmitePokerPredictionMutation } = pokerPredictionApi;