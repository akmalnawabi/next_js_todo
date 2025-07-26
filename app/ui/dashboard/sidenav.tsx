'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import OwnTagsLinks from '@/app/ui/dashboard/ownTagsLinks';
import { SwatchIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-100">

      <div className="hidden md:flex flex-col gap-2 mt-2">
        <Link
          className="flex items-center gap-2 font-semibold w-fit mb-0 sm:mb-6"
          href="/"
        >
          <SwatchIcon width={24} style={{ color: 'dodgerblue', marginLeft: '5px' }} />
          <span className="">Task Manager</span>
        </Link>

        <div className="relative w-full max-w-xs">
          <input
            type="text"
            className="w-full rounded-md h-9 pl-3 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      <div className="md:hidden mb-4">
        <Link
          className="flex items-center gap-2 font-semibold w-fit"
          href="/"
        >
          <SwatchIcon width={24} style={{ color: 'dodgerblue', marginLeft: '5px' }} />
          <span className="">Task Manager</span>
        </Link>
      </div>

      {/* Navigation Section */}
      <div className="flex-col space-y-2">
        <div>
          <p className="text-sm text-gray-500 font-semibold my-4 ml-1">Favorites</p>
          <NavLinks />
          <hr className="my-6" />
          <p className="text-sm text-gray-500 font-semibold my-4 ml-1">Your Own Tags</p>
          <OwnTagsLinks />
        </div>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block" />
      </div>
    </div>
  );
}
