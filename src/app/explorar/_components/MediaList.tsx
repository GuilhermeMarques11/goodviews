'use client';

import MediaCard from '@/app/explorar/_components/MediaCard';
import { MediaItem } from '@/types/mediaItem';

interface MediaListProps {
  results: MediaItem[];
}

export default function MediaList({ results }: MediaListProps) {
  return (
    <div className="relative w-full">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {results.map((media: MediaItem) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </div>
    </div>
  );
}
