import { apiSlice } from "../../../api/apiSlice";
// only get info/privacy-policy , info/terms-condition , info/about-us

const updateProfile = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: `/info/privacy-policy`,
                method: "GET"
            }),
            providesTags: ["PrivacyPolicy"]
        }),
        getTermsCondition: builder.query({
            query: () => ({
                url: `/info/terms-condition`,
                method: "GET"
            }),
            providesTags: ["TermsCondition"]
        }),
        getAboutUs: builder.query({
            query: () => ({
                url: `/info/about-us`,
                method: "GET"
            }),
            providesTags: ["AboutUs"]
        })
    })
});

export const { 
    
    useGetPrivacyPolicyQuery, 
    useGetTermsConditionQuery,
    useGetAboutUsQuery 

} = updateProfile;

