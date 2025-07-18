import styles from './Sidebar.module.css';

import Menu from './menu/Menu';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <aside
      className={`${styles.sidebar} w-70 h-screen bg-cover bg-center relative py-8 px-4 flex flex-col`}
    >
      <div className="relative z-2 flex flex-col gap-5">
        <div className="flex gap-2 items-center text-white pb-3.5 border-b-1 border-[#ffffff4d]">
          <Image
            src="/logo-react-white.svg"
            width={50}
            height={50}
            alt="Logo React"
          />
          <span className="uppercase text-2xl font-black">GoodViews</span>
        </div>
        <div className="flex gap-2 items-center text-white pb-3.5 border-b-1 border-[#ffffff4d]">
          <Image
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/84147250?v=4"
            width={50}
            height={50}
            alt="Avatar"
          />
          <span className="text-sm">Guilherme Marques</span>
        </div>
        <Menu />
      </div>
    </aside>
  );
}
