import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { formatDate, calculateReadingTime, getStrapiMedia } from '@/utils/helpers';

export default function FeaturedPost({ post }) {
  // Handle both Strapi v4 and v5 formats
  const postData = post.attributes || post;
  
  if (!postData) {
    console.error('Invalid post data:', post);
    return null;
  }

  const { title, slug, excerpt, coverImage, category, published_date, content } = postData;
  
  // Handle nested or flat image structure
  const imageUrl = getStrapiMedia(
    coverImage?.data?.attributes?.url || 
    coverImage?.url || 
    coverImage?.data?.url
  );

  return (
    <article className="relative overflow-hidden rounded-xl shadow-xl group">
      {/* Background Image */}
      <div className="relative h-[500px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={coverImage?.alternativeText || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
            <span className="text-white text-6xl font-bold">{title?.charAt(0)}</span>
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        {/* Category Badge */}
        {category && (
          <Link
            href={`/blog/category/${category.slug}`}
            className="inline-block px-4 py-2 text-sm font-semibold bg-primary rounded-full hover:bg-blue-600 transition-colors mb-4"
          >
            {category.name}
          </Link>
        )}

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h2 className="text-4xl font-bold mb-4 hover:text-blue-300 transition-colors">
            {title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-lg mb-6 text-gray-200 line-clamp-2">{excerpt}</p>

        {/* Meta Info */}
        <div className="flex items-center space-x-6 text-sm text-gray-300">
          <span className="flex items-center">
            <FiCalendar className="mr-2" size={16} />
            {published_date ? formatDate(published_date) : 'No date'}
          </span>
          <span className="flex items-center">
            <FiClock className="mr-2" size={16} />
            {calculateReadingTime(JSON.stringify(content) || '')}
          </span>
        </div>
      </div>
    </article>
  );
}