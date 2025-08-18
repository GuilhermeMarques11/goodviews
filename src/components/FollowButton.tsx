'use client';

import { useState, useTransition } from 'react';

interface FollowButtonProps {
  userId: string;
  isFollowing: boolean;
}

export default function FollowButton({
  userId,
  isFollowing,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [isPending, startTransition] = useTransition();

  const toggleFollow = async () => {
    startTransition(async () => {
      const res = await fetch(`/api/user/follow/${userId}`, {
        method: following ? 'DELETE' : 'POST',
      });
      if (res.ok) {
        setFollowing(!following);
      }
    });
  };

  return (
    <button
      onClick={toggleFollow}
      disabled={isPending}
      className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
        following ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isPending ? '...' : following ? 'Deixar de seguir' : 'Seguir'}
    </button>
  );
}
