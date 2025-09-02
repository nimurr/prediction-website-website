'use client';
import { useForgotPassMutation } from '@/redux/features/auth/login';
import Link from 'next/link';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordPage = () => {
    const [forgotPassword, { isLoading }] = useForgotPassMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        if (!email) {
            toast.error("Please enter your email", { position: "top-right" });
            return;
        }

        try {
            const res = await forgotPassword({ email }).unwrap(); // pass email as object
            console.log(res);

            if (res?.code == 200) {
                toast.success("OTP sent successfully! Check your email.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                window.location.href = '/verify-otp?email=' + email + "&type=forgot";
                // Optionally redirect to OTP page
            } else {
                toast.error(res?.error?.message || "Failed to send OTP", {
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
            console.error(error);
            toast.error(error?.data?.message || "Something went wrong", {
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
    };

    return (
        <div className="bg-[url('/Images/Home/preduction-2.png')] w-full min-h-screen bg-cover bg-center flex items-center justify-center">
            <ToastContainer />
            <div className='w-full max-w-md border-2 border-purple-700 p-6 rounded-lg bg-white shadow-md'>
                <h2 className='text-3xl font-semibold text-[#4c1d95] mb-2'>Forgot Password?</h2>
                <p className='mb-5 text-sm text-gray-600'>
                    Please enter your email address to reset your password.
                </p>

                {/* Email Input */}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='font-semibold block mb-1' htmlFor="email">Email</label>
                        <input
                            placeholder='Enter your email'
                            className='w-full p-2 border border-purple-700 rounded-md bg-white focus:outline-none'
                            type="email"
                            name="email"
                            id="email"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className='w-full bg-purple-700 text-white font-semibold py-2 rounded-md hover:bg-purple-800 transition'
                    >
                        {isLoading ? "Sending..." : "Send OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
