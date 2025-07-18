export async function getMovieById(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Erro ao buscar filme');
  }

  const data = await res.json();

  return {
    title: data.title,
    poster_path: data.poster_path,
    overview: data.overview,
  };
}
