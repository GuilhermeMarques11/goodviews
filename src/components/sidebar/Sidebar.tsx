'use client';

import styles from './Sidebar.module.css';
import Menu from './menu/Menu';
import UserMenu from './_components/UserMenu';
import Logo from './_components/Logo';
import { useSidebar } from '@/app/context/SidebarContext';

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <div
      className={`${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } fixed z-100 w-full bg-[#00000080] lg:opacity-100 lg:visible lg:static lg:w-auto lg:bg-transparent`}
      onClick={closeSidebar}
    >
      <aside
        className={`${
          styles.sidebar
        } h-screen bg-cover bg-center relative py-11 px-4 lg:flex lg:flex-col w-70 transition-transform duration-300 transform${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative z-2 flex flex-col gap-5">
          <Logo />
          <UserMenu />
          <Menu />
        </div>
      </aside>
    </div>
  );
}
