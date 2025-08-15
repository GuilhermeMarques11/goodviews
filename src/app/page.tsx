import FeedList from '@/components/feed/FeedList';
import { RatingWithUser } from '@/types/rating';
import { getAuthenticatedUser } from '@/utils/auth';
import { prisma } from '@/utils/prisma';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/login');
  }

  const ratings = await prisma.rating.findMany({
    where: {
      OR: [
        { user: { followers: { some: { followerId: user.id } } } },
        { userId: user.id },
      ],
    },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  const feed: RatingWithUser[] = ratings.map((rating) => ({
    ...rating,
    isOwner: rating.userId === user.id,
  }));

  return <FeedList ratings={feed} />;
}
