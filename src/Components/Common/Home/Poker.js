'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdShareAlt } from "react-icons/io";
import { Modal } from 'antd';
import { useGetAllPokerPredictionQuery } from '@/redux/features/auth/pokerPrediction/pokerPrediction';
import moment from 'moment';
import url from '@/redux/api/baseUrl';

const Poker = () => {
    const { data } = useGetAllPokerPredictionQuery();
    const fullData = data?.data;


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTournament, setSelectedTournament] = useState(null);

    const handleOpenModal = (index) => {
        setSelectedTournament(index);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTournament(null);
    };

    return (
        <div className='contiainer mx-auto py-10 px-4'>
            <div>
                <div className='flex items-center gap-3 mb-5'>
                    <img src="/Images/Common/icons-title.png" alt="" />
                    <h3 className='text-xl font-semibold text-[#4c1d95]'>Poker Tournament</h3>
                </div>
                <h2 className='md:text-5xl text-3xl font-semibold'>Poker Tournament</h2>
            </div>

            {/* Tournament Cards */}
            <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-white'>
                {fullData?.slice(0, 3)?.map((item, index) => (
                    <div
                        key={index}
                        className='bg-[url("/Images/Home/preduction-1.png")] w-full bg-cover bg-no-repeat bg-center p-5 rounded-2xl border border-[#4c1d95] duration-500 hover:shadow-2xl shadow-purple-500/50'
                    >
                        <div className='flex items-center justify-between gap-5'>
                            <img

                                src={url + item?.uploadPokerTournamentImage}
                                alt={item?.pokerTournamentTitle}
                                className="w-12 h-12 object-contain"
                            />
                            <div className='flex items-center gap-2'>
                                <img src="/Images/Home/loading.png" alt="" />
                                <p className='text-sm font-semibold text-[#4c1d95]'>
                                    {moment(item?.time).format('DD MMM, YYYY')}
                                </p>
                            </div>
                            {/* <div className='flex items-center gap-3'>
                                <p className='text-sm font-semibold bg-[#4d1d9536] py-1 px-3 rounded-full text-[#4c1d95]'>
                                    {item?.type}
                                </p>
                            </div> */}
                        </div>

                        <div className='my-5'>
                            <h2 className='text-2xl font-semibold capitalize'>{item?.pokerTournamentTitle}</h2>
                            <p className='font-semibold my-2'>
                                Buy In: <span className='font-medium text-gray-500'>${item?.buyIn}</span>
                            </p>
                            <p className='font-semibold my-2'>
                                Time: <span className='font-medium text-gray-500'>{moment(item?.time).format('dddd, h:mm A')}</span>
                            </p>
                            <p className='font-semibold my-2'>
                                Rewards: <span className='font-medium text-gray-500'>${item?.rewards}</span>
                            </p>
                            <span className='mt-3 inline-block text-sm bg-amber-100 p-1 rounded'>Total Prediciton:- ({item?.applyPokerTournamentUsers?.length})</span>
                        </div>

                        <div className='flex items-center  gap-3 flex-wrap '>
                            <Link href={item?.joinLink} className='bg-[#4c1d95] cursor-pointer text-white py-3 px-5 rounded-full'>
                                {item?.sponsor || "Join 1Win"}
                            </Link>
                            <Link
                                href={'/join-poker-tornament-form'}
                                className='bg-gradient-to-tl from-[#4c1d95] to-[#a878f1] cursor-pointer transition-colors text-white py-3 px-5 rounded-full flex items-center gap-2'
                            >
                                Join Tournament
                                <IoMdShareAlt className='text-2xl' />
                            </Link>
                            <button
                                onClick={() => handleOpenModal(index)}
                                className='border-[#4c1d95] border-2 bg-purple-200 cursor-pointer py-3 px-5 rounded-full'
                            >
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className='flex items-center justify-center'>
                <Link href={'/join-poker-tornament'} className='bg-[#4c1d95] cursor-pointer hover:bg-[#3b117c] transition-colors text-white py-3 px-8 rounded-full'>
                    View All
                </Link>
            </div>

            {/* Ant Design Modal */}
            <Modal
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                width={700}
                centered
            >
                {selectedTournament !== null && (
                    <div className='bg-[url("/Images/Home/preduction-1.png")] w-full bg-cover bg-no-repeat bg-center p-5 rounded-2xl border border-[#4c1d95]'>
                        <div className='flex items-center justify-between gap-5'>
                            <img
                                src={url + fullData[selectedTournament]?.uploadPokerTournamentImage}
                                alt={fullData[selectedTournament]?.pokerTournamentTitle}
                                className="w-16 h-16 object-contain"
                            />
                            <div className='flex items-center gap-2'>
                                <img src="/Images/Home/loading.png" alt="" />
                                <p className='text-sm font-semibold text-[#4c1d95]'>
                                    {moment(fullData[selectedTournament]?.time).format('DD MMM, YYYY')}
                                </p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <p className='text-sm font-semibold bg-[#4d1d9536] py-1 px-3 rounded-full text-[#4c1d95]'>
                                    {fullData[selectedTournament]?.type}
                                </p>
                            </div>
                        </div>

                        <div className='my-5'>
                            <h2 className='text-3xl font-semibold capitalize'>
                                {fullData[selectedTournament]?.pokerTournamentTitle}
                            </h2>
                            <p className='font-semibold my-2'>
                                Buy In: <span className='font-medium text-gray-500'>${fullData[selectedTournament]?.buyIn}</span>
                            </p>
                            <p className='font-semibold my-2'>
                                Time: <span className='font-medium text-gray-500'>
                                    {moment(fullData[selectedTournament]?.time).format('dddd, h:mm A')}
                                </span>
                            </p>
                            <p className='font-semibold my-2'>
                                Rewards: <span className='font-medium text-gray-500'>${fullData[selectedTournament]?.rewards}</span>
                            </p>
                            <p className='font-semibold my-2'>
                                Max Players: <span className='font-medium text-gray-500'>{fullData[selectedTournament]?.maxPlayers}</span>
                            </p>
                            <p className='font-semibold my-2'>
                                Sponsor: <span className='font-medium text-gray-500'>{fullData[selectedTournament]?.sponsor}</span>
                            </p>
                        </div>

                        <div>
                            <p>
                                Join the <span className="font-semibold text-[#4c1d95]">{fullData[selectedTournament]?.pokerTournamentTitle}</span>!
                                Buy-in is <span className="font-semibold">${fullData[selectedTournament]?.buyIn}</span> for a chance to win <span className="font-semibold">${fullData[selectedTournament]?.rewards}</span>.
                            </p>
                            <br />
                            <p>
                                Tournament starts on{" "}
                                <span className="font-semibold">
                                    {moment(fullData[selectedTournament]?.time).format('MMMM Do YYYY, h:mm A')}
                                </span>. Secure your seat early and join the action!
                            </p>
                        </div>

                        <div className='flex items-center mt-5 justify-between gap-5 flex-wrap'>
                            <Link href={fullData[selectedTournament]?.joinLink} className='!bg-[#4c1d95] cursor-pointer !text-white py-3 px-5 rounded-full'>
                                {fullData[selectedTournament]?.sponsor || "Join 1Win"}
                            </Link>
                            <Link
                                href={fullData[selectedTournament]?.joinLink || '/join-poker-tornament-form'}
                                className='bg-gradient-to-tl from-[#4c1d95] to-[#a878f1] cursor-pointer transition-colors !text-white py-3 px-6 rounded-full flex items-center gap-2'
                            >
                                Join Tournament
                                <IoMdShareAlt className='text-2xl' />
                            </Link>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Poker;