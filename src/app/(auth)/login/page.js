'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminLoginMutation } from '@/redux/features/auth/login';
import { ToastContainer, toast } from 'react-toastify';

const Page = () => {

  const [login, { isLoading }] = useAdminLoginMutation();

  // navigation



  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await login({ email, password });
      localStorage.setItem('user', JSON.stringify(res?.data?.data?.attributes?.user));
      localStorage.setItem('token', JSON.stringify(res?.data?.data?.attributes?.tokens?.access?.token));

      if (res?.data?.code == 200) {
        toast.success('Login successful', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        window.location.href = '/';
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
        })
      }
    } catch (error) {
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

    }



  };


  return (
    <div
      className="bg-[url('/Images/Home/preduction-2.png')] w-full h-cull min-h-screen bg-cover bg-center flex items-center justify-center"
    >
      <ToastContainer />
      <form onSubmit={handleLogin} className='w-full max-w-md border-2 border-purple-700 p-6 rounded-lg bg-white shadow-md'>
        <h2 className='text-3xl font-semibold text-[#4c1d95] mb-2'>Login</h2>
        <p className='mb-5 text-sm text-gray-600'>
          Please enter your email and password to continue
        </p>

        {/* Email */}
        <div className='mb-4'>
          <label htmlFor='email' className='font-semibold block mb-1'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            className='w-full p-2 border border-purple-700 rounded-md bg-white focus:outline-none'
          />
        </div>

        {/* Password */}
        <div className='mb-4'>
          <label htmlFor='password' className='font-semibold block mb-1'>
            Password
          </label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              placeholder='Enter your password'
              className='w-full p-2 border border-purple-700 rounded-md bg-white focus:outline-none'
            />
            <button
              type='button'
              onClick={togglePassword}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500'
            >
              {showPassword ? '👁️' : '🙈'}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className='flex justify-between items-center text-sm mb-5'>
          <label className='flex items-center'>
            <input type='checkbox' className='mr-2' />
            Remember me
          </label>
          <Link href='/forgot-password' className='text-blue-600'>
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button className='w-full cursor-pointer bg-purple-700 text-white font-semibold py-2 rounded-md hover:bg-purple-800 transition'>
          Login
        </button>

        {/* Sign up */}
        <p className='text-center text-sm mt-5 text-gray-600'>
          Don't have an account?{' '}
          <Link href='/signup' className='text-blue-600'>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Page;
