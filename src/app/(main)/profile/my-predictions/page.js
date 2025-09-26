'use client';
import React, { useEffect, useState } from 'react';
import { useMyAllPredictionQuery } from '@/redux/features/auth/profile/getProfile';
import url from '@/redux/api/baseUrl';

const MyPredictions = () => {
  const [userId, setUserId] = useState(null);

  // ✅ localStorage safe access
  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const parsed = JSON.parse(user);
        setUserId(parsed?.id || null);
      }
    } catch (err) {
      console.error('Failed to parse user:', err);
    }
  }, []);

  // fetch predictions only if userId is available
  const { data, isLoading } = useMyAllPredictionQuery(userId, {
    skip: !userId, // ✅ prevent query without userId
  });

  if (!userId) {
    return <p className="text-center py-10">No user found. Please log in.</p>;
  }

  if (isLoading) {
    return <p className="text-center py-10">Loading predictions...</p>;
  }

  // Extract predictions
  const scorePredictions = data?.data?.attributes?.scorePredictions || [];
  const pricePredictions = data?.data?.attributes?.predictions || [];
  const pokerPredictions = data?.data?.attributes?.pokerPrediction || [];

  // Merge all predictions
  const allPredictions = [
    ...scorePredictions.map(p => ({
      title: `Score: ${p.selectTeam}`,
      side: p.predictionSide,
      date: new Date(p.createdAt).toLocaleDateString(),
      status: p.isWinner
        ? 'Winner'
        : p.status === 'submitted'
        ? 'Pending'
        : 'Lossed',
      icon: p.predictionId?.sportImage && url + p.predictionId.sportImage,
    })),
    ...pricePredictions.map(p => ({
      title: `Price Prediction`,
      side: `$${p.predictedPrice}`,
      date: new Date(p.createdAt).toLocaleDateString(),
      status: p.isWinner ? 'Winner' : 'Pending',
      icon:
        p.pricePredictionId?.bitcoinImage &&
        url + p.pricePredictionId.bitcoinImage,
    })),
    ...pokerPredictions.map(p => ({
      title: `Poker Tournament`,
      side: p.pokernowUsername,
      date: new Date(p.createdAt).toLocaleDateString(),
      status: p.isWinner ? 'Winner' : 'Pending',
      icon:
        p?.pokertournamentId?.uploadPokerTournamentImage &&
        url + p.pokertournamentId.uploadPokerTournamentImage,
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
      <div className="flex mb-5 items-center justify-between">
        <div className="text-sm mb-5 text-gray-500">
          <span className="text-[#4c1d95] font-semibold cursor-pointer">Home</span>
          <span className="mx-1">›</span>
          <span>My Predictions</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-[#e9ddfa] text-[#4c1d95] text-left text-sm rounded-t-xl">
              <th className="py-3 px-4 rounded-tl-xl">Contest</th>
              <th className="py-3 px-4">My Prediction</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 rounded-tr-xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {allPredictions?.map((item, index) => (
              <tr key={index} className="bg-white rounded-lg shadow-sm">
                <td className="py-4 px-4 flex items-center gap-3">
                  <img src={item?.icon} alt="icon" className="w-8 h-8" />
                  <span className="text-sm">{item.title}</span>
                </td>
                <td className="py-4 px-4 text-sm">{item.side}</td>
                <td className="py-4 px-4 text-sm">{item.date}</td>
                <td className="py-4 px-4 text-sm">
                  <span className={getStatusClass(item.status)}>
                    {item.status}
                  </span>
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