import { prisma } from '@/utils/prisma';

// Global type RatingWithUser based on Prisma return
export type RatingWithUser = Awaited<
  ReturnType<typeof prisma.rating.findMany>
>[number] & { isOwner: boolean };
