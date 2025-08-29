'use client';

import { useSidebar } from '@/app/context/SidebarContext';
import { FaBarsStaggered } from 'react-icons/fa6';

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex lg:hidden flex-col py-2 px-5">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={toggleSidebar}
          className="flex flex-col items-cente cursor-pointer lg:hidden"
        >
          <FaBarsStaggered size={25} />
        </button>
      </div>
    </div>
  );
}
