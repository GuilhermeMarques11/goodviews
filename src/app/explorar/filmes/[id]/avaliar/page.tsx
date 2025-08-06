import Rating from '@/app/explorar/_components/Rating';
import { getMediaById } from '@/utils/tmdb/getMediaById';

interface AvaliarFilmePageParams {
  params: {
    id: string;
  };
}

export default async function AvaliarFilmePage({
  params,
}: AvaliarFilmePageParams) {
  const { id } = params;
  const media = await getMediaById('movie', id);

  return <Rating id={id} media={media} mediaType="movie" />;
}
