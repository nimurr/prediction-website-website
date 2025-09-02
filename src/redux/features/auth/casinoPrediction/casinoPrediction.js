import { apiSlice } from "../../../api/apiSlice";

export const pokerPredictionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCasinoPrediction: builder.query({
            query: () => ({
                url: `/casino-reviews/all`,
                method: "GET"
            }),
        }),
    }),
});

export const { useGetAllCasinoPredictionQuery } = pokerPredictionApi;
