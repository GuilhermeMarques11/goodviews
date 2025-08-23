export default function Footer() {
  return (
    <footer className="text-center pt-3.5 pb-2 border-t-1 border-t-[#e7e7e7]">
      <p className="text-black text-sm">
        &copy;{new Date().getFullYear()} GoodViews | Powered by{' '}
        <a
          href="https://github.com/GuilhermeMarques11"
          target="_blank"
          className="hover:underline"
        >
          Guilherme Marques
        </a>
      </p>
    </footer>
  );
}
