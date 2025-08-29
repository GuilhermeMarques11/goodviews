import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href={'/'}
      className="flex gap-2 items-center text-white pb-3.5 border-b-1 border-[#ffffff4d]"
    >
      <Image
        src="/logo-react-white.svg"
        width={50}
        height={50}
        alt="Logo React"
      />
      <span className="uppercase text-2xl font-black">GoodViews</span>
    </Link>
  );
}
