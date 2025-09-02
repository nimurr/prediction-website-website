'use client';
import React from 'react';
import { useMyAllPredictionQuery } from '@/redux/features/auth/profile/getProfile';

const MyPredictions = () => {
    // Get user id from localStorage
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    // Fetch predictions from API
    const { data, isLoading } = useMyAllPredictionQuery(userId);

    if (isLoading) return <p className="text-center py-10">Loading predictions...</p>;

    // Extract predictions
    const scorePredictions = data?.data?.attributes?.scorePredictions || [];
    const pricePredictions = data?.data?.attributes?.predictions || [];
    const pokerPredictions = data?.data?.attributes?.pokerPrediction || [];

    // Combine all predictions into one array for display
    const allPredictions = [
        ...scorePredictions.map(p => ({
            title: `Score: ${p.selectTeam}`,
            side: p.predictionSide,
            date: new Date(p.createdAt).toLocaleDateString(),
            status: p.isWinner ? 'Winner' : p.status === 'submitted' ? 'Pending' : 'Lossed',
            icon: '/Images/Home/ball.png',
        })),
        ...pricePredictions.map(p => ({
            title: `Price Prediction`,
            side: `$${p.predictedPrice}`,
            date: new Date(p.createdAt).toLocaleDateString(),
            status: p.isWinner ? 'Winner' : 'Pending',
            icon: '/Images/Home/ball.png',
        })),
        ...pokerPredictions.map(p => ({
            title: `Poker Tournament`,
            side: p.pokernowUsername,
            date: new Date(p.createdAt).toLocaleDateString(),
            status: p.isWinner ? 'Winner' : 'Pending',
            icon: '/Images/Home/ball.png',
        })),
    ];

    const getStatusClass = status => {
        switch (status.toLowerCase()) {
            case 'winner':
                return 'text-green-600 font-semibold';
            case 'lossed':
                return 'text-red-500 font-semibold';
            case 'pending':
                return 'text-purple-600 font-semibold';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="px-4 md:px-0 contiainer py-10">
            {/* Breadcrumb */}
            <div className='flex mb-5 items-center justify-between'>
                <div className="text-sm mb-5 text-gray-500">
                    <span className="text-[#4c1d95] font-semibold cursor-pointer">Home</span>
                    <span className="mx-1">›</span>
                    <span>My Predictions</span>
                </div>
                {/* <div className="relative inline-block">
                    <select className="border border-gray-300 text-sm rounded-lg shadow px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c1d95] focus:border-[#4c1d95]">
                        <option value="score">Score Prediction</option>
                        <option value="price">Price Prediction</option>
                        <option value="poker">Poker Tournament</option>
                    </select>
                </div> */}
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                        <tr className="bg-[#e9ddfa] text-[#4c1d95] text-left text-sm rounded-t-xl">
                            <th className="py-3 px-4 rounded-tl-xl">Where I predicted</th>
                            <th className="py-3 px-4">My Predicted</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4 rounded-tr-xl">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPredictions.map((item, index) => (
                            <tr key={index} className="bg-white rounded-lg shadow-sm">
                                <td className="py-4 px-4 flex items-center gap-3">
                                    <img src={item.icon} alt="icon" className="w-8 h-8" />
                                    <span className="text-sm">{item.title}</span>
                                </td>
                                <td className="py-4 px-4 text-sm">{item.side}</td>
                                <td className="py-4 px-4 text-sm">{item.date}</td>
                                <td className="py-4 px-4 text-sm">
                                    <span className={getStatusClass(item.status)}>{item.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPredictions;