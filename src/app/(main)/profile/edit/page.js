'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const Page = () => {
    const [name, setName] = useState('Wade Warren');
    const [email, setEmail] = useState('WadeWarren@email.com');
    const [bitcointalkUsername, setBitcointalkUsername] = useState('CryptoSage01');
    const [bitcoinAddress, setBitcoinAddress] = useState('1BoatSLRHtKNngkdXEeobR76b53LETtpyT');

    const handleUpdate = () => {
        // TODO: Replace with actual update logic (API call)
        console.log({ name, email, bitcointalkUsername, bitcoinAddress });
        alert('Profile updated!');
    };

    return (
        <div className="contiainer lg:py-20 py-10 px-5 lg:px-0">

            {/* Breadcrumb */}
            <div className="text-xl text-gray-600 mb-6">
                <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                <span className="mx-2">{'>'}</span>
                <span className="text-gray-800 font-medium">Edit Profile</span>
            </div>

            {/* Profile Card */}
            <div className="bg-gray-100 rounded-lg px-6 py-20">
                
                {/* Avatar */}
                <div className="flex-shrink-0 mx-auto mb-10 md:mx-0">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border border-gray-300 object-cover"
                    />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-10">

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 lg:gap-y-10 w-full">
                        {/* Name */}
                        <div>
                            <label className="text-xl font-semibold text-gray-700 block mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border border-[#4c1d95] rounded-md bg-white focus:outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-xl font-semibold  text-gray-700 block mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-[#4c1d95] cursor-not-allowed rounded-md bg-gray-300 focus:outline-none"
                            />
                        </div>

                        {/* Bitcointalk Username */}
                        <div>
                            <label className="text-xl font-semibold text-gray-700 block mb-1">Bitcointalk Username</label>
                            <input
                                type="text"
                                value={bitcointalkUsername}
                                onChange={(e) => setBitcointalkUsername(e.target.value)}
                                className="w-full p-2 border border-[#4c1d95] rounded-md bg-white focus:outline-none"
                            />
                        </div>

                        {/* Bitcoin Address */}
                        <div>
                            <label className="text-xl font-semibold text-gray-700 block mb-1">Bitcoin Address</label>
                            <input
                                type="text"
                                value={bitcoinAddress}
                                onChange={(e) => setBitcoinAddress(e.target.value)}
                                className="w-full p-2 border border-[#4c1d95] rounded-md bg-white focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Update Button */}
                <div className="mt-10">
                    <button
                        onClick={handleUpdate}
                        className="px-6 py-3 rounded-md bg-gradient-to-tl from-[#4c1d95] to-[#a878f1] cursor-pointer font-semibold text-white transition duration-200"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
