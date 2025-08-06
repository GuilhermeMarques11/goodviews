'use client';

import MediaCard from '@/app/explorar/_components/MediaCard';
import { MediaItem } from '@/types/mediaItem';

interface MediaListProps {
  results: MediaItem[];
}

export default function MediaList({ results }: MediaListProps) {
  return (
    <div className="relative w-full h-full">
      <div className="grid grid-cols-4 gap-2.5">
        {results.map((media: MediaItem) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </div>
    </div>
  );
}
