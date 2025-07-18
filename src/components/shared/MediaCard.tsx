import { MediaItem } from '@/types/MediaItem';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  media: MediaItem;
}

export default function MediaCard({ media }: Props) {
  return (
    <Link
      href={`/explorar/${media.media_type === 'movie' ? 'filmes' : 'series'}/${
        media.id
      }`}
    >
      <Image
        className="rounded-md box-shadow__card"
        src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
        width={300}
        height={450}
        alt={media.title}
      />
    </Link>
  );
}
