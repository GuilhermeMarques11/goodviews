import { prisma } from '@/utils/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value;

  if (!sessionId) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return NextResponse.json(
      { error: 'Sessão inválida ou expirada' },
      { status: 401 },
    );
  }

  const { user } = session;

  return NextResponse.json({
    message: `Olá, ${user.name || user.email}! Você está autenticado.`,
  });
}
