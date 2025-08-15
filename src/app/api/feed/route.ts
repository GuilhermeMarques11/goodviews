import { getAuthenticatedUser } from '@/utils/auth';
import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const ratings = await prisma.rating.findMany({
    where: {
      user: {
        followers: {
          some: {
            followerId: user.id,
          },
        },
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(ratings);
}
