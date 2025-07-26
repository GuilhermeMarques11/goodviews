import { FaMagnifyingGlass } from 'react-icons/fa6';
export default function SearchForm() {
  return (
    <div className="flex items-center">
      <input
        className="border-b-1 border-gray-300 focus:outline-none focus:border-blue-500 p-2 rounded-md"
        type="search"
        name=""
        id=""
        placeholder="Pesquisar filmes ou séries"
      />
      <button className="flex flex-col items-center bg-white p-2 rounded-full box-shadow__card ">
        <FaMagnifyingGlass size={15} />
      </button>
    </div>
  );
}
