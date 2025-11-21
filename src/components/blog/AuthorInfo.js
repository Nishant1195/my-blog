import Image from 'next/image';
import { getStrapiMedia } from '@/utils/helpers';

export default function AuthorInfo({ author }) {
  if (!author) return null;

  const { name, bio, avatar } = author;
  const avatarUrl = getStrapiMedia(avatar?.data?.attributes?.url);

  return (
    <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
            {name.charAt(0)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h4 className="text-lg font-semibold mb-1">Written by {name}</h4>
        {bio && <p className="text-gray-600 text-sm">{bio}</p>}
      </div>
    </div>
  );
}