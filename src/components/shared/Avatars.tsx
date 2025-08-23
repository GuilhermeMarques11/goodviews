import Image from 'next/image';

export interface AvatarsProps {
  selectedAvatar: string | null;
  setSelectedAvatar: (avatar: string | null) => void;
}

export default function Avatars({
  selectedAvatar,
  setSelectedAvatar,
}: AvatarsProps) {
  const avatarOptions = [
    '/avatars/batman.png',
    '/avatars/black-panther.png',
    '/avatars/capitain-america.png',
    '/avatars/deadpool.png',
    '/avatars/iroman.png',
    '/avatars/logan.png',
    '/avatars/spiderman.png',
    '/avatars/superman.png',
    '/avatars/thor.png',
    '/avatars/wonder-woman.png',
  ];

  return (
    <>
      <label>Escolha seu avatar:</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {avatarOptions.map((src) => (
          <Image
            key={src}
            src={src}
            alt="Avatar"
            width={50}
            height={50}
            className={`rounde-full cursor-pointer border-4 ${
              selectedAvatar === src ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => setSelectedAvatar(src)}
          />
        ))}
      </div>
    </>
  );
}
