'use client';
import { useGetAllCasinoPredictionQuery } from '@/redux/features/auth/casinoPrediction/casinoPrediction';
import Link from 'next/link';
import React from 'react';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { TbMessage2Star } from 'react-icons/tb';
import moment from 'moment';
import url from '@/redux/api/baseUrl';
import { FaChevronRight } from 'react-icons/fa6';

const Bonuses = () => {
    const { data, isLoading } = useGetAllCasinoPredictionQuery();
    const fullData = data?.data;

    if (isLoading) {
        return <p className=" py-10">Loading bonuses...</p>;
    }

    return (
        <div className='contiainer mx-auto py-10 px-4 '>
            <div className='flex items-center text-sm mb-10 font-semibold gap-3 '>
                <h3 className=' '>Home</h3> <FaChevronRight /> <span className='text-[#4c1d95]'>Casino Reviews</span>
            </div>
            {/* Header */}
            <div>
                <div className='flex items-center gap-3 mb-5'>
                    <img src="/Images/Common/icons-title.png" alt="" />
                    <h3 className='text-xl font-semibold text-[#4c1d95]'>Reviews</h3>
                </div>
                <h2 className='md:text-5xl text-3xl font-semibold'>Top Casino Reviews</h2>
            </div>

            {/* Cards */}
            <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-white'>
                {fullData?.map((bonus, index) => (
                    <div
                        key={index}
                        className='bg-[url("/Images/Home/preduction-2.png")] w-full bg-cover bg-no-repeat bg-center p-5 rounded-2xl border border-[#4c1d95] duration-500 hover:shadow-2xl shadow-purple-500/50'
                    >
                        {/* Casino Logo */}
                        <div className='flex items-center '>
                            <img
                                className='w-20 h-20 object-contain rounded-full border border-[#4c1d95] p-1'
                                src={url + bonus.image}
                                alt={bonus.bonusTitle}
                            />
                        </div>

                        {/* Bonus Info */}
                        <div className='my-5 '>
                            <h2 className='text-2xl font-semibold capitalize'>{bonus.bonusTitle}</h2>
                            <p className='font-medium mt-2 text-gray-600'>{bonus.freeSpinsBonus}</p>
                            <p className='text-sm mt-1 text-gray-400'>
                                Last updated: {moment(bonus.lastUpdateDate).format('MMM DD, YYYY')}
                            </p>
                            <p className='text-sm mt-1'>
                                <span className="font-semibold text-[#4c1d95]">Admin:</span> ⭐ {bonus.adminAvgRating} &nbsp; | &nbsp;
                                <span className="font-semibold text-[#4c1d95]">Users:</span> ⭐ {bonus.userAvgRating}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className='flex items-center justify-between gap-5'>
                            <Link
                                href={bonus.casinoLink || '#'}
                                target="_blank"
                                className='bg-gradient-to-tl from-[#4c1d95] to-[#a878f1] cursor-pointer transition-colors text-white py-3 px-4 rounded-full flex items-center gap-2'
                            >
                                Join Now
                                <HiOutlineUserGroup className='text-2xl' />
                            </Link>
                            <Link
                                href={`/casino-reviews/casino-reviews-details?id=${bonus?._id}`}
                                className='border border-[#4c1d95] cursor-pointer text-[#4c1d95] py-3 px-4 rounded-full flex items-center gap-2'
                            >
                                Read Review
                                <TbMessage2Star className='text-2xl' />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default Bonuses;

