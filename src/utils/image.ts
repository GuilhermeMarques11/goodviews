export function getImageUrl(path: string, size = 'w500') {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
