import Link from 'next/link';
import SignupForm from './components/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-2">
      <SignupForm />
      <Link href={'/login'} className="m-auto">
        Login
      </Link>
    </div>
  );
}
