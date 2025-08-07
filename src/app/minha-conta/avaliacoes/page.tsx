import FeedCard from '@/components/feed/FeedCard';
import { RatingWithUser } from '@/types/rating';
import { getAuthenticatedUser } from '@/utils/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function getUSerRatings(userId: string): Promise<RatingWithUser[]> {
  const res = await fetch(`http://localhost:3000/api/rating/${userId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar avaliações do usuário');
  }

  return res.json();
}

export default async function MyRatingsPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/login');
  }

  const userRatings = await getUSerRatings(user.id);

  return (
    <div
      className={`${
        userRatings.length > 0
          ? 'bg-white rounded-md box-shadow__card'
          : 'bg-transparent'
      }  `}
    >
      {userRatings.length > 0 ? (
        userRatings.map((rating) => <FeedCard key={rating.id} {...rating} />)
      ) : (
        <div className="w-full flex flex-col items-center">
          <Image
            src={'/sad-face-in-rounded-square.png'}
            width={200}
            height={200}
            alt="Sad Face in rounded square"
            className="w-[100px] h-auto max-w-full"
          />
          <p className="mt-5 text-[#0000008c]">
            Você ainda não fez nenhuma avaliação...
          </p>
        </div>
      )}
    </div>
  );
}
