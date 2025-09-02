'use client';
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";



const Ads = () => {

    const [show, setShow] = useState(true);
    const handleHideAds = () => {
        setShow(false)
    }

    return (
        <div className='contiainer mx-auto py-10 px-4'>
            {
                show &&
                <div className="relative" >
                    <img className="w-full h-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY3jxPd2BLuFEKR08L51mMg_1aIRxJViP22w&s" />
                    <RxCross1 onClick={handleHideAds} className="absolute text-white cursor-pointer text-4xl top-5 right-5" />
                </div>
            }
        </div>
    );
};

export default Ads;