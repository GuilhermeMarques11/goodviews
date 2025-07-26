'use client';

import { pageTitles } from '@/utils/pageTitles';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa6';
import LogoutButton from '../LogoutButton';
import SearchForm from './SearchForm';

export default function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? '';
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="flex item-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center bg-white p-2 rounded-full box-shadow__card ">
          <CiMenuKebab size={30} />
        </div>
        <h1 className="text-2xl text-secondary">{title}</h1>
      </div>
      <div className="flex items-center gap-8">
        <SearchForm />
        <div className="relative">
          <FaUser
            size={20}
            className="cursor-pointer"
            onClick={() => setShowLogout(!showLogout)}
          />
          {showLogout && (
            <div className="absolute top-10 right-[-20px] bg-white py-2 px-12">
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
