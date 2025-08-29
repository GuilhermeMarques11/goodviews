export async function getMediaById(type: 'movie' | 'tv', id: string) {
  const url = `https://api.themoviedb.org/3/${type}/${id}?language=pt-BR`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Erro ao buscar filme');
  }

  const data = await res.json();
  console.log(data);

  return {
    title: type === 'movie' ? data.title : data.name,
    poster_path: data.poster_path,
    overview: data.overview,
    genres: data.genres,
    release_date: data.release_date,
    runtime: data.runtime,
    first_air_date: data.first_air_date,
  };
}
