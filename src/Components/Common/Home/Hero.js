import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <div className="contiainer mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
                {/*   Other Crypto */}
                <h2 className="text-3xl md:text-6xl font-semibold">
                    Predict to Win <span className="text-[#4c1d95] font-bold">Free Bitcoin</span> and <span className="text-[#4c1d95] font-bold">Other Crypto</span>
                </h2>
                <p className="my-5 text-gray-700 md:text-xl text-base ">
                   Show off your prediction skills in weekly contests covering Soccer, Bitcoin Price, NFL, and more. Get accurate, climb the leaderboard, and earn free Bitcoin and other crypto rewards — 100% free to join!
                </p>
                <Link href={'/submit-prediction'} className="bg-[#4c1d95] hover:bg-[#3b117c] transition-colors text-white py-3 px-8 rounded-full cursor-pointer  duration-500 hover:shadow-2xl shadow-purple-500/50">
                    Submit Your Prediction
                </Link>
            </div>

            <div className="bg-[url('/Images/Home/Pattern.png')] bg-cover bg-no-repeat bg-center w-full min-h-96 h-full mt-10 flex items-center justify-center">
                {/* Add an image inside if needed */}
                <img src="/Images/Home/hero-group.png" alt="Visual" />
            </div>
        </div>
    );
};

export default Hero;
