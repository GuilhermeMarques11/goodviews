import { getMediaVideos } from '@/utils/tmdb/getMediaVideos';
interface TrailerProps {
  id: string;
  type: 'movie' | 'tv';
}

interface Videos {
  key: string;
  name: string;
}

export default async function Trailer({ id, type }: TrailerProps) {
  const videos = await getMediaVideos(type, id);

  if (!videos || !videos.results || videos.results.length === 0) {
    return null;
  }

  return (
    <div className="pt-16 px-5">
      <h2 className="text-2xl font-bold">Vídeos</h2>
      <div className="flex gap-7 overflow-x-auto py-4">
        {videos.results.map((video: Videos) => (
          <div key={video.key} className="aspect-video py-4">
            <iframe
              className="w-auto h-[200px] lg:w-[533px] lg:h-[300px] rounded-md"
              src={`https://www.youtube.com/embed/${video.key}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  );
}
