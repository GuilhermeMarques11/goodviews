// No arquivo @/types/rating.ts
export type RatingWithUser = {
  id: string;
  userId: string;
  createdAt: Date;
  mediaId: number;
  mediaType: string;
  mediaTitle: string;
  score: number;
  poster_path: string | null;
  overview: string | null;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
};

export type FeedRating = RatingWithUser & {
  isOwner: boolean;
};
