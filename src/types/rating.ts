export interface RatingWithUser {
  id: string;
  userId: string;
  mediaId: number;
  mediaType: 'movie' | 'tv';
  mediaTitle: string;
  score: number;
  comment?: string;
  createdAt: string;
  poster_path: string;
  overview: string;
  user: {
    name: string;
    image: string;
    id: string;
  };
  isOwner: boolean;
}
