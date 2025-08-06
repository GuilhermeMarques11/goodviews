'use client';

import { pageTitles } from '@/utils/pageTitles';
import { usePathname } from 'next/navigation';
import { CiMenuKebab } from 'react-icons/ci';
import SearchForm from './SearchForm';

export default function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? '';

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center bg-white p-2 rounded-full box-shadow__card">
          <CiMenuKebab size={30} />
        </div>
        <h1 className="text-2xl text-secondary">{title}</h1>
      </div>
      <div className="flex items-center gap-8">
        <SearchForm />
      </div>
    </div>
  );
}
