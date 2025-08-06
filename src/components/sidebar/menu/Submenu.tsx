'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TbCaretDownFilled } from 'react-icons/tb';
import styles from './MenuItem.module.css';
import React from 'react';
import { SubmenuComponentItem, SubmenuItem, SubmenuLinkItem } from './types';

// Type guard functions
const isLinkItem = (item: SubmenuItem): item is SubmenuLinkItem => {
  return 'href' in item && 'text' in item;
};

const isComponentItem = (item: SubmenuItem): item is SubmenuComponentItem => {
  return 'component' in item;
};

interface SubmenuProps {
  text: string | React.ReactNode;
  icon: React.ReactNode;
  submenu?: SubmenuItem[];
}

export default function Submenu({ text, icon, submenu }: SubmenuProps) {
  const pathname = usePathname();
  const isAnySubActive = submenu?.some(
    (item) => isLinkItem(item) && pathname === item.href,
  );

  return (
    <li className="relative list-none">
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
        <ul className="ml-10 mt-2 space-y-2 text-sm text-white">
          {submenu?.map((item, index) => {
            // Check if the item has a component
            if (isComponentItem(item)) {
              return <li key={index}>{item.component}</li>;
            }

            // TypeScript agora sabe que item é SubmenuLinkItem
            const isSubActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${
                    isSubActive ? styles.active : ''
                  } text-[1.2rem] text-white w-full hover:bg-[#c8c8c833] hover:text-white transition-colors duration-300 p-2 rounded-md block`}
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
