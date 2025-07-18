import MediaCard from '@/components/shared/MediaCard';
import Pagination from '@/components/shared/Pagination';
import { MediaItem } from '@/types/MediaItem';
import { getPopularMedia } from '@/utils/tmdb/getPopularMedia';

interface MoviesParams {
  searchParams: { page?: string };
}

export default async function MoviesPage({ searchParams }: MoviesParams) {
  const currentPage = Number(searchParams.page) || 1;
  const { results, totalPages } = await getPopularMedia('movie', currentPage);
  console.log('Página atual: ', currentPage);
  console.log('Total de páginas: ', totalPages);

  return (
    <>
      <div className="grid grid-cols-4 gap-2.5">
        {results.map((media: MediaItem) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </div>
      <Pagination
        basePath="/explorar/filmes"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
