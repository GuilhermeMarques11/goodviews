import FeedList from '@/components/feed/FeedList';
import { prisma } from '@/utils/prisma';
import { getAuthenticatedUser } from '@/utils/auth';
import { redirect } from 'next/navigation';
import { FeedRating } from '@/types/rating';

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

  // Mapear para FeedRating
  const feed: FeedRating[] = ratings.map((rating) => ({
    ...rating,
    user: {
      id: rating.user.id,
      name: rating.user.name,
      image: rating.user.image ?? null,
    },
    isOwner: rating.userId === user.id,
  }));

  return <FeedList ratings={feed} />;
}
