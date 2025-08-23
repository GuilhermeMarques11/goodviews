import Pagination from '@/app/explorar/_components/Pagination';
import { getPopularMedia } from '@/utils/tmdb/getPopularMedia';
import MediaList from '../_components/MediaList';
import { getSearchMedia } from '@/utils/tmdb/getSearchMedia';
import { MediaItem } from '@/types/mediaItem';
import SearchForm from '../_components/SearchForm';

interface MoviesParams {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
}

export default async function TvShowPage({ searchParams }: MoviesParams) {
  const { query = '', page } = await searchParams;
  const currentPage = Number(page) || 1;

  let results: MediaItem[] = [];
  let totalPages = 0;

  if (query) {
    const data = await getSearchMedia('tv', query, currentPage);
    results = data.results;
    totalPages = data.totalPages;
  } else {
    const popularData = await getPopularMedia('tv', currentPage);
    results = popularData.results;
    totalPages = popularData.totalPages;
  }

  return (
    <>
      <SearchForm placeholder="Pesquisar séries..." defaultQuery={query} />
      <MediaList results={results} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
