'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon, Cog6ToothIcon, UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';
import SideNav from './sidenav';

export default function MobileLayout() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <div className="flex items-center justify-between w-full px-4 py-3 bg-white border-b border-gray-200">
                {/* Left side - Hamburger Menu */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                    {menuOpen ? (
                        <XMarkIcon className="size-6" />
                    ) : (
                        <Bars3Icon className="size-6" />
                    )}
                </button>

                {/* Right side - Settings and User Profile Icons */}
                <div className="flex items-center space-x-3">
                    <button
                        aria-label="Settings"
                        className="text-blue-500 transition-colors p-1"
                    >
                        <UserCircleIcon className="size-6" />
                    </button>
                    <button
                        aria-label="User Profile"
                        className="text-blue-500 transition-colors p-1"
                    >
                        <BellIcon className="size-6" />
                    </button>
                    <button
                        aria-label="User Profile"
                        className="text-blue-500 transition-colors p-1"
                    >
                        <Cog6ToothIcon className="size-6" />
                    </button>
                </div>
            </div>

            {/* Mobile sidebar overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile sidebar */}
            <div
                className={`fixed left-0 top-0 h-full w-64 bg-gray-100 z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <SideNav />
            </div>
        </>
    );
} 