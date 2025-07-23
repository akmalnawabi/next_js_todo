'use client'

import {
    UserGroupIcon,
    HomeIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useCategoryCounts } from '@/app/hooks/useCategoryCounts';

const links = [
    { name: 'GoPay', href: '/components/tasks', icon: HomeIcon },
    { name: 'Kytro Studio', href: '/components/tasks', icon: UserGroupIcon },
    { name: 'Content Dump', href: '/components/tasks', icon: StarIcon },
];

export default function OwnTagsLinks() {
    const pathname = usePathname();
    const { getCountForCategory, loading } = useCategoryCounts();

    const totalCount = links.reduce((sum, link) => {
        return sum + getCountForCategory(link.name);
    }, 0);

    return (
        <>
            {/* Total count display */}
            {!loading && totalCount > 0 && (
                <div className="flex items-center justify-between mb-2 px-2 py-1">
                    <span className="text-xs text-gray-500 font-medium">Total</span>
                    <span className="bg-blue-100 text-blue-600 text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-semibold">
                        {totalCount}
                    </span>
                </div>
            )}
            {links.map((link) => {
                const LinkIcon = link.icon;
                const count = getCountForCategory(link.name);

                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[32px] grow items-center justify-between rounded-md bg-gray-50 p-1 text-sm hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            },
                        )}>
                        <div className="flex items-center gap-2">
                            <LinkIcon className="w-5 text-blue-400" />
                            <p className="hidden md:block">{link.name}</p>
                        </div>
                        {!loading && count > 0 && (
                            <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                {count}
                            </span>
                        )}
                    </Link>
                );
            })}
        </>
    );
}
