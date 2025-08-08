import { FaStar } from 'react-icons/fa6';

interface StarDisplayProps {
  value: number;
}

export default function StarDisplay({ value }: StarDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: 10 }, (_, i) => {
          const starValue = i + 1;
          return (
            <FaStar
              key={starValue}
              className="w-4 h-4"
              fill={starValue <= value ? '#facc15' : '#d6d6d6'}
            />
          );
        })}
        <span className="ml-2 text-gray-600">{value}/10</span>
      </div>
    </div>
  );
}
