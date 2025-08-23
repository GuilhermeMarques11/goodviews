import { getMediaById } from '@/utils/tmdb/getMediaById';
import Image from 'next/image';
import RatingButton from '../../_components/RatingButton';

interface MoviePageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: MoviePageParams) {
  const { id } = await params;
  const { title, poster_path, overview } = await getMediaById('movie', id);

  return (
    <div className="flex gap-10">
      {poster_path && (
        <div className="w-[25%] text-center">
          <Image
            className="rounded-md box-shadow__card w-full mb-5"
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            width={200}
            height={450}
            alt={title}
          />
          <RatingButton id={id} />
        </div>
      )}
      <div className="w-[75%]">
        <h1 className="text-4xl uppercase mb-5">{title}</h1>
        <p>{overview || 'Descrição não encontrada'}</p>
      </div>
    </div>
  );
}
