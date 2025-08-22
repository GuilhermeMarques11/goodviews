'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  query = '',
}: PaginationProps) {
  const pathname = usePathname();

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12 gap-2 flex-wrap">
      {currentPage > 1 && (
        <Link
          href={`${pathname}?page=${currentPage - 1}`}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Anterior
        </Link>
      )}

      {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
        const page = i + 1;
        return (
          <Link
            key={page}
            href={`${pathname}?page=${page}${query ? `&query=${query}` : ''}`}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={`${pathname}?page=${currentPage + 1}`}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Próximo
        </Link>
      )}
    </div>
  );
}
