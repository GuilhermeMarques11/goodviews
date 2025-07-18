import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function MediaCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/explorar/filmes/${movie.id}`}>
      <Image
        className="rounded-md box-shadow__card"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        width={300}
        height={450}
        alt={movie.title}
      />
    </Link>
  );
}
