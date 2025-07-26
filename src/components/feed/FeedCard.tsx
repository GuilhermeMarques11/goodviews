import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';

export default function FeedCard() {
  return (
    <div className="flex flex-col gap-4 p-5 border-b-1 border-[#cccccc50]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center text-black pb-3.5 border-b-1 border-[#ffffff4d]">
          <Image
            className="rounded-full"
            src="/user.png"
            width={50}
            height={50}
            alt="Avatar"
          />
          <p>
            <span className="text-sm font-bold">Guilherme Marques</span> avaliou{' '}
            <strong>Pecadores</strong>
          </p>
        </div>
        <time className="text-[#767676]">5h</time>
      </div>
      <div className="flex items-center gap-2">
        <p>Avaliação:</p>
        <FaStar className="text-[#fa604a]" size={15} />
        <FaStar className="text-[#fa604a]" size={15} />
        <FaStar className="text-[#fa604a]" size={15} />
        <FaStar className="text-[#fa604a]" size={15} />
        <FaStar className="text-[#fa604a]" size={15} />
      </div>
      <div>
        <p className="text-[#737373]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          explicabo incidunt at neque consequatur corporis, sit libero a
          dolorem, inventore dolore, aperiam perferendis numquam!
        </p>
      </div>
      <div className="flex items-center border-1 border-[#d8d8d8] p-4 gap-2">
        <Image
          className="max-w-[120px]"
          src="/pecadores.webp"
          width={200}
          height={300}
          alt="Avatar"
        />
        <div>
          <h4 className="text-2xl font-bold mb-2.5">Pecadores</h4>
          <p className="text-[#737373]">
            Dispostos a deixar suas vidas conturbadas para trás, irmãos gêmeos
            retornam à sua cidade natal para recomeçar suas vidas do zero,
            quando descobrem que um mal ainda maior está à espera deles para
            recebê-los de volta.
          </p>
        </div>
      </div>
    </div>
  );
}
