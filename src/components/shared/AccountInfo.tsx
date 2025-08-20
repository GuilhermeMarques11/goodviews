import { UserInfo } from '@/types/userInfo';
import Image from 'next/image';
import FollowButton from '../FollowButton';

interface AccountInfoProps extends UserInfo {
  isCurrentUser: boolean;
  isFollowing?: boolean | undefined;
}

export default function AccountInfo({
  name,
  image,
  id,
  createdAt,
  isCurrentUser,
  isFollowing,
}: AccountInfoProps) {
  return (
    <div className="flex items-center pb-10 gap-5">
      <div>
        <Image
          src={image || '/default-avatar.png'}
          width={200}
          height={200}
          alt={name}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="flex justify-between text-[#767676]">ID: {id}</p>
        <p className="text-[#767676]">
          Atividade: {createdAt ? createdAt.toLocaleDateString('pt-BR') : ''}
        </p>
        {!isCurrentUser && (
          <FollowButton userId={id} isFollowing={!!isFollowing} />
        )}
      </div>
    </div>
  );
}
