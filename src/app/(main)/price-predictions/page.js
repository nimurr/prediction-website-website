'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdShareAlt } from "react-icons/io";
import { TbMessage2Star } from "react-icons/tb";
import { HiOutlineUserGroup } from 'react-icons/hi';
import { Modal } from 'antd';
import { useGetAllPricePredictionQuery } from '@/redux/features/auth/pricePrediction/pricePrediction';
import moment from 'moment';
import url from '@/redux/api/baseUrl';

const Bonuses = () => {
    const { data, isLoading } = useGetAllPricePredictionQuery();
    const fullData = data?.data;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPrediction, setSelectedPrediction] = useState(null);

    const handleOpenModal = (item) => {
        setSelectedPrediction(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPrediction(null);
    };

    return (
        <div className='contiainer mx-auto py-10 px-4'>
            <div>
                <div className='flex items-center gap-3 mb-5'>
                    <img src="/Images/Common/icons-title.png" alt="" />
                    <h3 className='text-xl font-semibold text-[#4c1d95]'>Bonuses</h3>
                </div>
                <h2 className='md:text-5xl text-3xl font-semibold'>Top Casino Bonuses</h2>
            </div>

            {/* Loader */}
            {isLoading && (
                <div className="text-center py-10 text-lg font-semibold text-[#4c1d95]">
                    Loading bonuses...
                </div>
            )}

            {/* API Data Grid */}
            <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-white'>
                {
                    fullData?.map((item, index) => (
                        <div
                            key={index}
                            className='bg-[url("/Images/Home/preduction-2.png")] w-full bg-cover bg-no-repeat bg-center p-5 rounded-2xl border border-[#4c1d95] duration-500 hover:shadow-2xl shadow-purple-500/50'
                        >
                            <div className='flex items-center justify-between gap-5'>
                                <img src={url + item?.bitcoinImage} alt={item?.bitcoinTitle} className="w-14 h-14 object-contain" />
                                <div className='flex items-center gap-2'>
                                    <img src="/Images/Home/loading.png" alt="" />
                                    <p className='text-sm font-semibold text-[#4c1d95]'>
                                        {moment(item?.predictionDeadline).format('DD MMM, YYYY')}
                                    </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <p className='text-sm font-semibold bg-[#4d1d9536] py-1 px-3 rounded-full text-[#4c1d95]'>
                                        Live
                                    </p>
                                </div>
                            </div>

                            <div className='my-5'>
                                <h2 className='text-2xl font-semibold capitalize'>
                                    {item?.bitcoinTitle}
                                </h2>
                                <p className='font-medium mt-3'>{item?.bitcoinSubtitle}</p>
                            </div>

                            <div className='flex items-center justify-between gap-5'>
                                <Link
                                    href={'/price-predictions-form'}
                                    className='bg-gradient-to-tl max-w-64 justify-center from-[#4c1d95] to-[#a878f1] cursor-pointer transition-colors text-white py-3 px-6 rounded-full flex items-center gap-2'
                                >
                                    Submit Prediction
                                    <IoMdShareAlt className='text-2xl' />
                                </Link>
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className='border-[#4c1d95] border-2 bg-purple-200 cursor-pointer py-2 px-4 rounded-full'
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Modal */}
            <Modal
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                width={700}
                centered
            >
                {selectedPrediction && (
                    <div className='bg-[url("/Images/Home/preduction-2.png")] w-full bg-cover bg-no-repeat bg-center p-5 rounded-2xl border border-[#4c1d95]'>
                        <div className='flex items-center justify-between gap-5'>
                            <img
                                src={url + selectedPrediction?.bitcoinImage}
                                alt={selectedPrediction?.bitcoinTitle}
                                className="w-16 h-16 object-contain"
                            />
                            <div className='flex items-center gap-2'>
                                <img src="/Images/Home/loading.png" alt="" />
                                <p className='text-sm font-semibold text-[#4c1d95]'>
                                    {moment(selectedPrediction?.predictionDeadline).format('DD MMM, YYYY')}
                                </p>
                            </div>
                        </div>

                        <div className='my-5'>
                            <h2 className='text-3xl font-semibold capitalize'>
                                {selectedPrediction?.bitcoinTitle}
                            </h2>
                            <p className='font-medium mt-3'>
                                {selectedPrediction?.bitcoinSubtitle}
                            </p>
                        </div>

                        <div className='flex items-center mt-5 justify-between'>
                            <Link
                                href={'/price-predictions-form'}
                                className='bg-gradient-to-tl from-[#4c1d95] to-[#a878f1] cursor-pointer transition-colors !text-white py-3 px-6 rounded-full flex items-center gap-2'
                            >
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

export default Bonuses;
