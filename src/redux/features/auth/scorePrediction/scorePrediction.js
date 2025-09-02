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
        submitPrediction: builder.mutation({
            query: (data) => ({
                url: `/score-prediction/submit-prediction`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetAllScorePredictionQuery , useSubmitPredictionMutation } = scorePrediction;