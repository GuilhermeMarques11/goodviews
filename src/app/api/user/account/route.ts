import { prisma } from '@/utils/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;

    // Check if sessionId exists
    if (!sessionId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Fetch session and user details
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    // Check if session is valid
    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Sessão inválida ou expirada' },
        { status: 401 },
      );
    }

    // If session is valid, return user details
    const { id, name, email } = session.user;

    return NextResponse.json({
      id,
      name,
      email,
    });

    // If session is not found or expired, return an error
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
