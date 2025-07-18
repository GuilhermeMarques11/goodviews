export async function getPopularMovies(page = 1) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${page}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Erro ao buscar filmes');
  }

  const data = await res.json();
  return {
    movies: data.results,
    totalPages: data.total_pages,
    currentPage: data.page,
  };
}
