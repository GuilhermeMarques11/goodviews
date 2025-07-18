import MediaCard from '@/components/shared/MediaCard';
import Pagination from '@/components/shared/Pagination';
import { getPopularMovies } from '@/utils/tmdb/getMovies';

export interface MoviesPageProps {
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

  return (
    <>
      <div className="grid grid-cols-4 gap-2.5">
        {movies.map((movie: MoviesPageProps) => (
          <MediaCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
