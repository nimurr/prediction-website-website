import { apiSlice } from "../../../api/apiSlice";

const getCategories = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (pageNumber) => `/category?page=${pageNumber}`, // Define the GET request endpoint for categories
      method: "GET",
      providesTags: ["Category"]
    })
  })
});

const getSingleCategories = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleCategories: builder.query({
      query: (id) => `/category/${id}`, // Define the GET request endpoint for categories
      method: "GET", 
      providesTags: ["Category"]
    })
  })
});



export const { useGetCategoriesQuery } = getCategories;
export const { useGetSingleCategoriesQuery } = getSingleCategories;
