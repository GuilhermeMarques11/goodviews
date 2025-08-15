import { prisma } from '@/utils/prisma';

// Tipo direto do Prisma
export type RatingWithUser = Awaited<
  ReturnType<typeof prisma.rating.findMany>
>[number] & { isOwner: boolean };

// Tipo seguro para o feed / UI
export type FeedRating = Omit<RatingWithUser, 'user'> & {
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  isOwner: boolean;
};
