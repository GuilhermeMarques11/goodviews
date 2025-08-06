import { prisma } from '@/utils/prisma';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    //Parse the JSON body from the request
    const body = await req.json();
    const {
      mediaId,
      mediaType,
      mediaTitle,
      score,
      comment,
      poster_path,
      overview,
    } = body;

    //Validate the incoming data
    if (
      typeof mediaId !== 'number' ||
      (mediaType !== 'movie' && mediaType !== 'tv') ||
      typeof mediaTitle !== 'string' ||
      typeof score !== 'number' ||
      score < 1 ||
      score > 10
    ) {
      //Return 400 Bad Request if validation fails
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    //Retrieve cookies from the request
    const cookieStore = await cookies();
    //Get the sessionId from the cookies
    const sessionId = cookieStore.get('sessionId')?.value;

    //If no sessionId cookie, return 401 Unauthorized
    if (!sessionId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    //Find the session in the database including the related user
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    //Check if session exists and is still valid (not expired)
    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Sessão inválida' }, { status: 401 });
    }

    const user = session.user;

    //Create a new rating record in the database linked to the user
    const rating = await prisma.rating.upsert({
      where: {
        userId_mediaId_mediaType: {
          userId: user.id,
          mediaId,
          mediaType,
        },
      },
      update: {
        score,
        comment,
        poster_path,
        overview,
        createdAt: new Date(),
      },
      create: {
        userId: user.id,
        mediaId,
        mediaType,
        mediaTitle,
        score,
        comment,
        poster_path,
        overview,
      },
    });

    //Return success response with created rating data HTTP status 201 created
    return NextResponse.json(
      { message: 'Avaliação registrada com sucesso', rating },
      { status: 201 },
    );
  } catch (error) {
    //Log error for debugging
    console.log('Erro ao registrar avaliação', error);
    //Return 500 Internal Server Error for unexpected errors
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const mediaId = url.searchParams.get('mediaId');
    const mediaType = url.searchParams.get('mediaType');

    //Validate query parameters
    if (!mediaId || !mediaType) {
      return NextResponse.json(
        { error: 'Parâmetros inválidos' },
        { status: 400 },
      );
    }

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
      return NextResponse.json({ error: 'Sessão inválida' }, { status: 401 });
    }

    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_mediaId_mediaType: {
          userId: session.user.id,
          mediaId: Number(mediaId),
          mediaType,
        },
      },
    });

    return NextResponse.json({ rating: existingRating }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar avaliação', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 },
    );
  }
}
