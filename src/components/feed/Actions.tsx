'use client';

import { CiMenuKebab } from 'react-icons/ci';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface ActionsProps {
  mediaType: string;
  mediaId: number;
  ratingId: string;
  onDelete: (ratingId: string) => void;
}

export default function Actions({
  mediaType,
  mediaId,
  ratingId,
  onDelete,
}: ActionsProps) {
  const [showActions, setShowActions] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowActions(!showActions);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if the click is outside the actions menu and button
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    };

    // Add event listener only if actions are shown
    if (showActions) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showActions]);

  const handleDelete = async () => {
    const confirmed = confirm('Tem certeza que deseja deletar esta avaliação?');
    if (!confirmed) {
      setShowActions(false);
    }

    const res = await fetch(`/api/rating/${ratingId}`, { method: 'DELETE' });
    if (res.ok) {
      onDelete(ratingId);
    }
  };

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        className="hover:bg-[#c8c8c833] transition-colors duration-200 p-2 rounded-full"
      >
        <CiMenuKebab
          size={20}
          onClick={handleClick}
          className="cursor-pointer"
        />
      </div>
      {showActions && (
        <div
          ref={actionsRef}
          className="absolute right-0 top-10 bg-white shadow-lg rounded-md py-4 px-2 z-10 flex flex-col gap-4"
        >
          <Link
            className="hover:bg-[#c8c8c833] transition-colors duration-200 rounded-md py-1 px-5 cursor-pointer"
            href={`/explorar/${
              mediaType === 'movie' ? 'filmes' : 'series'
            }/${mediaId}/avaliar`}
          >
            Editar
          </Link>
          <button
            className="hover:bg-[#c8c8c833] transition-colors duration-200 rounded-md py-1 px-5 cursor-pointer"
            onClick={handleDelete}
          >
            Deletar
          </button>
        </div>
      )}
    </div>
  );
}
