'use client';

import React from 'react';
import {
    FaFacebookF,
    FaXTwitter,
    FaLinkedinIn,
    FaInstagram,
} from 'react-icons/fa6';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-[#1e1e1e] text-white py-6">
            <div className="contiainer mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <img src="/Images/Auth/footer-logo.png" alt="logo" className="max-w-32" />
                </div>

                {/* Divider - Only visible on md+ screens */}
                <div className="hidden md:block h-6 w-[1px] bg-gray-500" />

                {/* Center: Copyright */}
                <div className="text-sm text-center text-gray-300">
                    © 2025 SportIQ.com | Managed by <span className="font-medium">Little Mouse</span>
                </div>

                {/* Divider - Only visible on md+ screens */}
                <div className="hidden md:block h-6 w-[1px] bg-gray-500" />

                {/* Right: Social Icons */}
                <div className="flex gap-5 text-[#d2cbe8] text-lg">
                    <Link href="https://facebook.com" target="_blank" title='Facebook' aria-label="Facebook">
                        <FaFacebookF className="hover:text-white transition text-2xl" />
                    </Link>
                    <Link href="https://twitter.com" target="_blank" title='Twitter' aria-label="X / Twitter">
                        <FaXTwitter className="hover:text-white transition text-2xl" />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" title='Linkedin' aria-label="LinkedIn">
                        <FaLinkedinIn className="hover:text-white transition text-2xl" />
                    </Link>
                    <Link href="https://instagram.com" target="_blank" title='Instagram' aria-label="Instagram">
                        <FaInstagram className="hover:text-white transition text-2xl" />
                    </Link>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
