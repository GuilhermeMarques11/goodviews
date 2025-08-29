import Link from 'next/link';
import SignupForm from './components/SignupForm';

export default function SignupPage() {
  return (
    <div className="container flex flex-col items-center">
      <div className="flex flex-col gap-2 w-6/12 bg-white p-8 rounded-2xl">
        <div className="text-center mb-5 max-w-[500px] m-auto">
          <h1 className="text-4xl font-bold mb-2">GoodViews</h1>
          <p className="text-[#737373]">
            Cadastre-se para compartilhar avaliações de filmes e séries com seus
            amigos. Longe de algoritmos impessoais e avaliações genéricas.
          </p>
        </div>
        <SignupForm />
        <p className="text-center mt-2">
          Já tem uma conta?{' '}
          <Link href={'/login'} className="m-auto text-blue-500 font-bold">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
