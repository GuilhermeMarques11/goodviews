export default function Form() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold">
          Nome
        </label>
        <input
          type="text"
          id="name"
          placeholder="Digite seu nome"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Cadastrar
      </button>
    </form>
  );
}
