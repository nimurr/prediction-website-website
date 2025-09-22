// import React from 'react';

// const Page = () => {



//     return (
//         <div>
//             <div className='contiainer mx-auto py-10 px-4 '>
//                 <h2 className=' text-3xl font-semibold'>Terms & Conditions</h2>
//             </div>
//         </div>
//     );
// }

// export default Page;

'use client';
import { IoChevronBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { Spin } from "antd";
import { useEffect } from "react";
import { useGetPrivacyPolicyQuery } from "@/redux/features/auth/Settings/settings";
import Link from "next/link";

const PrivacyPolicyPage = () => {
    const { data: privacyPolicy, isLoading, refetch } = useGetPrivacyPolicyQuery();
    const htmlContent = privacyPolicy?.data?.content;

    // Decode HTML entities
    const decodeHtmlEntities = (html) => {
        if (!html) return "";
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <section className="contiainer py-10 w-full h-full min-h-screen">

            <div>
                <h2 className=" text-3xl font-semibold mb-10">Terms & Conditions</h2>
            </div>

            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <Spin size="large" />
                </div>
            ) : (
                <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(htmlContent) }}
                />
            )}
        </section>
    );
};

export default PrivacyPolicyPage;
