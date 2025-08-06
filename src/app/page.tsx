import FeedCard from '@/components/feed/FeedCard';
import { RatingWithUser } from '@/types/rating';
import { getAuthenticatedUser } from '@/utils/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function getFeed(): Promise<RatingWithUser[]> {
  const res = await fetch('http://localhost:3000/api/feed', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function Home() {
  const user = await getAuthenticatedUser();
  const feed = await getFeed();

  if (!user) {
    redirect('/login');
  }

  return (
    <div
      className={`${
        feed.length > 0
          ? 'bg-white rounded-md box-shadow__card'
          : 'bg-transparent'
      }  `}
    >
      {feed.length > 0 ? (
        feed.map((rating) => <FeedCard key={rating.id} {...rating} />)
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
            Nenhuma avaliação por enquanto...
          </p>
        </div>
      )}
    </div>
  );
}
