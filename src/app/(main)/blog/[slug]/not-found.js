import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Post Not Found</h2>
      <p className="text-gray-600 mb-8">
        Sorry, the post you're looking for doesn't exist.
      </p>
      <Link href="/blog" className="btn-primary">
        Back to Blog
      </Link>
    </div>
  );
}