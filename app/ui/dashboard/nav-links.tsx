'use client'

import {
  UserCircleIcon,
  ChatBubbleOvalLeftIcon,
  PlusCircleIcon,
  Battery50Icon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useCategoryCounts } from '@/app/hooks/useCategoryCounts';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'My Day', href: '/components/tasks/my-day', icon: Battery50Icon },
  {
    name: 'Important',
    href: '/components/tasks/important',
    icon: StarIcon,
  },
  { name: 'Personal', href: '/components/tasks/personal', icon: UserIcon },
  { name: 'All', href: '/components/tasks/all', icon: UserCircleIcon },
  { name: 'Completed', href: '/components/tasks/completed', icon: PlusCircleIcon },
  { name: 'Assigned to me', href: '/components/tasks/assigned', icon: ChatBubbleOvalLeftIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { getCountForCategory, loading } = useCategoryCounts();

  return (
    <>
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
