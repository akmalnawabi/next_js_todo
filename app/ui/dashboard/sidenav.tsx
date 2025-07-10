import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import OwnTagsLinks from '@/app/ui/dashboard/ownTagsLinks';
import { SwatchIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-100">
      <Link
        className="mb-2 flex items-end justify-start rounded-md p-4"
        href="/"
      >
        <div className="flex gap-2 font-semibold w-32 md:w-40">
          <SwatchIcon width={24} style={{color:'dodgerblue'}} />
          Task Manager
        </div>
      </Link>

      {/* input  */}

      <div className='relative mb-2'>
        <input type="text" className='rounded-md h-9 border-gray-300' placeholder='Search' />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-2 text-gray-500 size-5 absolute top-0 right-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>

      <div className="flex flex-col justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div>
          <p className='text-sm text-gray-500 font-semibold my-4 ml-1'>Favorites</p>
          <NavLinks />
          <hr className='my-6' />
          <p className='text-sm text-gray-500 font-semibold my-4 ml-1'>Your Own Tags</p>
          <OwnTagsLinks />
        </div>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
