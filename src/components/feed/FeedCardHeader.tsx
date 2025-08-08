'use client';

import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FeedCardHeaderProps {
  user: {
    name: string;
    image: string | null;
    id: string;
  };
  mediaTitle: string;
  createdAt: string;
  isOwner: boolean;
}

export default function FeedCardHeader({
  user,
  mediaTitle,
  createdAt,
  isOwner,
}: FeedCardHeaderProps) {
  return (
    <div className="flex gap-2 items-center text-black pb-3.5 border-b-1 border-[#ffffff4d]">
      <Image
        className="w-[50px] h-[50px] object-cover rounded-full"
        src={user.image || '/default-avatar.png'}
        width={50}
        height={50}
        alt="Avatar"
      />
      <div>
        <p>
          <span className="text-sm font-bold">
            {isOwner ? 'Você' : user.name}{' '}
          </span>{' '}
          avaliou <strong>{mediaTitle}</strong>
        </p>
        <time className="text-[#767676] text-sm">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
            locale: ptBR,
          })}
        </time>
      </div>
    </div>
  );
}
