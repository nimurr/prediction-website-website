'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGetProfileQuery } from '@/redux/features/auth/profile/getProfile';
import { useUpdateProfileMutation } from '@/redux/features/auth/profile/editProfile';
import url from '@/redux/api/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import { FaFileImage } from 'react-icons/fa6';


const Page = () => {
    const { data, isLoading: profileLoading } = useGetProfileQuery();
    const profile = data?.data?.attributes?.user;

    const [editProfile, { isLoading }] = useUpdateProfileMutation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bitcointalkUsername, setBitcointalkUsername] = useState('');
    const [bitcoinAddress, setBitcoinAddress] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    // 🔹 Prefill form when profile data arrives
    useEffect(() => {
        if (profile) {
            setName(profile.fullName || '');
            setEmail(profile.email || '');
            setBitcointalkUsername(profile.bitcointalkUsername || '');
            setBitcoinAddress(profile.bitcoinAddress || '');
        }
    }, [profile]);

    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('fullName', name); // 🔹 your backend expects fullName, not "name"
            formData.append('bitcointalkUsername', bitcointalkUsername);
            formData.append('bitcoinAddress', bitcoinAddress);
            if (profileImage) {
                formData.append('profileImage', profileImage);
            }

            const result = await editProfile(formData).unwrap();

            toast.success('Profile updated successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            window.location.href = '/profile/info';
        } catch (error) {
            toast.error(error?.data?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    };

    if (profileLoading) return <p className="text-center py-10">Loading profile...</p>;

    return (
        <div className="contiainer lg:py-20 py-10 px-5 lg:px-0">
            <ToastContainer />
            {/* Breadcrumb */}
            <div className="text-xl text-gray-600 mb-6">
                <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                <span className="mx-2">{'>'}</span>
                <span className="text-gray-800 font-medium">Edit Profile</span>
            </div>

            {/* Profile Card */}
            <div className="bg-gray-100 rounded-lg px-6 py-20">
                {/* Avatar */}
                <div className="flex-shrink-0 mx-auto mb-10 md:mx-0 text-center">
                    <img
                        src={
                            profileImage
                                ? URL.createObjectURL(profileImage)
                                : profile?.profileImage
                                    ? url + profile.profileImage
                                    : "https://cdn-icons-png.flaticon.com/512/219/219988.png"
                        }
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border border-gray-300 object-cover mx-auto"
                    />
                    <div className='flex justify-center'>
                        <label className='flex justify-center  mt-2 items-center gap-2 border border-gray-200 text-center p-2 rounded-lg' htmlFor="">
                            <FaFileImage className="text-2xl text-gray-600" />
                            <input
                                type="file"
                                accept="image/*"
                                className=""
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
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
                            <label className="text-xl font-semibold text-gray-700 block mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                disabled
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
                        disabled={isLoading}
                        className={`px-6 py-3 rounded-md font-semibold text-white transition duration-200 
              ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-tl from-[#4c1d95] to-[#a878f1] cursor-pointer"}
            `}
                    >
                        {isLoading ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;