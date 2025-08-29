'use client';

import Image from 'next/image';
import Button from '@/components/shared/Button';
import StarRating from '@/components/shared/StarRating';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

interface RatingProps {
  id: string;
  mediaType: 'movie' | 'tv';
  media: {
    title: string;
    poster_path: string;
    overview: string;
  };
}

export default function Rating({ id, media, mediaType }: RatingProps) {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasPreviousRating, setHasPreviousRating] = useState(false);

  // Fetch existing rating when component mounts
  useEffect(() => {
    async function fethExistingRating() {
      try {
        const res = await fetch(
          `/api/rating?mediaId=${id}&mediaType=${mediaType}`,
        );
        if (res.ok) {
          const data = await res.json();
          if (data.rating) {
            setScore(data.rating.score);
            setComment(data.rating.comment || '');
            setHasPreviousRating(true);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar avaliação existente:', error);
      }
    }
    fethExistingRating();
  }, [id, mediaType]);

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (score < 1 || score > 10) {
      alert('Por favor, selecione uma nota de 1 a 10 estrelas.');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/rating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mediaId: Number(id),
        mediaType,
        mediaTitle: media.title,
        score,
        comment,
        poster_path: media.poster_path,
        overview: media.overview,
      }),
    });

    if (res.ok) {
      setLoading(false);
      alert('Avaliação enviada com sucesso!');
      router.push('/');
    } else {
      alert('Erro ao enviar avaliação.');
      setLoading(false);
    }
  }

  const buttonLabel = useMemo(() => {
    if (loading && hasPreviousRating) return 'Atualizando...';
    if (loading && !hasPreviousRating) return 'Enviando...';
    if (!loading && hasPreviousRating) return 'Atualizar Avaliação';
    return 'Enviar Avaliação';
  }, [loading, hasPreviousRating]);

  return (
    <div className="container flex flex-col gap-10">
      <div className="flex gap-5">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
          alt={media.title}
          width={70}
          height={100}
          className="w-16 h-auto object-cover"
        />
        <div>
          <h1 className="text-2xl uppercase mb-2">{media.title}</h1>
        </div>
      </div>
      <div className="w-full">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label>Sua nota:</label>
            <StarRating value={score} onChange={setScore} />
          </div>
          <div>
            <label htmlFor="rating-comment">O que você achou?</label>
            <textarea
              name="rating-comment"
              id="rating-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              cols={30}
              rows={10}
              placeholder="Digite sua avaliação (opcional)"
              className="w-full bg-white p-5 mt-2.5"
            ></textarea>
          </div>
          <Button loading={loading}>{buttonLabel}</Button>
        </form>
      </div>
    </div>
  );
}
