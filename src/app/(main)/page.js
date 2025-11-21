import Link from 'next/link';
import { getFeaturedPosts, getPosts } from '@/lib/strapi';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogCard from '@/components/blog/BlogCard';
import { FiArrowRight } from 'react-icons/fi';

export default async function HomePage() {
  let featuredPosts = [];
  let recentPosts = [];

  try {
    const featuredData = await getFeaturedPosts(1);
    featuredPosts = featuredData.data || [];

    const recentData = await getPosts(1, 6);
    recentPosts = recentData.data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div>
      {/* Hero Section */}
   <section className="bg-linear-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to MyBlog
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <Link href="/blog" className="inline-flex items-center text-gray-700 bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Reading
            <FiArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPosts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Featured Post</h2>
          <FeaturedPost post={featuredPosts[0]} />
        </section>
      )}

      {/* Recent Posts */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Recent Posts</h2>
          <Link href="/blog" className="text-primary font-semibold hover:underline flex items-center">
            View All
            <FiArrowRight className="ml-1" size={18} />
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No posts available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-gray-700 text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest articles delivered straight to your inbox.
          </p>
          <Link href="/contact" className="text-gray-700 btn-primary inline-block">
            Subscribe Now
          </Link>
        </div>
      </section>
    </div>
  );
}