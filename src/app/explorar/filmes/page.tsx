import Pagination from '@/app/explorar/_components/Pagination';
import { getPopularMedia } from '@/utils/tmdb/getPopularMedia';
import { getSearchMedia } from '@/utils/tmdb/getSearchMedia';
import MediaList from '../_components/MediaList';
import { MediaItem } from '@/types/mediaItem';
import SearchForm from '../_components/SearchForm';

interface MoviesParams {
  searchParams: {
    page?: string;
    query?: string;
  };
}

export default async function MediaPage({ searchParams }: MoviesParams) {
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
    <>
      <SearchForm placeholder="Pesquisar filmes..." defaultQuery={query} />
      <MediaList results={results} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
