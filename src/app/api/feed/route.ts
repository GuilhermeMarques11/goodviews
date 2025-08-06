import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ratings = await prisma.rating.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    });
    return NextResponse.json(ratings);
  } catch (error) {
    console.error('Erro ao buscar feed', error);
    return NextResponse.json(
      { error: 'Erro ao carregar feed' },
      { status: 500 },
    );
  }
}
