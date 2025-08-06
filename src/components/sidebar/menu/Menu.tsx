import { IoHome } from 'react-icons/io5';
import MenuItem from './MenuItem';
import { BiSolidCameraMovie } from 'react-icons/bi';

export default function Menu() {
  return (
    <nav className="text-white">
      <ul className="flex flex-col gap-2.5 list-none">
        <MenuItem href="/" text="Home" icon={<IoHome />} />
        <MenuItem
          text="Explorar"
          icon={<BiSolidCameraMovie />}
          submenu={[
            { text: 'Fimes', href: '/explorar/filmes' },
            { text: 'Séries', href: '/explorar/series' },
          ]}
        />
      </ul>
    </nav>
  );
}
