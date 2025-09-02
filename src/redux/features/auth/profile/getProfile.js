import { apiSlice } from "../../../api/apiSlice";

const getProfile = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => `/users/self/in`,
      method: "GET",
      providesTags: ["Profile"]
    }),
    myAllPrediction: builder.query({
      query: (id) => `/users/my-prediction/all/${id}`,
      method: "GET",
      providesTags: ["Prediction"]
    })
  })
});

export const { useGetProfileQuery, useMyAllPredictionQuery } = getProfile;
