'use client';

import { useState, useEffect } from 'react';
import { getPosts } from '@/lib/strapi';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/common/Pagination';
import Loading from '@/components/common/Loading';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const data = await getPosts(currentPage, 9);
        setPosts(data.data || []);
        setTotalPages(data.meta?.pagination?.pageCount || 1);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
        <p className="text-xl text-gray-600">
          Explore our latest articles and insights
        </p>
      </header>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No posts found.</p>
        </div>
      )}
    </div>
  );
}