import { prisma } from '@/utils/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  //Get the cookies from incoming request
  const cookieStore = await cookies();

  //Try to retrieve the sessionID from the cookies
  const sessionId = cookieStore.get('sessionId')?.value;

  if (sessionId) {
    //Delete the session from de database using the session ID
    await prisma.session.deleteMany({
      where: { id: sessionId },
    });

    //Clear the sessionID cookie by setting its value to an empty string and expiring it immediately
    cookieStore.set({
      name: 'sessionId',
      value: '',
      path: '/',
      maxAge: 0,
    });
  }

  //Return a success response regardless of whether a session existed
  return NextResponse.json({ message: 'Logout realizado com sucesso.' });
}
