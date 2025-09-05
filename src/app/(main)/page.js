
import Ads from '@/Components/Common/Home/Ads';
import Bonuses from '@/Components/Common/Home/Bonuses';
import Hero from '@/Components/Common/Home/Hero';
import Poker from '@/Components/Common/Home/Poker';
import Predictions from '@/Components/Common/Home/Predictions';
import PricePrediction from '@/Components/Common/Home/PricePrediction';
import React from 'react';

const Page = () => {
    return (
        <div>
            <Hero />
            <Predictions />
            <PricePrediction />
            {/* <Ads /> */}
            <Poker />
            <Bonuses />
        </div>
    );
}

export default Page;
