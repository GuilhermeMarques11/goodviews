import { getAuthenticatedUser } from '@/utils/auth';
import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ ratingId: string }> },
) {
  const authenticatedUser = await getAuthenticatedUser();
  const { ratingId } = await params;

  // Check if the user is authenticated
  if (!authenticatedUser) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    // Check if the rating exists and belongs to the authenticated user
    const rating = await prisma.rating.findUnique({
      where: { id: ratingId },
    });

    if (!rating) {
      return NextResponse.json(
        { error: 'Avaliação não encontrada' },
        { status: 404 },
      );
    }

    if (rating.userId !== authenticatedUser.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para excluir esta avaliação' },
        { status: 403 },
      );
    }

    // If the rating exists and belongs to the authenticated user, delete it
    await prisma.rating.delete({
      where: { id: ratingId },
    });

    return NextResponse.json(
      { message: 'Avaliação excluída com sucesso' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao excluir avaliação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
