import FeedServerPage from '@/components/feed/FeedServerPage';
import AccountInfo from '@/components/shared/AccountInfo';
import { getAuthenticatedUser } from '@/utils/auth';
import { prisma } from '@/utils/prisma';

async function fetchRatingsByUserId(id: string) {
  const res = await fetch(
    `https://goodviews-gyt1n0e87-guilherme-marques-projects-f5c74c9b.vercel.app/api/rating/user/${id}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Falha ao buscar avaliações do usuário');
  }

  const data = await res.json();

  return data;
}

interface UserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const currentUser = await getAuthenticatedUser();
  const { id: userId } = await params;
  const fetchRatingsFn = () => fetchRatingsByUserId(userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
    },
  });

  if (!user) {
    return <p>Usuário não encontrado</p>;
  }

  let isFollowing = false;

  if (currentUser && currentUser.id !== userId) {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: userId,
        },
      },
    });
    isFollowing = !!follow;
  }

  return (
    <div>
      <AccountInfo
        name={user.name}
        image={user.image}
        id={user.id}
        createdAt={user.createdAt}
        isCurrentUser={currentUser?.id === userId}
        isFollowing={isFollowing}
      />
      <FeedServerPage fetchRatingsFn={fetchRatingsFn} />
    </div>
  );
}
