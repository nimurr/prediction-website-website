import { apiSlice } from "../../../api/apiSlice";

const getProfile = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => `/users/self/in`,
      method: "GET",
      providesTags: ["Profile"]
    })
  })
});

export const { useGetProfileQuery } = getProfile;
