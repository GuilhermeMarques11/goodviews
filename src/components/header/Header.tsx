'use client';

import { useSidebar } from '@/app/context/SidebarContext';
// import { usePathname } from 'next/navigation';
import { FaBarsStaggered } from 'react-icons/fa6';

export default function Header() {
  // const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex flex-col py-8 px-5">
      <div className="flex items-center justify-between gap-4">
        {/* <h1 className="text-base">{pathname}</h1> */}
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
