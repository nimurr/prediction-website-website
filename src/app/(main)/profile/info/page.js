'use client';
import React from 'react';
import Link from 'next/link';

const Page = () => {
    return (
        <div className="contiainer lg:py-20 py-10 px-5 lg:px-0">

            {/* Breadcrumb */}
            <div className="text-xl text-gray-600 mb-6">
                <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                <span className="mx-2">{'>'}</span>
                <span className="text-gray-800 font-medium">Profile</span>
            </div>

            {/* Profile Card */}
            <div className="bg-gray-100 rounded-lg  px-6 lg:py-20 py-10">
                <div className="flex-shrink-0 mx-auto mb-10 md:mx-0">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/219/219988.png" // replace with actual path or use avatar from backend
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border border-gray-300 object-cover"
                    />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-10">

                    {/* Avatar */}

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 lg:gap-y-10 w-full">
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700">Name</h4>
                            <p className="text-gray-900">Wade Warren</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700">Email</h4>
                            <p className="text-gray-900">WadeWarren@email.com</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700">Bitcointalk Username</h4>
                            <p className="text-gray-900">CryptoSage01</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700">Bitcoin Address</h4>
                            <p className="text-gray-900 break-words">1BoatSLRHtKNngkdXEeobR76b53LETtpyT</p>
                        </div>
                    </div>
                </div>

                {/* Update Button */}
                <div className="mt-8">
                    <Link href={'/profile/edit'} className="px-6 inline-block py-3 rounded-md bg-gradient-to-tl from-[#4c1d95] to-[#a878f1] cursor-pointer font-semibold text-white transition duration-200">
                        Update Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;
