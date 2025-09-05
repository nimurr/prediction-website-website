'use client';

import { useGetAllPokerPredictionQuery, useSubmitePokerPredictionMutation } from '@/redux/features/auth/pokerPrediction/pokerPrediction';
import { useGetProfileQuery } from '@/redux/features/auth/profile/getProfile';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Page = () => {
    const { data: userData } = useGetProfileQuery();
    const profile = userData?.data?.attributes?.user;

    const { data: pokerTournaments, isLoading } = useGetAllPokerPredictionQuery();
    const [submitPoker, { isLoading: submitting }] = useSubmitePokerPredictionMutation();

    const [formData, setFormData] = useState({
        userId: '',
        pokertournamentId: '',
        bitcoinAddress: '',
        pokernowUsername: '',
        bitcointalkUsername: '',
        casinoUsername: '',
        email: '',
        screenshotLink: ''
    });

    // Prefill user data from profile once it loads
    useEffect(() => {
        if (profile) {
            setFormData((prev) => ({
                ...prev,
                userId: profile.id,
                bitcoinAddress: profile.bitcoinAddress || '',
                bitcointalkUsername: profile.bitcointalkUsername || '',
                casinoUsername: profile.casinoUsername || '',
                email: profile.email || ''
            }));
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.userId) {
            toast.error('User not loaded yet. Please wait.');
            return;
        }

        try {
            console.log('Submitting payload:', formData);
            const res = await submitPoker(formData).unwrap();
            console.log(res);
            toast.success('Poker prediction submitted successfully!');

            e.target.reset();
            setFormData((prev) => ({
                ...prev,
                pokertournamentId: '',
                pokernowUsername: '',
                screenshotLink: ''
            }));
        } catch (err) {
            console.error(err);
            toast.error('Failed to submit prediction');
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading tournaments...</p>;

    return (
        <div className="contiainer py-10 px-5 lg:px-0">
            <ToastContainer />
            <h2 className="text-sm text-gray-600 my-10 font-semibold">
                <span className="text-blue-600">Home</span> &gt; Join Poker Tournament
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-gray-50 rounded-2xl my-10">
                <h1 className="text-2xl font-bold mb-4">Join Poker Tournament</h1>
                <hr className="border-0 h-0.5 bg-gray-400" />

                {/* Tournament Selection */}
                <div>
                    <label className="block mb-1 font-medium">Select Poker Tournament:</label>
                    <select
                        name="pokertournamentId"
                        value={formData.pokertournamentId}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] outline-none"
                        required
                    >
                        <option value="">--Choose Tournament--</option>
                        {pokerTournaments?.data?.map((tournament) => (
                            <option key={tournament._id} value={tournament._id}>
                                {tournament.pokerTournamentTitle}
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
                        value={formData.bitcoinAddress}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200"
                        required
                    />
                </div>

                {/* PokerNow Username */}
                <div>
                    <label className="block mb-1 font-medium">PokerNow Username:</label>
                    <input
                        type="text"
                        name="pokernowUsername"
                        value={formData.pokernowUsername}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200"
                        required
                    />
                </div>

                {/* Bitcointalk Username */}
                <div>
                    <label className="block mb-1 font-medium">Bitcointalk Username:</label>
                    <input
                        type="text"
                        name="bitcointalkUsername"
                        value={formData.bitcointalkUsername}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200"
                        required
                    />
                </div>

                {/* Casino Username + Email */}
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <label className="block mb-1 font-medium">Casino Username:</label>
                        <input
                            type="text"
                            name="casinoUsername"
                            value={formData.casinoUsername}
                            onChange={handleChange}
                            className="w-full border p-3 rounded border-gray-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email (optional):</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-3 rounded border-gray-200"
                        />
                    </div>
                </div>

                {/* Screenshot Link */}
                <div>
                    <label className="block mb-1 font-medium">Screenshot Link:</label>
                    <input
                        type="url"
                        name="screenshotLink"
                        value={formData.screenshotLink}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className={`px-6 py-3 rounded-full font-semibold text-white transition duration-200 ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-tl from-[#4c1d95] to-[#a878f1]'
                        }`}
                >
                    {submitting ? 'Submitting...' : 'Submit Prediction'}
                </button>
            </form>
        </div>
    );
};

export default Page;