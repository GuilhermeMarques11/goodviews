'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MenuItem.module.css';
import Submenu from './Submenu';

export interface MenuItemsProps {
  text: string;
  href?: string;
  icon: React.ReactNode;
  submenu?: { text: string; href: string }[];
}

export default function MenuItem({
  text,
  href,
  icon,
  submenu,
}: MenuItemsProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (submenu && submenu.length > 0) {
    return <Submenu icon={icon} text={text} submenu={submenu} />;
  }
  return (
    <li>
      <Link
        href={href!}
        className={`flex items-center gap-3 text-[1.2rem] text-white w-screen hover:bg-[#c8c8c833] hover:text-white transition-colors duration-300 p-2 rounded-md ${
          isActive ? `${styles.active}` : ''
        }`}
      >
        {icon}
        <span>{text}</span>
      </Link>
    </li>
  );
}
