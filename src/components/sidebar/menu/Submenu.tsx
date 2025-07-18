'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TbCaretDownFilled } from 'react-icons/tb';
import styles from './MenuItem.module.css';
import { MenuItemsProps } from './MenuItem';

export default function Submenu({
  text,
  icon,
  submenu,
}: Omit<MenuItemsProps, 'href'>) {
  const pathname = usePathname();
  const isAnySubActive = submenu?.some((item) => pathname === item.href);
  return (
    <li className="relative">
      <details className="group w-full">
        <summary
          className={`flex items-center gap-3 text-[1.2rem] text-white hover:bg-[#c8c8c833] hover:text-white transition-colors p-2 rounded-md cursor-pointer w-full ${
            isAnySubActive ? styles.subemenuActive : ''
          }`}
        >
          {icon}
          <span>{text}</span>
          <TbCaretDownFilled
            size={20}
            className={`absolute top-2.5 right-2 z-[-1] ${styles.dropdownIcon} group-open:rotate-180 transition duration-300`}
          />
        </summary>
        <ul className="ml-10 mt-2 space-y-2 text-sm">
          {submenu?.map((item) => {
            const isSubActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${
                    isSubActive ? styles.active : ''
                  } text-[1.2rem] text-white w-full hover:bg-[#c8c8c833] hover:text-white transition-colors duration-300 p-2 rounded-md`}
                >
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </details>
    </li>
  );
}
