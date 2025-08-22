'use client';
import { FaMagnifyingGlass } from 'react-icons/fa6';

interface SearchFormProps {
  defaultQuery?: string;
  placeholder?: string;
}

export default function SearchForm({
  defaultQuery = '',
  placeholder = 'Pesquisar...',
}: SearchFormProps) {
  return (
    <form method="GET" className="flex justify-center items-center pb-14">
      <input
        className="border-b-1 border-gray-300 focus:outline-none focus:border-blue-500 p-2 rounded-md w-full"
        type="search"
        name="query"
        defaultValue={defaultQuery}
        placeholder={placeholder}
      />
      <button
        className="flex flex-col items-center bg-white p-2 rounded-full box-shadow__card cursor-pointer"
        type="submit"
      >
        <FaMagnifyingGlass size={15} />
      </button>
    </form>
  );
}
