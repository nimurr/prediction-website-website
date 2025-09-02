import { apiSlice } from "../../../api/apiSlice";

const updateProfile = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/users/self/update`, // Make sure this matches the correct route in your backend
        method: "PATCH", // Change to PATCH
        body: data // Send the formData or data as the body
      }),
      invalidatesTags: ["Profile"] // Invalidate tags to refetch profile data
      // AdminProfile
    })
  })
});

export const { useUpdateProfileMutation } = updateProfile;
