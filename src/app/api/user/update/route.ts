import { prisma } from '@/utils/prisma';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { Prisma } from '@/generated/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, image, currentPassword, newPassword } = body;

    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Check if session exists and is valid
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

    const user = session.user;
    const updates: Partial<Prisma.UserUpdateInput> = {
      name,
      email,
      image,
    };

    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        return NextResponse.json(
          { error: 'Para alterar a senha, preencha ambos os campos' },
          { status: 400 },
        );
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: 'Senha atual incorreta' },
          { status: 400 },
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updates.password = hashedPassword;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: updates,
    });

    return NextResponse.json({ message: 'Perfil atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
