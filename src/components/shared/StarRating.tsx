import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="text-yellow-400"
          >
            <FaStar
              fill={starValue <= (hover || value) ? '#facc15' : '#d6d6d6'}
              stroke="#facc15"
              className="w-6 h-6"
            />
          </button>
        );
      })}
    </div>
  );
}
