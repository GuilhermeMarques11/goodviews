import Rating from '@/app/explorar/_components/Rating';
import { getMediaById } from '@/utils/tmdb/getMediaById';

interface AvaliarSeriePageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function AvaliarSeriePage({
  params,
}: AvaliarSeriePageParams) {
  const { id } = await params;
  const media = await getMediaById('tv', id);

  return <Rating id={id} media={media} mediaType="tv" />;
}
