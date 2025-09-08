'use client'
import React, { useState, useEffect } from 'react';
import url from '@/redux/api/baseUrl';
import {
  useGetAllCasinoPredictionQuery,
  useGetAllReviewOfThisPostQuery,
  useGetSinngleCasinoPredictionQuery,
  useSubmiteReviewMutation,
} from '@/redux/features/auth/casinoPrediction/casinoPrediction';
import { message } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

const Page = () => {
  const [userId, setUserId] = useState("");
  const [id, setId] = useState(null);

  // ✅ Safe client-side localStorage and search param handling
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) setUserId(JSON.parse(userStr).id);
    } catch (err) {
      console.error("Failed to parse user:", err);
    }

    const params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
  }, []);

  // Only fetch if id is available
  const { data } = useGetSinngleCasinoPredictionQuery(id, { skip: !id });
  const fullData = data?.data;

  const { data: mainData, refetch } = useGetAllCasinoPredictionQuery();
  const allReview = mainData?.data;
  console.log(fullData);

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  const [submiteReview] = useSubmiteReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);
    const data = { rating, content: review, postId: id, userId };
    setRating(0);
    setHover(0);
    setReview('');

    try {
      const res = await submiteReview(data).unwrap();
      message.success("Review Submitted Successfully!");
      if (res.status) refetch();
    } catch (error) {
      message.error("Failed! Please try again");
    }
  };

  const { data: userReview } = useGetAllReviewOfThisPostQuery(id, { skip: !id });
  const fullUserReview = userReview?.data;


  // ✅ Render nothing until id is ready
  if (!id) return null;

  return (
    <div className="contiainer px-4 md:py-20 py-10 font-sans text-[#111]">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 items-start pb-6">
        {/* Left Side */}
        <div className='lg:col-span-6 bg-gray-100 p-5 rounded-lg'>
          <div className=" flex flex-col md:flex-row justify-between gap-6">
            {/* Logo and Button */}
            <div className="flex flex-col items-center md:items-start">
              <img src={url + fullData?.image} alt="BC.Game Logo" className="w-20 mx-auto h-auto mb-3" />
              <Link target='_blank' href={fullData?.casinoLink || "#"} className="bg-[#007bff] block text-center hover:bg-blue-600 text-white font-semibold min-w-44 cursor-pointer px-8 py-3 rounded-xl shadow-lg shadow-blue-300">
                Play now
              </Link>
              <span className="text-xs text-center w-full block text-gray-500 mt-3">Terms & conditions apply</span>
            </div>

            {/* Bonus Content */}
            <div className="flex flex-col md:flex-row justify-between w-full">
              <div className="text-gray-900 space-y-6 md:pr-6">
                <div>
                  <strong className='text-2xl'>BONUS</strong>
                  <p className='text-base mt-3'>{fullData?.bonusTitle}</p>
                </div>
                <div>
                  <strong className='text-2xl'>FREE SPINS BONUS</strong>
                  <p className='text-base mt-3'>{fullData?.freeSpinsBonus}</p>
                </div>
                <div>
                  <strong className='text-2xl'>LAST UPDATED</strong>
                  <p className='text-base mt-2'>{moment(fullData?.lastUpdateDate).format("DD-MM-YYYY")}</p>
                </div>
              </div>

              {/* Rating boxes */}
              <div className="flex md:flex-col gap-4 mt-6 md:mt-0">
                {/* BTCGOSU Rating */}
                <div className="shadow-lg bg-[#eee] space-y-1 rounded-md px-4 py-5 w-36 text-center">
                  <div className="text-xl text-blue-600 font-semibold">{fullData?.adminAvgRating} / 5</div>
                  <div className="flex justify-center items-center gap-1 text-blue-500">
                    {Array(fullData?.adminAvgRating).fill(0).map((_, i) => <FaStar key={i} className="text-blue-500 text-base" />)}
                  </div>
                  <div className="text-xs mt-1 text-gray-600 uppercase">Our Rating</div>
                </div>

                {/* User Rating */}
                <div className="shadow-lg bg-[#eee] space-y-1 rounded-md px-4 py-5 w-36 text-center">
                  <div className="text-xl text-blue-600 font-semibold">{fullData?.userAvgRating} / 5</div>
                  <div className="flex justify-center items-center gap-1 text-blue-500">
                  </div>
                  <div className="text-xs mt-1 text-gray-600">USER RATING</div>
                </div>
              </div>
            </div>
          </div>

          <div className='border-t mt-5'>
            {/* Summary Section */}
            <div className="mt-6">
              <h3 className="font-bold text-xl mb-2">SUMMARY</h3>
              <p className="text-gray-700 text-base mb-6 max-w-3xl">{fullData?.summaryTitle}</p>

              <h3 className="font-bold text-xl mb-4">INFO</h3>
              <div className="gap-y-4 gap-x-10 text-base text-[#111]">
                <div className="space-y-3 grid grid-cols-2 gap-5">
                  {fullData?.allInfo?.map((item, index) => (
                    <div key={index}>
                      <span className="font-semibold text-xl text-[#111]">
                        <span className='text-blue-400 text-3xl'>•</span> {item?.title}
                      </span>
                      <br />
                      <span className="text-gray-700">{item?.subTitle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Positives/Negatives */}
            <div className="mt-10 bg-[#ffffff] rounded-2xl p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#111]">
                <div>
                  <h3 className="font-bold text-base mb-4">POSITIVES</h3>
                  <ul className="space-y-2">
                    {fullData?.positivesSides?.map((item, index) => (
                      <li className="flex items-start gap-2" key={index}>
                        <span className="text-green-500 text-lg">✔</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-4">NEGATIVES</h3>
                  <ul className="space-y-2">
                    {fullData?.negativesSides?.map((item, index) => (
                      <li className="flex items-start gap-2" key={index}>
                        <span className="text-red-500 text-lg">✔</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className='space-y-5 mt-10'>
              {fullData?.otherAllInfoTitleDescriptionImage?.map((item, index) => (
                <div key={index}>
                  <span className="text-base">{item?.description}</span>
                  <img src={url + item?.image} alt={`extra-${index}`} className="max-w-xs max-h-32 object-contain rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2 w-full bg-gray-100 rounded-lg p-4 ">
          <h2 className="text-center text-xl font-bold mb-4">Contest Hunters</h2>
          <div className="space-y-6">
            {allReview?.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-3 border-b pb-4">
                <div className="flex items-center gap-3">
                  <img src={url + item?.image} alt="logo" className="w-16 object-contain" />
                  <div className="text-sm text-[#111]">{item.bonusTitle?.slice(0, 40)}</div>
                </div>
                <Link target='_blank' href={item?.casinoLink || "#"} className="bg-[#1eaaf1] block text-center text-white font-semibold px-4 py-1.5 text-sm rounded-md hover:bg-blue-600">
                  Play!
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="container mx-auto px-4 py-20 font-sans text-[#111]">
        <div className="flex justify-end mb-6">
          <button onClick={() => setShowModal(true)} className="bg-purple-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-purple-700 shadow">Write a Review</button>
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
                        className={`text-2xl cursor-pointer transition-colors duration-200 ${starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    );
                  })}
                </div>
                <textarea className="w-full border p-2 rounded mb-4" rows="4" placeholder="Write your review here..." value={review} onChange={(e) => setReview(e.target.value)} required />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* User Reviews */}
        {fullUserReview?.map((item, idx) => (
          <div key={idx} className="mt-10 rounded-lg shadow p-4 bg-white flex items-start gap-4">
            <img src={url + item?.userId?.profileImage} alt="User Profile" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[#111]">{item?.userId?.fullName}</span>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(item?.rating)].map((_, idx) => (<FaStar key={idx} className="text-base" />))}
                  ({item?.rating}/5)
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-2">{item?.content}</p>
              <span className="text-xs text-gray-400">Posted on : {moment(item?.createdAt).format("DD-MM-YYYY")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;