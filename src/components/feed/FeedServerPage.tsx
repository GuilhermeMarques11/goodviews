import { RatingWithUser, FeedRating } from '@/types/rating';
import { getAuthenticatedUser } from '@/utils/auth';
import { redirect } from 'next/navigation';
import FeedList from './FeedList';

interface FeedServerProps {
  fetchRatingsFn: (userId: string) => Promise<RatingWithUser[]>;
}

export default async function FeedServerPage({
  fetchRatingsFn,
}: FeedServerProps) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/login');
  }

  const feed = await fetchRatingsFn(user.id);

  const ratingWithIsOwner: FeedRating[] = feed.map((rating) => ({
    ...rating,
    isOwner: rating.userId === user.id,
    user: {
      id: rating.user.id,
      name: rating.user.name,
      image: rating.user.image,
    },
  }));

  return <FeedList ratings={ratingWithIsOwner} />;
}
