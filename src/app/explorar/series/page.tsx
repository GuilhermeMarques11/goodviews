import Pagination from '@/app/explorar/_components/Pagination';
import { getPopularMedia } from '@/utils/tmdb/getPopularMedia';
import MediaList from '../_components/MediaList';

interface MoviesParams {
  searchParams: { page?: string };
}

export default async function TvShowPage({ searchParams }: MoviesParams) {
  const currentPage = Number(searchParams.page) || 1;
  const { results, totalPages } = await getPopularMedia('tv', currentPage);

  return (
    <>
      <MediaList results={results} />
      <Pagination
        basePath="/explorar/series"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
