import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    //Validate input fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-mail e senha são obrigatórios' },
        { status: 400 },
      );
    }

    //Find user in database by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    //Check if user exists and has password set
    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'E-mail ou senha inválidos' },
        { status: 401 },
      );
    }

    //Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    //If password is incorrect
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'E-mail ou senha inválidos' },
        { status: 401 },
      );
    }

    //Remove all previus sessions for the user (to avoid multiple active sessions)
    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    //Create a new session with expiration in 7 days
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    });

    //Prepare the response
    const response = NextResponse.json({
      message: 'Login realizado com sucesso',
    });

    //Set the session cookie in the response
    response.cookies.set({
      name: 'sessionId',
      value: session.id,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    //Return the response with cookie
    return response;
  } catch (error) {
    //Log unexpected error and return 500 response
    console.error('Erro ao realizar login', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 },
    );
  }
}
