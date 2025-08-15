'use client';

import FeedCard, { FeedCardProps } from './FeedCard';
import EmptyFeed from './EmptyFeed';
import { FeedRating } from '@/types/rating';
import { useState } from 'react';

interface FeedListProps {
  ratings: FeedRating[];
}

export default function FeedList({ ratings }: FeedListProps) {
  const [ratingList, setRatingList] = useState(ratings);

  const handleDelete = (id: string) => {
    setRatingList((prev) => prev.filter((rating) => rating.id !== id));
  };

  if (ratingList.length === 0) {
    return <EmptyFeed />;
  }

  return (
    <div className="bg-white rounded-md box-shadow__card">
      {ratingList.map((rating) => {
        const feedCardProps: FeedCardProps = {
          ...rating,
          onDelete: handleDelete,
        };
        return <FeedCard key={rating.id} {...feedCardProps} />;
      })}
    </div>
  );
}
