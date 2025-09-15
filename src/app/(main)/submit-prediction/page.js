'use client';

import { useGetProfileQuery } from '@/redux/features/auth/profile/getProfile';
import { useGetAllScorePredictionQuery, useSubmitPredictionMutation } from '@/redux/features/auth/scorePrediction/scorePrediction';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const { data: userData } = useGetProfileQuery();
    const profile = userData?.data?.attributes?.user;

    const { data, isLoading } = useGetAllScorePredictionQuery();
    const [submitPrediction, { isLoading: submitting }] = useSubmitPredictionMutation();
    const predictionData = data?.data;

    // Form state
    const [formData, setFormData] = useState({
        userId: '',
        predictionId: '',
        bitcointalkUsername: '',
        bitcoinAddress: '',
        casinoUsername: '',
        email: '',
        predictionTime: '',
        predictionSide1: '',
        predictionSide2: '',
        status: 'submitted',
    });

    // Set userId when profile is loaded
    useEffect(() => {
        setFormData((prev) => ({ ...prev, userId: profile?.id }));
    }, [profile]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle contest selection
    const handleEventChange = (e) => {
        const eventId = e.target.value;
        setFormData((prev) => ({
            ...prev,
            predictionId: eventId,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!profile) {
            toast.error('User not logged in. Please wait.');
            return;
        }


        // if (!formData.userId || !formData.predictionId) {
        //   toast.error('User or contest not selected correctly.');
        //   return;
        // }

        try {
            const payload = { ...formData };
            console.log('Submitting payload:', payload);

            const result = await submitPrediction(payload).unwrap();

            if (result?.code === 200) {
                toast.success('Prediction submitted successfully!');
                // Reset form except userId
                setFormData((prev) => ({
                    ...prev,
                    predictionId: '',
                    bitcointalkUsername: '',
                    bitcoinAddress: '',
                    casinoUsername: '',
                    email: '',
                    predictionTime: '',
                    predictionSide1: '',
                    predictionSide2: '',
                }));
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading contests...</p>;

    return (
        <div className="px-4 md:px-0 contiainer py-5">
            <ToastContainer />
            <h2 className="text-sm text-gray-600 my-10 font-semibold p-2">
                <span className="text-blue-600">Home</span> &gt; Submit Prediction
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-gray-50 rounded-2xl my-5">
                <h1 className="text-2xl font-bold mb-4">Submit Your Prediction</h1>
                <hr className="border-0 h-0.5 bg-gray-400" />

                {/* Contest Selection */}
                <div>
                    <label className="block mb-1 font-medium">Select Contest:</label>
                    <select
                        name="predictionId"
                        value={formData.predictionId}
                        onChange={handleEventChange}
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                        required
                    >
                        <option value="">--Choose An Event--</option>
                        {predictionData?.map((event) => (
                            <option key={event._id} value={event._id}>
                                {event.firstTeamName} vs {event.secondTeamName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Bitcointalk Username */}
                <div>
                    <label className="block mb-1 font-medium">Bitcointalk Username:</label>
                    <input
                        type="text"
                        name="bitcointalkUsername"
                        value={formData.bitcointalkUsername}
                        onChange={handleChange}
                        placeholder="Enter your Bitcointalk Username"
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                        required
                    />
                </div>

                {/* Bitcoin Address */}
                <div>
                    <label className="block mb-1 font-medium">Bitcoin Address:</label>
                    <input
                        type="text"
                        name="bitcoinAddress"
                        value={formData.bitcoinAddress}
                        onChange={handleChange}
                        placeholder="Enter your Bitcoin Address"
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
                            value={formData.casinoUsername}
                            onChange={handleChange}
                            placeholder="Enter your Casino Username"
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
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your Email"
                            className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                        />
                    </div>
                </div>

                {/* Prediction Time */}
                <div>
                    <label className="block mb-1 font-medium">Score Time:</label>
                    <input
                        type="text"
                        name="predictionTime"
                        value={formData.predictionTime}
                        onChange={handleChange}
                        placeholder="Predict the minute of first goal"
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                        required
                    />
                </div>

                {/* Prediction Side 1 */}
                <div className='flex items-center gap-5 flex-wrap'>
                    <div className='max-w-48'>
                        <label className="block mb-1 font-medium">Team A:</label>
                        <input
                            type="text"
                            name="predictionSide1"
                            value={formData.predictionSide1}
                            onChange={handleChange}
                            placeholder="Enter Score"
                            className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                            required
                        />
                    </div>

                    {/* Prediction Side 2 */}
                    <div className='max-w-48'>
                        <label className="block mb-1 font-medium">Team B:</label>
                        <input
                            type="text"
                            name="predictionSide2"
                            value={formData.predictionSide2}
                            onChange={handleChange}
                            placeholder="Enter Score"
                            className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                            required
                        />
                    </div>

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