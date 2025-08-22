import { getPopularMedia } from '@/utils/tmdb/getPopularMedia';
import MediaList from '../explorar/_components/MediaList';
import Pagination from '../explorar/_components/Pagination';
import { getSearchMedia } from '@/utils/tmdb/getSearchMedia';
import { MediaItem } from '@/types/mediaItem';

interface TestePageProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function TestePage({ searchParams }: TestePageProps) {
  const query = searchParams.query || '';
  const currentPage = Number(searchParams.page) || 1;

  let results: MediaItem[] = [];
  let totalPages = 0;

  if (query) {
    const data = await getSearchMedia('movie', query, currentPage);
    results = data.results;
    totalPages = data.totalPages;
  } else {
    const popularData = await getPopularMedia('movie', currentPage);
    results = popularData.results;
    totalPages = popularData.totalPages;
  }

  return (
    <div>
      <form method="GET">
        <input
          type="search"
          name="query"
          defaultValue={query}
          placeholder="Pesquisar filmes"
          className="border px-2 py-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
        >
          Buscar
        </button>
      </form>

      <MediaList results={results} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
        />
      )}
    </div>
  );
}
