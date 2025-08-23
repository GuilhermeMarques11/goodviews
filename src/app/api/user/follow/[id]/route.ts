import { getAuthenticatedUser } from '@/utils/auth';
import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';

//Follow
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const followerId = user.id;
  const { id: followingId } = await params;

  if (followerId === followingId) {
    return NextResponse.json(
      { error: 'Você não pode seguir a si mesmo' },
      { status: 400 },
    );
  }

  try {
    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Já seguindo ou erro interno' },
      { status: 400 },
    );
  }
}

//Unfollow
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const followerId = user.id;
  const { id: followingId } = await params;

  try {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Você não estava seguindo ou erro interno' },
      { status: 400 },
    );
  }
}
