'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '@/lib/strapi';
import Loading from '@/components/common/Loading';
import { FiFolder } from 'react-icons/fi';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const data = await getCategories();
        console.log('Categories data:', data); // Debug log
        setCategories(data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Categories</h1>
        <p className="text-xl text-gray-600">
          Browse posts by category
        </p>
      </header>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            // Handle both v4 and v5 Strapi formats
            const categoryData = category.attributes || category;
            
            return (
              <Link
                key={category.id}
                href={`/blog/category/${categoryData.slug}`}
                className="card p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FiFolder className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {categoryData.name}
                    </h3>
                    {categoryData.description && (
                      <p className="text-gray-600 text-sm">
                        {categoryData.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No categories found.</p>
        </div>
      )}
    </div>
  );
}