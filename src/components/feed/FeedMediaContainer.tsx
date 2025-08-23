import Link from 'next/link';
import Image from 'next/image';

interface FeedMediaContainerProps {
  mediaType: string;
  mediaId: number;
  mediaTitle: string;
  poster_path: string | null;
  overview: string | null;
}

export default function FeedMediaContainer({
  mediaType,
  mediaId,
  mediaTitle,
  poster_path,
  overview,
}: FeedMediaContainerProps) {
  return (
    <div className="flex flex-col items-center border-1 border-[#d8d8d8] p-4 gap-4 lg:flex-row">
      <Link
        href={`/explorar/${
          mediaType === 'movie' ? 'filmes' : 'series'
        }/${mediaId}`}
        className="order-last lg:order-first"
      >
        <Image
          className="max-w-[120px]"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          width={200}
          height={300}
          alt="Avatar"
        />
      </Link>
      <div>
        <Link
          className="hover:underline"
          href={`/explorar/${
            mediaType === 'movie' ? 'filmes' : 'series'
          }/${mediaId}`}
        >
          <h4 className="text-2xl font-bold mb-2.5">{mediaTitle}</h4>
        </Link>
        <p className="text-[#737373]">{overview}</p>
      </div>
    </div>
  );
}
