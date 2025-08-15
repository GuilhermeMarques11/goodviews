'use client';

import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  image?: string | null;
}

interface Rating {
  id: string;
  mediaTitle: string;
  score: number;
  comment?: string | null;
  createdAt: string;
  user: User;
}

export default function TestFeed() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeed() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/feed');
        if (!res.ok) {
          throw new Error('Não autorizado ou erro na requisição');
        }
        const data = await res.json();
        setRatings(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, []);

  if (loading) return <p>Carregando avaliações...</p>;
  if (error) return <p style={{ color: 'red' }}>Erro: {error}</p>;
  if (ratings.length === 0) return <p>Nenhuma avaliação encontrada</p>;

  return (
    <ul>
      {ratings.map((rating) => (
        <li key={rating.id}>
          <strong>{rating.user.name}:</strong> {rating.mediaTitle} -{' '}
          {rating.score} ⭐️
          {rating.comment && <p>Comentário: {rating.comment}</p>}
          <small>
            Criado em: {new Date(rating.createdAt).toLocaleDateString()}
          </small>
        </li>
      ))}
    </ul>
  );
}
