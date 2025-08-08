import Image from 'next/image';

export default function EmptyFeed({ message }: { message?: string }) {
  return (
    <div className="w-full flex flex-col items-center">
      <Image
        src={'/sad-face-in-rounded-square.png'}
        width={200}
        height={200}
        alt="Sad Face in rounded square"
        className="w-[100px] h-auto max-w-full"
      />
      <p className="mt-5 text-[#0000008c]">
        {message || 'Nenhuma avaliação encontrada.'}
      </p>
    </div>
  );
}
