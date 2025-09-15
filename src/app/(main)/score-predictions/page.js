'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import { IoMdShareAlt } from "react-icons/io";
import { useGetAllScorePredictionQuery } from '@/redux/features/auth/scorePrediction/scorePrediction';
import url from '@/redux/api/baseUrl';
import moment from 'moment';
import { Modal } from 'antd';

const Page = () => {
    const { data, isLoading } = useGetAllScorePredictionQuery();
    const fullData = data?.data;
    console.log(fullData);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);

    const handleOpenModal = (item) => {
        setSelectedMatch(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMatch(null);
    };

    return (
        <div className='contiainer mx-auto py-10 px-4 '>
            {/* Breadcrumb */}
            <div className='flex items-center text-sm mb-10 font-semibold gap-3 '>
                <h3 className=' '>Home</h3> <FaChevronRight /> <span className='text-[#4c1d95]'>Score Predictions</span>
            </div>

            {/* Title */}
            <div>
                <div className='flex items-center gap-3 mb-5'>
                    <img src="/Images/Common/icons-title.png" alt="" />
                    <h3 className='text-xl font-semibold text-[#4c1d95]'>Predictions</h3>
                </div>
                <h2 className='md:text-5xl text-3xl font-semibold'>Featured Contests</h2>
            </div>

            {/* Loader */}
            {isLoading && (
                <div className="text-center py-10 text-lg font-semibold text-[#4c1d95]">
                    Loading predictions...
                </div>
            )}

            {/* Predictions Grid */}
            <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-white'>
                {
                    fullData?.map((item, index) => (
                        <div key={index} className='bg-[url("/Images/Home/preduction-1.png")] w-full bg-cover bg-no-repeat bg-center p-5 rounded-2xl border border-[#4c1d95] duration-500 hover:shadow-2xl shadow-purple-500/50'>
                            <div className='flex items-center justify-between gap-5'>
                                <img src={url + item?.sportImage} alt="sport" className="!w-12 !h-12 object-contain" />

                                <div className='flex items-center gap-2 '>
                                    <img src="/Images/Home/loading.png" alt="" />
                                    <p className='text-sm font-semibold text-[#4c1d95]'>
                                        {moment(item?.predictionDeadline).format('MMM DD, YYYY')}
                                    </p>
                                </div>
                            </div>
                            <div className='my-5'>
                                <h2 className='text-2xl font-semibold capitalize'>
                                    {item?.firstTeamName} vs {item?.secondTeamName}
                                </h2>
                                <p className='font-medium mt-3'>{item?.sportTitle}</p>
                                <span className='mt-3 inline-block text-sm bg-amber-100 p-1 rounded'>Total Prediciton:- ({item?.applyAllPredictions?.length})</span>
                            </div>
                            <div className='flex items-center justify-between gap-5'>
                                <Link href={'/submit-prediction'} className='bg-gradient-to-tl max-w-64 justify-center from-[#4c1d95] to-[#a878f1] cursor-pointer transition-colors text-white py-3 px-6 rounded-full flex items-center gap-2'>
                                    Submit Prediction
                                    <IoMdShareAlt className='text-2xl' />
                                </Link>
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className='border-[#4c1d95] border-2 bg-purple-200 cursor-pointer py-2 px-4 rounded-full'>
                                    Details
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Modal for Details */}
            <Modal
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                width={700}
                centered
            >
                {selectedMatch && (
                    <div className='p-5'>
                        <div className='flex items-center justify-between gap-5'>
                            <img src={url + selectedMatch?.sportImage} alt="" className="w-16 h-16 object-contain" />
                            <div className='flex items-center gap-2'>
                                <img src="/Images/Home/loading.png" alt="" />
                                <p className='text-sm font-semibold text-[#4c1d95]'>
                                    {moment(selectedMatch?.predictionDeadline).format('DD MMM, YYYY')}
                                </p>
                            </div>
                        </div>
                        <div className='my-5'>
                            <h2 className='text-2xl font-semibold'>
                                {selectedMatch?.firstTeamName} vs {selectedMatch?.secondTeamName}
                            </h2>
                            <h3 className='text-lg font-semibold my-3'>{selectedMatch?.sportTitle}</h3>
                            <p className='font-medium'>{selectedMatch?.sportDescription}</p>
                        </div>
                        <div>
                            <p>
                                Prediction closes on{" "}
                                <span className="font-semibold text-[#4c1d95]">
                                    {moment(selectedMatch?.predictionDeadline).format('MMMM Do YYYY, h:mm A')}
                                </span>
                            </p>
                        </div>
                        <div className='flex items-center mt-5 justify-between'>
                            <Link href={'/submit-prediction'} className='bg-gradient-to-tl from-[#4c1d95] to-[#a878f1] cursor-pointer transition-colors !text-white py-3 px-6 rounded-full flex items-center gap-2'>
                                Submit Prediction
                                <IoMdShareAlt className='text-2xl' />
                            </Link>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Page;
