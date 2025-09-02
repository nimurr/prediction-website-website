'use client';
import React from 'react';

const predictions = [
    {
        icon: '/Images/Home/ball.png',
        title: 'real VS barsa ',
        win: 'real',
        date: 'Jul 10, 2025',
        amount: '0.0012 BTC',
        status: 'Winner',
    },
    {
        icon: '/Images/Home/btc.png',
        title: 'BTC',
        win: '$ 2,586',
        date: 'Jul 10, 2025',
        amount: '0.0012 BTC',
        status: 'Winner',
    },
    {
        icon: '/Images/Home/ball.png',
        title: 'bd vs pk',
        win: 'pk',
        date: 'Jul 10, 2025',
        amount: '0.0012 BTC',
        status: 'Winner',
    },
    {
        icon: '/Images/Home/btc.png',
        title: 'BTC',
        win: '$ 82,586',
        date: 'Jul 10, 2025',
        amount: '0.0012 BTC',
        status: 'Winner',
    },
];

const getStatusClass = (status) => {
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

const Page = () => {
    return (
        <div className="px-4 md:px-0 contiainer py-10">
            {/* Breadcrumb */}
            <div className="mb-5 text-sm text-gray-500">
                <span className="text-[#4c1d95] font-semibold cursor-pointer">Home</span>
                <span className="mx-1">›</span>
                <span>Bonus</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                        <tr className="bg-[#e9ddfa] text-[#4c1d95] text-left text-sm">
                            <th className="py-3 px-4 rounded-tl-xl">Where I predicted</th>
                            <th className="py-3 px-4">My Predicted</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Win Amount</th>
                            <th className="py-3 px-4 rounded-tr-xl">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions.map((item, index) => (
                            <tr key={index} className="bg-white shadow-sm">
                                <td className="py-4 px-4 flex items-center gap-3">
                                    <img src={item.icon} alt="icon" className="w-8 h-8" />
                                    <span className="text-sm capitalize">{item.title}</span>
                                </td>
                                <td className="py-4 capitalize px-4 text-sm">{item.win}</td>
                                <td className="py-4 px-4 text-sm">{item.date}</td>
                                <td className="py-4 px-4 text-sm">{item.amount}</td>
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

export default Page;