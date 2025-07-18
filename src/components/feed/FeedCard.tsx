import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';

export default function FeedCard() {
  return (
    <div className="flex flex-col gap-4 p-5 border-b-1 border-[#cccccc50]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center text-black pb-3.5 border-b-1 border-[#ffffff4d]">
          <Image
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/84147250?v=4"
            width={50}
            height={50}
            alt="Avatar"
          />
          <p>
            <span className="text-sm font-bold">Guilherme Marques</span> avaliou{' '}
            <strong>Prision break</strong>
          </p>
        </div>
        <time className="text-[#767676]">5h</time>
      </div>
      <div className="flex items-center gap-2">
        <p>Nota:</p>
        <FaStar className="text-amber-300" size={15} />
        <FaStar className="text-amber-300" size={15} />
        <FaStar className="text-amber-300" size={15} />
        <FaStar className="text-amber-300" size={15} />
        <FaStar className="text-amber-300" size={15} />
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          explicabo incidunt at neque consequatur corporis, sit libero a
          dolorem, inventore dolore, aperiam perferendis numquam! Ratione
          accusamus labore ipsum vero! Nesciunt, voluptatibus autem laudantium
          facere iste maxime distinctio praesentium inventore dolorem.
        </p>
      </div>
    </div>
  );
}
