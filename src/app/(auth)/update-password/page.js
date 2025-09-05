'use client';
import { useResetPasswordMutation } from '@/redux/features/auth/login';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ✅ Get email param safely on client side
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const mail = params.get('email');
        if (mail) setEmail(mail);
    }, []);

    const togglePassword = () => setShowPassword(prev => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (!password || !confirmPassword) {
            toast.error('Both fields are required');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const res = await resetPassword({ email, password }).unwrap();
            if (res?.code === 200) {
                toast.success('Password reset successfully!');
                e.target.reset();
                window.location.href = '/login';
            } else {
                toast.error(res?.message || 'Failed to reset password');
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="bg-[url('/Images/Home/preduction-2.png')] w-full min-h-screen bg-cover bg-center flex items-center justify-center">
            <ToastContainer />
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md border-2 border-purple-700 p-6 rounded-lg bg-white shadow-md"
            >
                <h2 className="text-3xl font-semibold text-[#4c1d95] mb-2">
                    Reset Password
                </h2>
                <p className="mb-5 text-sm text-gray-600">
                    Please enter your new password and confirm it below
                </p>

                {/* New Password */}
                <div className="mb-4">
                    <label className="font-semibold block mb-1" htmlFor="password">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            placeholder="Enter your new password"
                            className="w-full p-2 border border-purple-700 rounded-md bg-white focus:outline-none"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500"
                        >
                            {showPassword ? '👁️' : '🙈'}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                    <label className="font-semibold block mb-1" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            placeholder="Re-enter your new password"
                            className="w-full p-2 border border-purple-700 rounded-md bg-white focus:outline-none"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            id="confirmPassword"
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPassword}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500"
                        >
                            {showConfirmPassword ? '👁️' : '🙈'}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-700 text-white font-semibold py-2 rounded-md hover:bg-purple-800 transition"
                >
                    {isLoading ? 'Updating...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;