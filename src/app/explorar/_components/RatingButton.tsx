import Link from 'next/link';

interface RatingButtonProps {
  id: string;
}

export default function RatingButton({ id }: RatingButtonProps) {
  return (
    <Link
      href={`${id}/avaliar`}
      className="bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-300 transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap2"
    >
      Avaliar
    </Link>
  );
}
