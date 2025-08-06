import { MediaItem } from '@/types/mediaItem';
import { getImageUrl } from '@/utils/image';
import Link from 'next/link';

interface Props {
  media: MediaItem;
}

export default function MediaCard({ media }: Props) {
  return (
    <div
      className="rounded-md box-shadow__card bg-cover min-h-[354px] overflow-hidden relative group"
      style={{
        backgroundImage: `url('${getImageUrl(media.poster_path)}')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-100 flex flex-col items-center justify-around gap-3 opacity-0 group-hover:opacity-90 transition-opacity duration-300 px-2.5">
        <p className="text-white text-2xl text-center mb-1.5">{media.title}</p>
        <div className="flex flex-col gap-2">
          <Link
            href={`/explorar/${
              media.media_type === 'movie' ? 'filmes' : 'series'
            }/${media.id}/avaliar`}
            className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition text-center"
          >
            Avaliar
          </Link>
          <Link
            href={`/explorar/${
              media.media_type === 'movie' ? 'filmes' : 'series'
            }/${media.id}`}
            className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition text-center"
          >
            Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
