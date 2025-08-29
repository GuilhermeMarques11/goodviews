import { getMediaById } from '@/utils/tmdb/getMediaById';
import Image from 'next/image';
import RatingButton from '../../_components/RatingButton';
import { getMediaImages } from '@/utils/tmdb/getMediaImages';
import Cast from '../../_components/Cast';
import Trailer from '../../_components/Trailer';

interface MoviePageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: MoviePageParams) {
  const { id } = await params;
  const { title, poster_path, overview, genres, release_date, runtime } =
    await getMediaById('movie', id);
  const backdrop = await getMediaImages('movie', id);

  return (
    <>
      <div
        className="bg-cover"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${backdrop.file_path})`,
        }}
      >
        <div
          className="flex gap-10 py-7.5 px-10"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(20, 20, 20, 1) calc((50vw - 170px) - 340px), rgba(20, 20, 20, 0.85) 50%, rgba(20, 20, 20, 0.85) 100%)',
          }}
        >
          {poster_path && (
            <div className="w-[25%] text-center">
              <Image
                className="rounded-md box-shadow__card w-full mb-5"
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                width={200}
                height={450}
                alt={title}
              />
              <div className="flex flex-">
                <RatingButton id={id} />
              </div>
            </div>
          )}
          <div className="w-[75%] text-white flex flex-col gap-5">
            <div>
              <h1 className="text-4xl uppercase">
                {title} <span>({new Date(release_date).getFullYear()})</span>
              </h1>
              <div className="flex items-center gap-3">
                <p>
                  {genres
                    .map((g: { id: number; name: string }) => g.name)
                    .join(', ')}
                </p>
                - {runtime && <p>{runtime} min</p>}
              </div>
            </div>
            <p>{overview || 'Descrição não encontrada'}</p>
          </div>
        </div>
      </div>
      <Trailer id={id} type="movie" />
      <Cast id={id} type="movie" />
    </>
  );
}
