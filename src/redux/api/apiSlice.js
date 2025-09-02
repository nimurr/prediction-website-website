/* eslint-disable no-unused-vars */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://luxtable.sakibahmad.com/api/v1",
    baseUrl: "http://192.168.31.188:8000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      //   console.log("9 baseApi", token);
      if (token) {
        headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
      }


      return headers;
    }
  }),
  tagTypes: ["Promotion", "Product", "Users", "Coupon", "About", "Category", "Privacy", "Terms", "ProviderStatus", "AdminProfile", "MarketingFees", "Transaction", "Notification", "AdsBanner", "Profile"],

  endpoints: () => ({})
});
