'use client';
import React, { useEffect, useState } from 'react';
import { useMyAllPredictionQuery } from '@/redux/features/auth/profile/getProfile';
import url from '@/redux/api/baseUrl';

const MyPredictions = () => {
  const [userId, setUserId] = useState(null);
  const [filterType, setFilterType] = useState("score_prediction"); // ✅ default is score

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

  const { data, isLoading } = useMyAllPredictionQuery(userId, {
    skip: !userId,
  });

  if (!userId) {
    return <p className="text-center py-10">No user found. Please log in.</p>;
  }

  if (isLoading) {
    return <p className="text-center py-10">Loading predictions...</p>;
  }

  const scorePredictions = data?.data?.attributes?.scorePredictions || [];
  const pricePredictions = data?.data?.attributes?.predictions || [];
  const pokerPredictions = data?.data?.attributes?.pokerPrediction || [];

  console.log(pokerPredictions);

  const allPredictions = [
    ...scorePredictions.map(p => ({
      type: "score_prediction",
      title: ` ${p.predictionId?.firstTeamName + " vs " + p.predictionId?.secondTeamName}`,
      side: p.totalYellowCard,
      date: new Date(p.createdAt).toLocaleDateString(),
      status: p.isWinner
        ? 'Winner'
        : p.status === 'submitted'
          ? 'Pending'
          : 'Lossed',
      icon: p.predictionId?.sportImage && url + p.predictionId.sportImage,
    })),
    ...pricePredictions.map(p => ({
      type: "price_prediction",
      title: `Price Prediction`,
      side: `$${p.predictedPrice}`,
      date: new Date(p.createdAt).toLocaleDateString(),
      status: p.isWinner ? 'Winner' : 'Pending',
      icon:
        p.pricePredictionId?.bitcoinImage &&
        url + p.pricePredictionId.bitcoinImage,
    })),
    ...pokerPredictions.map(p => ({
      type: "poker_prediction",
      title: `Poker Tournament`,
      side: p.screenshotLink,
      date: new Date(p.createdAt).toLocaleDateString(),
      status: p.isWinner ? 'Winner' : 'Pending',
      icon:
        p?.pokertournamentId?.uploadPokerTournamentImage &&
        url + p.pokertournamentId.uploadPokerTournamentImage,
    })),
  ];

  const filteredPredictions = allPredictions.filter(
    p => p.type === filterType
  );

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
    <div className="px-4 xl:px-0 contiainer py-10">
      <div className="flex mb-5 items-center justify-between">
        <div className="text-sm mb-5 text-gray-500">
          <span className="text-[#4c1d95] font-semibold cursor-pointer">Home</span>
          <span className="mx-1">›</span>
          <span>My Predictions</span>
        </div>
        <div>
          <select
            className="border p-2 border-gray-200"
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option value="score_prediction">Score Prediction</option>
            <option value="price_prediction">Price Prediction</option>
            <option value="poker_prediction">Poker Tournament</option>
          </select>
        </div>
      </div>

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
            {filteredPredictions.length > 0 ? (
              filteredPredictions.map((item, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  No {filterType.replace('_', ' ')} found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPredictions;