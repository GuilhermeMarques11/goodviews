import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col gap-4 min-h-[70vh] text-center">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-lg text-gray-700 capitalize">Página não encontrada</p>
      <Link
        href="/"
        className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-300 transition duration-200"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
