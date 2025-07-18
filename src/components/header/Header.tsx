'use client';

import { pageTitles } from '@/utils/pageTitles';
import { usePathname } from 'next/navigation';
import { CiMenuKebab } from 'react-icons/ci';
import { FaMagnifyingGlass, FaUser } from 'react-icons/fa6';

export default function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? '';
  return (
    <div className="flex item-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center bg-white p-2 rounded-full box-shadow__card ">
          <CiMenuKebab size={30} />
        </div>
        <h1 className="text-2xl text-secondary">{title}</h1>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center">
          <input
            className="border-b-1 border-gray-300 focus:outline-none focus:border-blue-500 p-2 rounded-md"
            type="search"
            name=""
            id=""
            placeholder="Pesquisar..."
          />
          <button className="flex flex-col items-center bg-white p-2 rounded-full box-shadow__card ">
            <FaMagnifyingGlass size={15} />
          </button>
        </div>
        <FaUser size={20} />
      </div>
    </div>
  );
}
