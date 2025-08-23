import LogoutButton from '@/components/LogoutButton';
import Image from 'next/image';
import MenuItem from '../menu/MenuItem';
import { useUser } from '@/app/context/UserContext';

export default function UserMenu() {
  const { currentUser } = useUser();

  return (
    <nav>
      <ul className="flex flex-col gap-2.5 pb-3.5 list-none border-b border-[#ffffff4d]">
        <MenuItem
          text={
            <span className="text-sm">
              {currentUser
                ? `Olá, ${currentUser.name || currentUser.email}`
                : 'Usuário não autenticado'}
            </span>
          }
          icon={
            <Image
              className="rounded-full w-8 h-8 object-contain"
              src={currentUser?.image || '/default-avatar.png'}
              width={44}
              height={44}
              alt="Avatar"
            />
          }
          submenu={[
            { text: 'Minha conta', href: '/minha-conta' },
            {
              text: 'Minhas avaliações',
              href: '/minha-conta/avaliacoes',
            },
            { component: <LogoutButton /> },
          ]}
        />
      </ul>
    </nav>
  );
}
