export async function getMediaVideos(type: 'movie' | 'tv', id: string) {
  const url = `https://api.themoviedb.org/3/${type}/${id}/videos?&language=pt-BR`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Erro ao buscar trailer');
  }

  const data = await res.json();
  console.log(data);

  return data;
}
