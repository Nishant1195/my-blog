import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import { formatDate, calculateReadingTime, getStrapiMedia } from '@/utils/helpers';

export default function BlogCard({ post }) {
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
    <article className="card group">
      {/* Cover Image */}
      <Link href={`/blog/${slug}`} className="block relative h-48 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={coverImage?.alternativeText || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">{title?.charAt(0)}</span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-6">
        {/* Category Badge */}
        {category && (
          <Link
            href={`/blog/category/${category.slug}`}
            className="inline-block px-3 py-1 text-xs font-semibold text-primary text-white bg-gray-700 rounded-full hover:bg-white hover:text-gray-700 transition-colors mb-3"
          >
            {category.name}
          </Link>
        )}

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <FiCalendar className="mr-1" size={14} />
              {published_date ? formatDate(published_date) : 'No date'}
            </span>
            <span className="flex items-center">
              <FiClock className="mr-1" size={14} />
              {calculateReadingTime(JSON.stringify(content) || '')}
            </span>
          </div>

          <Link
            href={`/blog/${slug}`}
            className="flex items-center text-primary font-semibold hover:gap-2 transition-all"
          >
            Read More
            <FiArrowRight className="ml-1" size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}