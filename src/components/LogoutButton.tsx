'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleLogout() {
    await fetch('/api/user/logout', {
      method: 'POST',
    });

    router.push('/login');
    router.refresh();
  }

  return (
    <button
      onClick={() => startTransition(handleLogout)}
      disabled={isPending}
      className="flex items-center gap-3 text-[1.2rem] w-screen hover:bg-[#c8c8c833] hover:text-white transition-colors duration-300 p-2 rounded-md cursor-pointer"
    >
      Sair
    </button>
  );
}
