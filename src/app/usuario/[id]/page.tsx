import FeedServerPage from '@/components/feed/FeedServerPage';

async function fetchRatingsByUserId(id: string) {
  const res = await fetch(`http://localhost:3000/api/rating/user/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar avaliações do usuário');
  }

  const data = await res.json();

  return data;
}

interface UserPageProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const fetchRatingsFn = () => fetchRatingsByUserId(params.id);
  return <FeedServerPage fetchRatingsFn={fetchRatingsFn} />;
}
