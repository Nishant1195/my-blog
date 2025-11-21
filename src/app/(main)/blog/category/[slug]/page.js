'use client';

import { useState, useEffect } from 'react';
import { getPostsByCategory } from '@/lib/strapi';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/common/Pagination';
import Loading from '@/components/common/Loading';

export default function CategoryPage(props) {
  const [slug, setSlug] = useState(null);
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Extract slug from params
  useEffect(() => {
    async function getSlug() {
      const params = await props.params;
      setSlug(params.slug);
    }
    getSlug();
  }, [props.params]);

  useEffect(() => {
    if (!slug) return;

    async function fetchPosts() {
      setLoading(true);
      try {
        const data = await getPostsByCategory(slug, currentPage, 9);
        setPosts(data.data || []);
        setTotalPages(data.meta?.pagination?.pageCount || 1);
        
        if (data.data && data.data.length > 0) {
          const firstPost = data.data[0];
          const postData = firstPost.attributes || firstPost;
          const categoryData = postData.category?.data?.attributes || postData.category;
          setCategory(categoryData);
        }
      } catch (error) {
        console.error('Error fetching category posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [slug, currentPage]);

  if (loading || !slug) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {category?.name || 'Category'}
        </h1>
        {category?.description && (
          <p className="text-xl text-gray-600">{category.description}</p>
        )}
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
          <p className="text-gray-600 text-lg">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
}