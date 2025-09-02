'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import OTPInput from 'react-otp-input';
import { useVerifyOtpMutation } from '@/redux/features/auth/login';
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

const OTPVerificationPage = () => {
    const [verifyOtp] = useVerifyOtpMutation();
    const searchParams = useSearchParams();
    const email = searchParams.get('email'); // <-- correctly get email
    const type = searchParams.get('type');

    console.log('Email from URL:', email);

    const [otp, setOtp] = useState('');

    const handleVerifyOtp = async () => {
        if (!email) {
            toast.error("Email not found in URL", { position: "top-right" });
            return;
        }

        try {
            const response = await verifyOtp({
                email,
                code: otp
            });

            console.log(response);

            if (response?.data?.code === 200) {
                toast.success("OTP verified successfully!", { position: "top-right" });
                if (type === 'forgot') {
                    window.location.href = '/update-password?email=' + email;
                }
                else {
                    window.location.href = '/login';
                }
                // Redirect or navigate to login/dashboard page if needed
            } else {
                toast.error(response?.error?.data?.message || "OTP verification failed", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error("Something went wrong!", { position: "top-right" });
        }
    };

    return (
        <div className="bg-[url('/Images/Home/preduction-2.png')] w-full min-h-screen bg-cover bg-center flex items-center justify-center">
            <ToastContainer />
            <div className='w-full max-w-md border-2 border-purple-700 p-6 rounded-lg bg-white shadow-md'>
                <h2 className='text-3xl font-semibold text-[#4c1d95] mb-2'>Verify OTP</h2>
                <p className='mb-5 text-sm text-gray-600'>Please enter the 6-digit OTP sent to your email: <strong>{email}</strong></p>

                {/* OTP Input */}
                <div className='mb-6'>
                    <label className='font-semibold block mb-2'>Enter OTP</label>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        containerStyle={{ justifyContent: 'space-between' }}
                        renderInput={(props) => (
                            <input
                                {...props}
                                className="!border bg-gray-200 border-purple-700 rounded-md px-2 py-1 focus:outline-none"
                                style={{ width: '50px', height: '50px', textAlign: 'center' }}
                            />
                        )}
                    />
                </div>

                {/* Verify Button */}
                <button onClick={handleVerifyOtp} className='w-full bg-purple-700 text-white font-semibold py-2 rounded-md hover:bg-purple-800 transition'>
                    Verify
                </button>
            </div>
        </div>
    );
};

export default OTPVerificationPage;
