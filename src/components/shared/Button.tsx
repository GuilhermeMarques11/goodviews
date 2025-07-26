import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

export default function Button({
  children,
  loading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      type="submit"
      className={`bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap2`}
    >
      {children}
      {loading && <Spinner />}
    </button>
  );
}
