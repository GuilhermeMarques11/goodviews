import { getMediaById } from '@/utils/tmdb/getMediaById';
import Image from 'next/image';

interface filmePageParams {
  params: {
    id: string;
  };
}

export default async function TvShowPage({ params }: filmePageParams) {
  const { id } = params;
  const { title, poster_path, overview } = await getMediaById('tv', id);

  return (
    <div className="flex gap-10">
      {poster_path && (
        <div className="w-[25%]">
          <Image
            className="rounded-md box-shadow__card w-full"
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            width={200}
            height={450}
            alt={title}
          />
        </div>
      )}
      <div className="w-[75%]">
        <h1 className="text-4xl uppercase mb-5">{title}</h1>
        <p>{overview || 'Descrição não encontrada'}</p>
      </div>
    </div>
  );
}
