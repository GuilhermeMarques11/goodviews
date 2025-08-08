'use client';

import FeedCard from '@/components/feed/FeedCard';
import EmptyFeed from '@/components/feed/EmptyFeed';
import { RatingWithUser } from '@/types/rating';
import { useState } from 'react';

interface FeedListProps {
  ratings: (RatingWithUser & { isOwner: boolean })[];
}

export default function FeedList({ ratings }: FeedListProps) {
  const [ratingList, setRatingList] = useState(ratings);

  const handleDelete = (id: string) => {
    setRatingList((prev) => prev.filter((rating) => rating.id !== id));
  };

  const hasRatings = ratingList.length > 0;

  return (
    <div
      className={`${
        hasRatings ? 'bg-white rounded-md box-shadow__card' : 'bg-transparent'
      }  `}
    >
      {hasRatings ? (
        ratingList.map((rating) => (
          <FeedCard key={rating.id} {...rating} onDelete={handleDelete} />
        ))
      ) : (
        <EmptyFeed />
      )}
    </div>
  );
}
