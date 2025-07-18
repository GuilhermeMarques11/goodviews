import { getPopularMovies } from '@/utils/tmdb/getMovies';
import Image from 'next/image';
import Link from 'next/link';

interface MoviesPageProps {
  id: number;
  title: string;
  poster_path: string;
}

interface MoviesParams {
  searchParams: { page?: string };
}

export default async function FilmesPage({ searchParams }: MoviesParams) {
  const currentPage = Number(searchParams.page) || 1;
  const { movies, totalPages } = await getPopularMovies(currentPage);
  console.log(movies);

  return (
    <div>
      <div className="grid grid-cols-4 gap-2.5">
        {movies.map((movie: MoviesPageProps) => (
          <Link key={movie.id} href={`/explorar/filmes/${movie.id}`}>
            <Image
              className="rounded-md box-shadow__card"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              width={300}
              height={450}
              alt={movie.title}
            />
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-12 gap-2 flex-wrap">
        {currentPage > 1 && (
          <Link
            href={`?page=${currentPage - 1}`}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Anterior
          </Link>
        )}

        {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
          const page = i + 1;
          return (
            <Link
              key={page}
              href={`?page=${page}`}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </Link>
          );
        })}

        {currentPage < totalPages && (
          <Link
            href={`?page=${currentPage + 1}`}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Próximo
          </Link>
        )}
      </div>
    </div>
  );
}
