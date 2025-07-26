import Pagination from '@/app/explorar/_components/Pagination';
import { getPopularMedia } from '@/utils/tmdb/getPopularMedia';
import MediaList from '../_components/MediaList';

interface MoviesParams {
  searchParams: { page?: string };
}

export default async function MediaPage({ searchParams }: MoviesParams) {
  const currentPage = Number(searchParams.page) || 1;
  const { results, totalPages } = await getPopularMedia('movie', currentPage);
  console.log('Página atual: ', currentPage);
  console.log('Total de páginas: ', totalPages);

  return (
    <>
      <MediaList results={results} />
      <Pagination
        basePath="/explorar/filmes"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
