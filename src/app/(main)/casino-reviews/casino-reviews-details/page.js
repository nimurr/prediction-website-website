'use client'
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Page = () => {

    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ rating, review });
        setShowModal(false);
        setRating(0);
        setHover(0);
        setReview('');
    };

    return (
        <div className="contiainer px-4 md:py-20 py-10 font-sans text-[#111]">
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 items-start pb-6">
                {/* Left Side */}
                <div className='lg:col-span-6 bg-gray-100 p-5 rounded-lg'>
                    <div className=" flex flex-col md:flex-row justify-between gap-6">
                        {/* Logo and Button */}
                        <div className="flex flex-col items-center md:items-start">
                            <img
                                src="/Images/Home/yeetCasino.avif"
                                alt="BC.Game Logo"
                                className="w-14 mx-auto h-auto mb-3"
                            />
                            <button className="bg-[#007bff] hover:bg-blue-600 text-white font-semibold min-w-44 cursor-pointer px-8 py-3 rounded-xl shadow-lg shadow-blue-300">
                                Play now
                            </button>
                            <span className="text-xs text-center w-full block text-gray-500 mt-3">Terms & conditions apply</span>
                        </div>

                        {/* Bonus Content */}
                        <div className="flex flex-col md:flex-row justify-between w-full">
                            <div className="text-gray-900 space-y-6 md:pr-6">
                                <div>
                                    <strong className='text-2xl'>BONUS</strong>
                                    <p className='text-base mt-3'>
                                        Four Part Deal up to <span className="text-blue-600 font-semibold">$20,000</span>, Sports Welcome Bonus,
                                        Varied Betting Promos, Task Rewards, Rakeback, Recharges, and more.
                                    </p>
                                </div>

                                <div>
                                    <strong className='text-2xl'>FREE SPINS BONUS</strong>
                                    <p className='text-base mt-3'>
                                        Get <span className="text-blue-600 font-semibold">60 No Deposit</span> Free Spins
                                    </p>
                                </div>

                                <div>
                                    <strong className='text-2xl'>LAST UPDATED</strong>
                                    <p className='text-base mt-3'>24/07/2025</p>
                                </div>
                            </div>

                            {/* Rating boxes */}
                            <div className="flex md:flex-col gap-4 mt-6 md:mt-0">
                                {/* BTCGOSU Rating */}
                                <div className="shadow-lg bg-[#eee] space-y-1 rounded-md px-4 py-5 w-36 text-center">
                                    <div className="text-xl text-blue-600 font-semibold">5 / 5</div>
                                    <div className="flex justify-center items-center gap-1 text-blue-500">
                                        {Array(5).fill(0).map((_, i) => <FaStar key={i} className="text-blue-500 text-base" />)}
                                    </div>
                                    <div className="text-xs mt-1 text-gray-600">BTCGOSU RATING</div>
                                </div>

                                {/* User Rating */}
                                <div className="shadow-lg bg-[#eee] space-y-1 rounded-md px-4 py-5 w-36 text-center">
                                    <div className="text-xl text-blue-600 font-semibold">3.1 / 5</div>
                                    <div className="flex justify-center items-center gap-1 text-blue-500">
                                        {[...Array(3)].map((_, i) => <FaStar key={i} className="text-blue-500 text-base" />)}
                                        {[...Array(2)].map((_, i) => <FaStar key={i} className="text-gray-300 text-base" />)}
                                    </div>
                                    <div className="text-xs mt-1 text-gray-600">USER RATING (2)</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='border-t  mt-5'>
                        {/* Summary Section */}
                        <div className="mt-6">
                            <h3 className="font-bold text-xl mb-2">SUMMARY</h3>
                            <p className="text-gray-700 text-base mb-6 max-w-3xl">
                                BC.Game is a crypto casino featuring provably fair games, slots, live games and an attractive VIP program for loyal players.
                            </p>

                            <h3 className="font-bold text-xl mb-4">INFO</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-base text-[#111]">
                                {/* Left Column */}
                                <div className="space-y-3">
                                    <div>
                                        <span className="font-semibold text-xl text-[#111]"><span className='text-blue-400 text-3xl '>•</span> Established</span><br />
                                        <span className="text-gray-700">2017</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-xl text-[#111]"><span className='text-blue-400 text-3xl '>•</span> Deposit Options</span><br />
                                        <span className="text-gray-700">Over a 120 cryptos</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-xl text-[#111]"><span className='text-blue-400 text-3xl '>•</span> Minimum Withdrawal</span><br />
                                        <span className="text-gray-700">0.000977 BTC</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-xl text-[#111]"><span className='text-blue-400 text-3xl '>•</span> Languages</span><br />
                                        <span className="text-gray-700 text-base mt-2 block">
                                            English, Indian English, Vietnamese, Indonesian, Japanese, Korean, French, Spanish, Filipino, Arabic, Hindi, Turkish,
                                            Portuguese, Russian, German, Burmese, Finnish, Polish, Italian, Thai, Urdu, Malay, Bengali, Marathi, Tamil, Telugu,
                                            Simplified Chinese, and Traditional Chinese.
                                        </span>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-3">
                                    <div>
                                        <span className="font-semibold text-xl text-[#111]"><span className='text-blue-400 text-3xl '>•</span> Licence(s)</span><br />
                                        <span className="text-gray-700">Anjouan</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-xl text-[#111]"><span className='text-blue-400 text-3xl '>•</span> Minimum Deposit</span><br />
                                        <span className="text-gray-700">–</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-xl text-[#111]"><span className='text-blue-400 text-3xl '>•</span> Customer Support</span><br />
                                        <span className="text-gray-700">E-Mail, Live Chat, Bitcointalk</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-xl text-[#111]"><span className='text-blue-400 text-3xl '>•</span> Restrictions</span><br />
                                        <span className="text-gray-700">Anjouan, Australia, Spain, Netherlands, UK, US</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 bg-[#ffffff] rounded-2xl p-6 md:p-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#111]">

                                {/* Positives */}
                                <div>
                                    <h3 className="font-bold text-base mb-4">POSITIVES</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 text-lg">✔</span>
                                            <span>Terrific game variety</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 text-lg">✔</span>
                                            <span>Strong community engagement</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 text-lg">✔</span>
                                            <span>Top sportsbook</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 text-lg">✔</span>
                                            <span>Great responsible gambling tools</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Negatives */}
                                <div>
                                    <h3 className="font-bold text-base mb-4">NEGATIVES</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 text-lg">✘</span>
                                            <span>Recent scandals</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 text-lg">✘</span>
                                            <span>Recent withdrawal complaints</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 text-lg">✘</span>
                                            <span>Desktop UI may be too crowded</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Optional Placeholder Right Column */}
                <div className="lg:col-span-2 w-full bg-gray-100 rounded-lg p-4 ">
                    <h2 className="text-center text-xl font-bold mb-4">GOSU CASINO BONUS</h2>

                    <div className="space-y-6">
                        {[
                            {
                                logo: '/Images/Home/yeetCasino.avif',
                                text: '150% up to ',
                                highlight: '1.5 BTC',
                                tail: ' with 100 free spins',
                            },
                            {
                                logo: '/Images/Home/yeetCasino.avif',
                                text: '200% up to ',
                                highlight: '$25,000',
                                tail: ' with 250 free spins',
                            },
                            {
                                logo: '/Images/Home/yeetCasino.avif',
                                text: '100% up to ',
                                highlight: '1 BTC',
                                tail: ', 10% Weekly Cashback',
                            },
                            {
                                logo: '/Images/Home/yeetCasino.avif',
                                text: '100% up to ',
                                highlight: '€150',
                                tail: ' with 150 free spins',
                            },
                            {
                                logo: '/Images/Home/yeetCasino.avif',
                                text: '400% up to ',
                                highlight: '$10,000',
                                tail: ' and 50 spins',
                            },
                            {
                                logo: '/Images/Home/yeetCasino.avif',
                                text: '300% bonus + ',
                                highlight: '20 free spins',
                                tail: '',
                            },
                            {
                                logo: '/Images/Home/yeetCasino.avif',
                                text: '250% up to ',
                                highlight: '3 BTC',
                                tail: '',
                            },
                            {
                                logo: '/Images/Home/yeetCasino.avif',
                                text: 'No Deposit: ',
                                highlight: '€50 Free + 25 FS',
                                tail: '',
                            },
                            {
                                logo: '/Images/Home/yeetCasino.avif',
                                text: '150% Crypto Bonus up to ',
                                highlight: '2 ETH',
                                tail: '',
                            },
                            {
                                logo: '/Images/Home/yeetCasino.avif',
                                text: '100% up to ',
                                highlight: '0.5 BTC',
                                tail: ' + reload bonuses',
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between gap-3 border-b pb-4"
                            >
                                {/* Left: Logo and Text */}
                                <div className="flex items-center gap-3">
                                    <img src={item.logo} alt="logo" className="w-10 h-10 object-contain" />
                                    <div className="text-sm text-[#111]">
                                        {item.text}
                                        <span className="text-blue-600 font-semibold">{item.highlight}</span>
                                        {item.tail}
                                        <div className="text-[11px] text-gray-500 mt-1">
                                            Terms & conditions apply
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Button */}
                                <button className="bg-[#1eaaf1] text-white font-semibold px-4 py-1.5 text-sm rounded-md hover:bg-blue-600">
                                    Play!
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div>
                <div className="container mx-auto px-4 py-20 font-sans text-[#111]">
                    {/* Review Button */}
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-purple-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-purple-700 shadow"
                        >
                            Write a Review
                        </button>
                    </div>

                    {/* Review Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
                                <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex mb-4">
                                        {[...Array(5)].map((_, index) => {
                                            const starValue = index + 1;
                                            return (
                                                <FaStar
                                                    key={index}
                                                    className={`text-2xl cursor-pointer transition-colors duration-200 ${starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                                                        }`}
                                                    onClick={() => setRating(starValue)}
                                                    onMouseEnter={() => setHover(starValue)}
                                                    onMouseLeave={() => setHover(0)}
                                                />
                                            );
                                        })}
                                    </div>

                                    <textarea
                                        className="w-full border p-2 rounded mb-4"
                                        rows="4"
                                        placeholder="Write your review here..."
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        required
                                    ></textarea>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {/* only review example here  */}
                    {/* Review Example */}
                    {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="mt-10 rounded-lg shadow p-4 bg-white flex items-start gap-4">
                            {/* Profile Image */}
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/10438/10438143.png"
                                alt="User Profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            {/* Review Content */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-[#111]">Jon Dou</span>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        {[...Array(4)].map((_, i) => (
                                            <FaStar key={i} className="text-base" />
                                        ))}
                                        <FaStar className="text-gray-300 text-base" />
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm mb-2">
                                    Really enjoyed the variety of games and fast withdrawals. Definitely one of the better crypto casinos.
                                </p>
                                <span className="text-xs text-gray-400">Posted on August 7, 2025</span>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    );
};

export default Page;