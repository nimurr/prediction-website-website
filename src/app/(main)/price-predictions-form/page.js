'use client';

import {
    useGetAllPricePredictionQuery,
    useSubmitePricePredictionMutation,
} from '@/redux/features/auth/pricePrediction/pricePrediction';
import { useGetProfileQuery } from '@/redux/features/auth/profile/getProfile';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Page = () => {
    const { data: userData } = useGetProfileQuery();
    const profile = userData?.data?.attributes?.user;

    const { data: contests, isLoading: contestsLoading } = useGetAllPricePredictionQuery();
    const [submitPricePrediction, { isLoading: submitting }] = useSubmitePricePredictionMutation();

    console.log(contests?.data);


    const [formData, setFormData] = useState({
        userId: '',
        pricePredictionId: '',
        bitcoinAddress: '',
        bitcointalkUsername: '',
        casinoUsername: '',
        email: '',
        predictedPrice: '',
    });

    // Prefill user data when profile is available
    useEffect(() => {
        if (profile) {
            setFormData((prev) => ({
                ...prev,
                userId: profile.id,
                bitcointalkUsername: profile.bitcointalkUsername || '',
                bitcoinAddress: profile.bitcoinAddress || '',
                casinoUsername: profile.casinoUsername || '',
                email: profile.email || '',
            }));
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                predictedPrice: Number(formData.predictedPrice),
            };
            console.log('Submitting payload:', payload);

            const result = await submitPricePrediction(payload).unwrap();
            console.log('Prediction submitted successfully:', result);
            toast.success('Prediction submitted successfully!', { autoClose: 5000 });
            e.target.reset();
            setFormData({
                userId: '',
                pricePredictionId: '',
                bitcoinAddress: '',
                bitcointalkUsername: '',
                casinoUsername: '',
                email: '',
                predictedPrice: '',
            });

        } catch (err) {
            console.error('Failed to submit:', err);
            toast.error('Failed to submit prediction', { autoClose: 5000 });
        }
    };

    if (contestsLoading) return <p className="text-center py-10">Loading contests...</p>;

    return (
        <div className="contiainer py-10 px-5 lg:px-0">
            <ToastContainer />
            <h2 className="text-sm text-gray-600 my-10 font-semibold">
                <span className="text-blue-600">Home</span> &gt; Submit Price Prediction
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-gray-50 rounded-2xl my-10">
                <h1 className="text-2xl font-bold mb-4">Submit your price prediction</h1>
                <hr className="border-0 h-0.5 bg-gray-400" />

                {/* Contest Selection */}
                <div>
                    <label className="block mb-1 font-medium">Select Price Prediction Contest:</label>
                    <select
                        name="pricePredictionId"
                        value={formData.pricePredictionId}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                        required
                    >
                        <option value="">--Choose An Event--</option>
                        {contests?.data?.map((contest) => (
                            <option key={contest._id} value={contest._id}>
                                {contest?.bitcoinTitle}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Bitcoin Address */}
                <div>
                    <label className="block mb-1 font-medium">Your Bitcoin Address:</label>
                    <input
                        type="text"
                        name="bitcoinAddress"
                        placeholder="Enter your Bitcoin Address"
                        value={formData.bitcoinAddress}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                        required
                    />
                </div>

                {/* Bitcointalk Username */}
                <div>
                    <label className="block mb-1 font-medium">Bitcointalk Username:</label>
                    <input
                        type="text"
                        name="bitcointalkUsername"
                        placeholder="Enter your Bitcointalk Username"
                        value={formData.bitcointalkUsername}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                        required
                    />
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    {/* Casino Username */}
                    <div>
                        <label className="block mb-1 font-medium">Casino Username:</label>
                        <input
                            type="text"
                            name="casinoUsername"
                            placeholder="Enter your Casino Username"
                            value={formData.casinoUsername}
                            onChange={handleChange}
                            className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email (optional):</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                        />
                    </div>
                </div>

                {/* Predicted Price */}
                <div>
                    <label className="block mb-1 font-medium">Your Predicted Price (USD):</label>
                    <input
                        type="number"
                        name="predictedPrice"
                        placeholder="Enter predicted price"
                        value={formData.predictedPrice}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className={`px-6 py-3 rounded-full font-semibold text-white transition duration-200 ${submitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-tl from-[#4c1d95] to-[#a878f1] cursor-pointer'
                        }`}
                >
                    {submitting ? 'Submitting...' : 'Submit Prediction'}
                </button>
            </form>
        </div>
    );
};

export default Page;