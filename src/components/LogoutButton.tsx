'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleLogout() {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    router.push('/login');
    router.refresh();
  }

  return (
    <button
      onClick={() => startTransition(handleLogout)}
      disabled={isPending}
      className="cursor-pointer"
    >
      Sair
    </button>
  );
}
