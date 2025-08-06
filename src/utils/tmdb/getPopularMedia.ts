import transformToMediaItem, { RawMovie, RawTvShow } from '@/types/mediaItem';

export async function getPopularMedia(type: 'movie' | 'tv', page = 1) {
  const url = `https://api.themoviedb.org/3/${type}/popular?language=pt-BR&page=${page}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Erro ao buscar ${type === 'movie' ? 'filmes' : 'séries'}`);
  }

  const data = await res.json();

  if (type === 'movie') {
    return {
      results: (data.results as RawMovie[]).map((item) =>
        transformToMediaItem(item, 'movie'),
      ),
      totalPages: data.total_pages,
      currentPage: data.page,
    };
  } else {
    return {
      results: (data.results as RawTvShow[]).map((item) =>
        transformToMediaItem(item, 'tv'),
      ),
      totalPages: data.total_pages,
      currentPage: data.currentPage,
    };
  }
}
