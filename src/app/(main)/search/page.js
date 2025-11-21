'use client';

import { useState } from 'react';
import { searchPosts } from '@/lib/strapi';
import BlogCard from '@/components/blog/BlogCard';
import { FiSearch } from 'react-icons/fi';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const data = await searchPosts(query);
      setResults(data.data || []);
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Search Articles</h1>
        
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for articles..."
            className="w-full px-6 py-4 pr-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>
        </form>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching...</p>
        </div>
      )}

      {!loading && searched && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {results.length > 0
              ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
              : `No results found for "${query}"`}
          </h2>

          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}

      {!searched && !loading && (
        <div className="text-center py-12 text-gray-600">
          <FiSearch size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-lg">Enter a search term to find articles</p>
        </div>
      )}
    </div>
  );
}