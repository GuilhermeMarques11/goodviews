import transformToMediaItem, { RawMovie, RawTvShow } from '@/types/mediaItem';

export async function getSearchMedia(
  type: 'movie' | 'tv',
  query: string,
  page: number = 1,
) {
  const url = `https://api.themoviedb.org/3/search/${type}?language=pt-BR&query=${encodeURIComponent(
    query,
  )}&page=${page}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Erro ao buscar ${type === 'movie' ? 'filmes' : 'séries'}`);
  }

  const data = await res.json();

  return {
    results:
      type === 'movie'
        ? (data.results as RawMovie[]).map((item) =>
            transformToMediaItem(item, 'movie'),
          )
        : (data.results as RawTvShow[]).map((item) =>
            transformToMediaItem(item, 'tv'),
          ),
    totalPages: data.total_pages,
    currentPage: data.page,
  };
}
