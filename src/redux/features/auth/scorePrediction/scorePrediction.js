import { apiSlice } from "../../../api/apiSlice";

const scorePrediction = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllScorePrediction: builder.query({
            query: (data) => ({
                url: `/score-prediction/getAll`,
                method: "GET",
                body: data,
            }),
        }),
    }),
});

export const { useGetAllScorePredictionQuery } = scorePrediction;