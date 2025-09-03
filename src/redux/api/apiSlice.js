import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.212:8000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // যদি JSON.stringify করে রাখা থাকে
          const parsed = JSON.parse(token);
          if (parsed) {
            headers.set("Authorization", `Bearer ${parsed}`);
          }
        } catch (e) {
          // যদি ইতিমধ্যেই normal string হয়
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),
  tagTypes: [
    "Promotion",
    "Product",
    "Users",
    "Coupon",
    "About",
    "Category",
    "Privacy",
    "Terms",
    "ProviderStatus",
    "AdminProfile",
    "MarketingFees",
    "Transaction",
    "Notification",
    "AdsBanner",
    "Profile",
  ],
  endpoints: () => ({}),
});
