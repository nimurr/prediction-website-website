import { apiSlice } from "../../../api/apiSlice";

const pricePrediction = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPricePrediction: builder.query({
            query: (data) => ({
                url: `/price-prediction/getall`,
                method: "GET",
                body: data,
            }),
        }),
    }),
});

export const { useGetAllPricePredictionQuery } = pricePrediction