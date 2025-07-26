import Rating from '@/app/explorar/_components/Rating';
import { getMediaById } from '@/utils/tmdb/getMediaById';

interface AvaliarPageParams {
  params: {
    id: string;
  };
}

export default async function Avaliar({ params }: AvaliarPageParams) {
  const { id } = params;
  const media = await getMediaById('movie', id);

  return <Rating id={id} media={media} />;
}
