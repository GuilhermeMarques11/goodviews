import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import StarDisplay from '../shared/StarDisplay';
import Link from 'next/link';
import { RatingWithUser } from '@/types/rating';

export default function FeedCard(props: RatingWithUser) {
  const {
    user,
    mediaTitle,
    score,
    comment,
    createdAt,
    poster_path,
    overview,
    mediaId,
    mediaType,
  } = props;
  return (
    <div className="flex flex-col gap-4 p-5 border-b-1 border-[#cccccc50]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center text-black pb-3.5 border-b-1 border-[#ffffff4d]">
          <Image
            className="w-[50px] h-[50px] object-cover rounded-full"
            src={user.image || '/default-avatar.png'}
            width={50}
            height={50}
            alt="Avatar"
          />
          <p>
            <span className="text-sm font-bold">{user.name}</span> avaliou{' '}
            <strong>{mediaTitle}</strong>
          </p>
        </div>
        <time className="text-[#767676]">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
            locale: ptBR,
          })}
        </time>
      </div>
      <div className="flex items-center gap-2">
        <StarDisplay value={score} />
      </div>
      <div>
        <p className="text-[#737373]">{comment}</p>
      </div>
      <div className="flex items-center border-1 border-[#d8d8d8] p-4 gap-2">
        <Link
          href={`/explorar/${
            mediaType === 'movie' ? 'filmes' : 'series'
          }/${mediaId}`}
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
          <h4 className="text-2xl font-bold mb-2.5">{mediaTitle}</h4>
          <p className="text-[#737373]">{overview}</p>
        </div>
      </div>
    </div>
  );
}
