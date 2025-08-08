import { RatingWithUser } from '@/types/rating';
import FeedServerPage from '@/components/feed/FeedServerPage';

async function getUSerRatings(userId: string): Promise<RatingWithUser[]> {
  const res = await fetch(`http://localhost:3000/api/rating/user/${userId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar avaliações do usuário');
  }

  return res.json();
}

export default async function MyRatingsPage() {
  return <FeedServerPage fetchRatingsFn={getUSerRatings} />;
}
