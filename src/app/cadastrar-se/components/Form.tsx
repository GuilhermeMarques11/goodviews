import Input from './Input';

export default function Form() {
  return (
    <form className="flex flex-col gap-4">
      <Input id="name" type="text" label="Nome" placeholder="Digite seu nome" />
      <Input
        id="email"
        type="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
      />
      <Input
        id="password"
        type="password"
        label="Senha"
        placeholder="Digite uma senha"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Cadastrar
      </button>
    </form>
  );
}
