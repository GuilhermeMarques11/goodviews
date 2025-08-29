import { getMediaCredits } from '@/utils/tmdb/getMediaCredits';
import Image from 'next/image';

interface CastProps {
  id: string;
  type: 'movie' | 'tv';
}

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export default async function Cast({ id, type }: CastProps) {
  const cast = await getMediaCredits(type, id);
  return (
    <div className="pt-16 px-5">
      <div className="">
        <h2 className="text-2xl font-bold">Elenco</h2>
      </div>
      <div className="flex gap-7 overflow-x-auto py-4">
        {cast.cast.map((actor: Actor) => (
          <div key={actor.id} className="flex-shrink-0 text-center">
            {actor.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
                width={128}
                height={192}
                className="rounded-md"
              />
            ) : (
              <div className="w-32 h-48 bg-gray-700 rounded-md flex items-center justify-center">
                Sem imagem
              </div>
            )}
            <p className="mt-2 text-sm font-bold">{actor.name}</p>
            <p className="text-sm font-medium text-gray-500">
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
