interface ButtonProps {
  children: string;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
    >
      {children}
    </button>
  );
}
