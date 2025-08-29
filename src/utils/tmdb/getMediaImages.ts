export async function getMediaImages(type: 'movie' | 'tv', id: string) {
  const url = `https://api.themoviedb.org/3/${type}/${id}/images`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Erro ao buscar imagens');
  }

  const data = await res.json();
  return data.backdrops[0];
}
