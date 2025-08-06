import { getAuthenticatedUser } from '@/utils/auth';
import Loginform from './_components/Loginform';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function LoginPage() {
  const user = await getAuthenticatedUser();

  if (user) {
    redirect('/');
  }

  return (
    <div className="flex flex-col gap-2 text-center w-full max-w-3xl m-auto bg-white p-8 rounded-2xl">
      <h1 className="text-4xl font-bold mb-5">GoodViews</h1>
      <Loginform />
      <p className="mt-2">
        Não tem conta?{' '}
        <Link href={'/cadastrar-se'} className="m-auto text-blue-500 font-bold">
          Criar Conta
        </Link>
      </p>
    </div>
  );
}
