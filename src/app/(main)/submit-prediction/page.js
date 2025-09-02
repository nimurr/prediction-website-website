'use client';

import { useGetProfileQuery } from '@/redux/features/auth/profile/getProfile';
import { useGetAllScorePredictionQuery, useSubmitPredictionMutation } from '@/redux/features/auth/scorePrediction/scorePrediction';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Page = () => {
    const { data: userData } = useGetProfileQuery();
    const profile = userData?.data?.attributes?.user;

    const { data, isLoading } = useGetAllScorePredictionQuery();
    const [submitPrediction, { isLoading: submitting }] = useSubmitPredictionMutation();
    const predictionData = data?.data;

    // Form state
    const [formData, setFormData] = useState({
        userId: profile?.id,
        predictionId: '',
        bitcointalkUsername: '',
        bitcoinAddress: '',
        casinoUsername: '',
        email: '',
        predictionSide: '',
    });

    const [selectSite, setSelectSite] = useState([]);
    console.log(selectSite);

    // Keep track of the selected contest to render dynamic teams
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Handle input changes
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
        const event = predictionData.find((ev) => ev._id === eventId);
        setSelectedEvent(event);
        setFormData((prev) => ({
            ...prev,
            predictionId: eventId,
            predictionSide: '', // reset side when contest changes
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                selectTeam: formData.predictionSide, // ✅ API expects "selectTeam"
            };

            const result = await submitPrediction(payload).unwrap();
            console.log(result);
            if (result?.code === 200) {
                toast.success('Prediction submitted successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                e.target.reset();
                formData.predictionSide = '';
                formData.predictionId = '';
                formData.bitcointalkUsername = '';
                formData.bitcoinAddress = '';
                formData.casinoUsername = '';
                formData.email = '';
            }
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

    if (isLoading) return <p className="text-center py-10">Loading contests...</p>;

    return (
        <div className="contiainer lg:py-20 py-10 px-5 lg:px-0">
            <ToastContainer />
            <h2 className="text-sm text-gray-600 my-10 font-semibold">
                <span className="text-blue-600">Home</span> &gt; Submit Prediction
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-gray-50 rounded-2xl my-10">
                <h1 className="text-2xl font-bold mb-4">Submit Your Prediction</h1>
                <hr className="border-0 h-0.5 bg-gray-400" />

                {/* Event Selection */}
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
                            <option onChange={() => setSelectSite(event)} key={event._id} value={event._id}>
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
                    <label className="block mb-1 font-medium">Your Bitcoin Address:</label>
                    <input
                        type="text"
                        name="bitcoinAddress"
                        value={formData.bitcoinAddress}
                        onChange={handleChange}
                        placeholder="Enter your Bitcoin address"
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
                            placeholder="Enter your Email Address"
                            className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                        />
                    </div>
                </div>

                {/* Prediction Side (Dynamic from selected contest) */}
                {selectedEvent && (
                    <div>
                        <label className="block mb-1 font-medium">Choose your Prediction side:</label>
                        <div className="grid grid-cols-2 gap-5">
                            <label className="flex cursor-pointer hover:bg-blue-100 bg-white p-3 rounded-lg items-center gap-2">
                                <input
                                    type="radio"
                                    name="predictionSide"
                                    value={selectedEvent.firstTeamName}
                                    checked={formData.predictionSide === selectedEvent.firstTeamName}
                                    onChange={handleChange}
                                    required
                                />
                                {selectedEvent.firstTeamName}
                            </label>
                            <label className="flex cursor-pointer hover:bg-blue-100 bg-white p-3 rounded-lg items-center gap-2">
                                <input
                                    type="radio"
                                    name="predictionSide"
                                    value={selectedEvent.secondTeamName}
                                    checked={formData.predictionSide === selectedEvent.secondTeamName}
                                    onChange={handleChange}
                                />
                                {selectedEvent.secondTeamName}
                            </label>
                        </div>
                    </div>
                )}

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
