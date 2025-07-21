import { getAuthenticatedUser } from '@/utils/auth';
import Loginform from './components/Loginform';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function LoginPage() {
  const user = await getAuthenticatedUser();

  if (user) {
    redirect('/');
  }

  return (
    <div className="flex flex-col gap-2 text-center">
      <Loginform />
      <Link href={'/cadastrar-se'} className="m-auto">
        Criar Conta
      </Link>
    </div>
  );
}
