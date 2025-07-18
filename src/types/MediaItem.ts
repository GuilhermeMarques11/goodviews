export interface MediaItem {
  id: number;
  title: string;
  releaseDate?: string;
  poster_path: string;
  media_type: 'movie' | 'tv';
}

export interface RawMovie {
  id: number;
  title: string;
  release_date?: string;
  poster_path: string;
}

export interface RawTvShow {
  id: number;
  name: string;
  first_air_date?: string;
  poster_path: string;
}

type RawMedia = RawMovie | RawTvShow;

export default function transformToMediaItem(
  item: RawMedia,
  type: 'movie' | 'tv',
): MediaItem {
  if (type === 'movie') {
    const movie = item as RawMovie;
    return {
      id: movie.id,
      title: movie.title,
      releaseDate: movie.release_date,
      poster_path: movie.poster_path,
      media_type: 'movie',
    };
  } else {
    const tv = item as RawTvShow;
    return {
      id: tv.id,
      title: tv.name,
      releaseDate: tv.first_air_date,
      poster_path: tv.poster_path,
      media_type: 'tv',
    };
  }
}
