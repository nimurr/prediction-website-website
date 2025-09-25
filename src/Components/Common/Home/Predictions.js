'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdShareAlt } from "react-icons/io";
import { Modal } from 'antd';
import { useGetAllScorePredictionQuery } from '@/redux/features/auth/scorePrediction/scorePrediction';
import moment from 'moment';
import url from '@/redux/api/baseUrl';

const Predictions = () => {

    const { data, isLoading } = useGetAllScorePredictionQuery();
    const fullData = data?.data;




    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);

    const handleOpenModal = (index) => {
        setSelectedMatch(index);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMatch(null);
    };

    return (
        <div className='contiainer mx-auto py-10 px-4'>
            <div>
                <div className='flex items-center gap-3 mb-5'>
                    <img src="/Images/Common/icons-title.png" alt="" />
                    <h3 className='text-xl font-semibold text-[#4c1d95]'>Score Predictions</h3>
                </div>
                <h2 className='md:text-5xl text-3xl font-semibold'>Predict Your Score</h2>
            </div>

            {
                isLoading &&
                <span>
                    loading ...
                </span>
            }

            <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-white'>
                {
                    fullData?.slice(0, 3)?.map((item, index) => (
                        <div key={index} className='bg-[url("/Images/Home/preduction-1.png")] w-full bg-cover bg-no-repeat bg-center p-5 rounded-2xl border border-[#4c1d95]  duration-500 hover:shadow-2xl shadow-purple-500/50'>
                            <div className='flex items-center justify-between gap-5'>
                                <img className='w-12 h-12' src={url + item?.sportImage} alt="" />
                                <div className='flex items-center gap-2 '>
                                    <img src="/Images/Home/loading.png" alt="" />
                                    <p className='text-sm font-semibold text-[#4c1d95]'>{moment(item?.predictionDeadline).format('DD-MM-YYYY')}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Link target='_blank' className='text-sm text-[#fff] font-semibold bg-[#4d1d95] py-1 px-3 rounded' href={`${item?.sponsorLink}`}>{item?.sponsorName || "N/A"}</Link>
                                </div>
                            </div>
                            <div className='my-5'>
                                <h2 className='text-3xl font-semibold capitalize'>Soccer: {item?.firstTeamName} vs {item?.secondTeamName}</h2>
                                <p className='font-medium mt-3'>{item?.sportTitle}</p>
                                <span className='mt-3 inline-block text-sm bg-amber-100 p-1 rounded'>Total Prediciton:- ({item?.applyAllPredictions?.length})</span>
                            </div>
                            <div className='flex items-center justify-between gap-5'>
                                <Link href={'/submit-prediction'} className='bg-gradient-to-tl max-w-64 justify-center from-[#4c1d95] to-[#a878f1] cursor-pointer transition-colors text-white py-3 px-8 rounded-full flex items-center gap-2'>
                                    Submit Prediction
                                    <IoMdShareAlt className='text-2xl' />
                                </Link>
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className='border-[#4c1d95] border-2 bg-purple-200 cursor-pointer py-3 px-3 rounded-full'
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='flex items-center justify-center'>
                <Link href={'/score-predictions'} className='bg-[#4c1d95] cursor-pointer hover:bg-[#3b117c] transition-colors text-white py-3 px-8 rounded-full'>View All</Link>
            </div>

            {/* Ant Design Modal */}
            <Modal
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                width={700}
                centered
            >
                {selectedMatch !== null && (
                    <div className='bg-[url("/Images/Home/preduction-1.png")] w-full bg-cover bg-no-repeat bg-center p-5 rounded-2xl border border-[#4c1d95]'>
                        <div className='flex items-center justify-between gap-5'>
                            <img
                                src={url + selectedMatch?.sportImage}
                                alt={selectedMatch?.sportTitle}
                                className="w-16 h-16 object-contain"
                            />
                            <div className='flex items-center gap-2'>
                                <img src="/Images/Home/loading.png" alt="" />
                                <p className='text-sm font-semibold text-[#4c1d95]'>
                                    {moment(selectedMatch?.predictionDeadline).format('DD MMM, YYYY')}
                                </p>
                            </div>
                            <div className='flex items-center gap-3'>
                                {/* <p className='text-sm font-semibold bg-[#4d1d9536] py-1 px-3 rounded-full text-[#4c1d95]'>
                                    {selectedMatch?.firstTeamName} vs {selectedMatch?.secondTeamName}
                                </p> */}
                            </div>
                        </div>

                        <div className='my-t'>
                            <h2 className='text-3xl font-semibold capitalize'>
                                {selectedMatch?.firstTeamName} vs {selectedMatch?.secondTeamName}
                            </h2>
                            <h3 className='text-xl font-semibold my-3'>{selectedMatch?.sportTitle}</h3>
                            <p className='font-medium '>
                                {selectedMatch?.sportDescription}
                            </p>
                        </div>

                        <div>
                            <p>
                                This prediction closes on{" "}
                                <span className="font-semibold text-[#4c1d95]">
                                    {moment(selectedMatch?.predictionDeadline).format('MMMM Do YYYY, h:mm A')}
                                </span>.
                            </p>
                            <p>
                                Submit your prediction before the deadline. All entries are final once submitted.
                            </p>
                        </div>

                        <div className='flex items-center mt-5 justify-between gap-5'>
                            <Link
                                href={'/submit-prediction'}
                                className='bg-gradient-to-tl max-w-64 justify-center from-[#4c1d95] to-[#a878f1] cursor-pointer transition-colors !text-white py-3 px-8 rounded-full flex items-center gap-2'
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

export default Predictions;
