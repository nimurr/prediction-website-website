'use client';

import React, { useState } from 'react';

const Page = () => {
    const [formData, setFormData] = useState({
        event: '',
        bitcointalkUsername: '',
        bitcoinAddress: '',
        casinoUsername: '',
        email: '',
        predictionSide: '',
        predictionDetails: '',
        pokernowusername: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // You can integrate API call here
    };

    return (
        <div className="contiainer ">
            <h2 className="text-sm text-gray-600 my-10 font-semibold"><span className='text-blue-600'>Home</span> &gt; Submit Prediction</h2>

            <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-gray-50 rounded-2xl my-10">
                <h1 className="text-2xl font-bold mb-4">Join poker tornament </h1>
                <hr className=' border-0 h-0.5 bg-gray-400' />
                {/* Event Selection */}
                <div>
                    <label className="block mb-1 font-medium">Select poker tornament :</label>
                    <select
                        name="event"
                        value={formData.event}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] ring-[#4c1d95] outline-[#4c1d95]"
                        required
                    >
                        <option value="">--Choose An Event--</option>
                        <option value="Real Madrid vs Barcelona">Real Madrid vs Barcelona</option>
                    </select>
                </div>

                {/* Bitcointalk Username */}
                <div>
                    <label className="block mb-1 font-medium">Your Bitcoin Address :</label>
                    <input
                        type="text"
                        name="bitcointalkUsername"
                        placeholder="Enter your Bitcoin Address "
                        value={formData.bitcoinAddress}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] ring-[#4c1d95] outline-[#4c1d95]"
                        required
                    />
                </div>

                {/* Bitcoin Address */}
                <div>
                    <label className="block mb-1 font-medium">Pokernow username :</label>
                    <input
                        type="text"
                        name="bitcoinAddress"
                        placeholder="Enter your Pokernow username "
                        value={formData.pokernowusername}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] ring-[#4c1d95] outline-[#4c1d95]"
                        required
                    />
                </div>

                {/* Bitcoin Address */}
                <div>
                    <label className="block mb-1 font-medium">Bitcointalk Username :</label>
                    <input
                        type="text"
                        name="bitcoinAddress"
                        placeholder="Enter your Bitcointalk Username :"
                        value={formData.bitcointalkUsername}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] ring-[#4c1d95] outline-[#4c1d95]"
                        required
                    />
                </div>

                <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>

                    {/* Casino Username */}
                    <div>
                        <label className="block mb-1 font-medium">Casino Username:</label>
                        <input
                            type="text"
                            name="casinoUsername"
                            placeholder="Enter your Casino Username"
                            value={formData.casinoUsername}
                            onChange={handleChange}
                            className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] ring-[#4c1d95] outline-[#4c1d95]"
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
                            className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] ring-[#4c1d95] outline-[#4c1d95]"
                        />
                    </div>

                </div>


                {/* Prediction Details */}
                <div>
                    <label className="block mb-1 font-medium">Link to screenshot : </label>
                    <input
                        name="predictionDetails"
                        placeholder="Enter your Link to screenshot"
                        value={formData.predictionDetails}
                        onChange={handleChange}
                        className="w-full border p-3 rounded border-gray-200 focus:border-[#4c1d95] ring-[#4c1d95] outline-[#4c1d95]"
                        rows={4}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-gradient-to-tl from-[#4c1d95] to-[#a878f1] text-white px-6 py-3 rounded-full hover:bg-[#4d1d95dc] cursor-pointer"
                >
                    Submit Prediction
                </button>
            </form>
        </div>
    );
};

export default Page;
