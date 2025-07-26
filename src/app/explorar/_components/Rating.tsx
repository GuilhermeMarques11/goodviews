'use client';

import Image from 'next/image';
import Button from '@/components/shared/Button';
import StarRating from '@/components/shared/StarRating';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RatingProps {
  id: string;
  media: {
    title: string;
    poster_path: string;
  };
}

export default function Rating({ id, media }: RatingProps) {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (score < 1 || score > 5) {
      alert('Por favor, selecione uma nota de 1 a 5 estrelas.');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/rating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mediaId: Number(id),
        mediaType: 'movie',
        mediaTitle: media.title,
        score,
        comment,
      }),
    });

    if (res.ok) {
      setLoading(false);
      alert('Avaliação enviada com sucesso!');
      router.push('/');
    } else {
      alert('Erro ao enviar avaliação.');
    }
  }

  return (
    <div className="flex flex-col gap-10">
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
          <Button loading={loading}>
            {loading ? 'Publicando' : 'Publicar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
