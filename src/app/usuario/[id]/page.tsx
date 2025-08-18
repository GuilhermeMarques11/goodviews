import FeedServerPage from '@/components/feed/FeedServerPage';
import FollowButton from '@/components/FollowButton';
import { getAuthenticatedUser } from '@/utils/auth';
import { prisma } from '@/utils/prisma';

async function fetchRatingsByUserId(id: string) {
  const res = await fetch(`http://localhost:3000/api/rating/user/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar avaliações do usuário');
  }

  const data = await res.json();

  return data;
}

interface UserPageProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const currentUser = await getAuthenticatedUser();
  const userId = params.id;
  const fetchRatingsFn = () => fetchRatingsByUserId(params.id);

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
      <div className="text-center mb-5">
        {currentUser && currentUser.id !== userId && (
          <FollowButton userId={userId} isFollowing={isFollowing} />
        )}
      </div>
      <FeedServerPage fetchRatingsFn={fetchRatingsFn} />
    </div>
  );
}
