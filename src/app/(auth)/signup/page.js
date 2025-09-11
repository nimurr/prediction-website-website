'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRegisterMutation } from '@/redux/features/auth/login';
import { ToastContainer, toast } from 'react-toastify';


const Page = () => {
    const [register] = useRegisterMutation();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword = () => setShowPassword(prev => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Add static role
        data.role = "user";


        try {
            const res = await register(data);
            if (res?.data?.code == 201) {
                toast.success("Signup successful!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                window.location.href = '/verify-otp?email=' + data.email;
            }
            else {
                toast.error(res?.error?.data?.message, {
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

            // Handle success, redirect, toast, etc.
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("An error occurred during signup.", {
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
        <div className="bg-[url('/Images/Home/preduction-2.png')] w-full min-h-screen lg:h-[110vh] bg-cover bg-center flex items-center justify-center">
            <ToastContainer />
            <form onSubmit={handleSignup} className='w-full max-w-md border-2 border-purple-700 p-6 rounded-lg bg-white shadow-md'>
                <h2 className='text-3xl font-semibold text-[#4c1d95] mb-2'>Sign Up</h2>
                <p className='mb-5 text-sm text-gray-600'>Please fill in your details to create an account</p>

                {/* Full Name */}
                <div className='mb-4'>
                    <label className='font-semibold block mb-1' htmlFor="fullName">Full Name</label>
                    <input
                        placeholder='Enter your name'
                        className='w-full p-2 border border-purple-700 rounded-md bg-white focus:outline-none'
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                    />
                </div>

                {/* Email */}
                <div className='mb-4'>
                    <label className='font-semibold block mb-1' htmlFor="email">Email</label>
                    <input
                        placeholder='Enter your email'
                        className='w-full p-2 border border-purple-700 rounded-md bg-white focus:outline-none'
                        type="email"
                        name="email"
                        id="email"
                        required
                    />
                </div>

                {/* Password */}
                <div className='mb-4'>
                    <label className='font-semibold block mb-1' htmlFor="password">Password</label>
                    <div className='relative'>
                        <input
                            placeholder='Enter your password'
                            className='w-full p-2 border border-purple-700 rounded-md bg-white focus:outline-none'
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500'
                        >
                            {showPassword ? '👁️' : '🙈'}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className='mb-4'>
                    <label className='font-semibold block mb-1' htmlFor="confirmPassword">Confirm Password</label>
                    <div className='relative'>
                        <input
                            placeholder='Re-enter your password'
                            className='w-full p-2 border border-purple-700 rounded-md bg-white focus:outline-none'
                            type={showConfirmPassword ? "text" : "password"}
                            // name="confirmPassword"
                            id="confirmPassword"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPassword}
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500'
                        >
                            {showConfirmPassword ? '👁️' : '🙈'}
                        </button>
                    </div>
                </div>

                {/* Terms */}
                <div className='flex items-center text-sm text-gray-600 mb-5'>
                    <input type='checkbox' className='mr-2' id='terms' required />
                    <label htmlFor='terms'>I agree to all terms & conditions</label>
                </div>

                {/* Submit */}
                <button className='w-full cursor-pointer bg-purple-700 text-white font-semibold py-2 rounded-md hover:bg-purple-800 transition'>
                    Sign Up
                </button>

                {/* Footer */}
                <p className='text-center text-sm mt-5 cursor-pointer text-gray-600'>
                    Already have an account?{' '}
                    <Link href='/login' className='text-blue-600'>Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Page;
