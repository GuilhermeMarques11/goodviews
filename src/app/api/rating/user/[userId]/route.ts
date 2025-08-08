import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const userId = params.userId;

  if (!userId) {
    return NextResponse.json(
      { error: 'ID do usuário não fornecido' },
      { status: 400 },
    );
  }

  try {
    const userRatings = await prisma.rating.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(userRatings);
  } catch (error) {
    console.error('Erro ao buscar avaliações do usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
