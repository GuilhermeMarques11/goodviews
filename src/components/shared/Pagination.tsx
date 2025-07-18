import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  return (
    <div className="flex justify-center mt-12 gap-2 flex-wrap">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
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
            href={`${basePath}?page=${page}`}
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
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Próximo
        </Link>
      )}
    </div>
  );
}
