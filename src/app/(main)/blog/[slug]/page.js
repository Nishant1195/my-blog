import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug } from '@/lib/strapi';
import { formatDate, calculateReadingTime, getStrapiMedia } from '@/utils/helpers';
import AuthorInfo from '@/components/blog/AuthorInfo';
import CategoryBadge from '@/components/blog/CategoryBadge';
import { FiCalendar, FiClock } from 'react-icons/fi';

export default async function PostPage(props) {
  // Await params in Next.js 15+
  const params = await props.params;
  const { slug } = params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Handle both v4 and v5 formats
  const postData = post.attributes || post;
  const { title, content, coverImage, category, author, published_date } = postData;
  
  // Handle nested or flat image structure
  const imageUrl = getStrapiMedia(
    coverImage?.data?.attributes?.url || 
    coverImage?.url || 
    coverImage?.data?.url
  );

  // Handle nested or flat category/author
  const categoryData = category?.data?.attributes || category;
  const authorData = author?.data?.attributes || author;

  return (
    <article className="py-12">
      <div className="  container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          {categoryData && (
            <div className=" text-gray-900 mb-4">
              <CategoryBadge category={categoryData} />
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>

          <div className="flex items-center space-x-6 text-white mb-6">
            <span className="flex items-center">
              <FiCalendar className="mr-2" size={16} />
              {published_date ? formatDate(published_date) : 'No date'}
            </span>
            <span className="flex items-center">
              <FiClock className="mr-2" size={16} />
              {calculateReadingTime(JSON.stringify(content))}
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {imageUrl && (
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={coverImage?.alternativeText || title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {typeof content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div className="space-y-4">
              {content?.map((block, index) => (
                <p key={index} className="text-gray-800 leading-relaxed">
                  {block.children?.map((child, childIndex) => (
                    <span key={childIndex}>{child.text}</span>
                  ))}
                </p>
              ))}
            </div>
          )}
        </div>
          <div className='text-gray-900'>
        {/* Author Info */}
        {authorData && <AuthorInfo author={authorData} />}
             </div>
      </div>
    </article>
  );
}