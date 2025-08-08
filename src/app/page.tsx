import FeedList from '@/components/feed/FeedList';
import { RatingWithUser } from '@/types/rating';
import { getAuthenticatedUser } from '@/utils/auth';
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

  const ratingWithIsOwner = feed.map((rating) => ({
    ...rating,
    isOwner: rating.userId === user.id,
  }))

  return (
    <FeedList ratings={ratingWithIsOwner} />
  );
}
