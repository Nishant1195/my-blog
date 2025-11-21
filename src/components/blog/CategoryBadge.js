import Link from 'next/link';

export default function CategoryBadge({ category, size = 'md' }) {
  if (!category) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  return (
    <Link
      href={`/blog/category/${category.slug}`}
      className={`inline-block font-semibold text-primary bg-blue-50 rounded-full hover:bg-blue-100 transition-colors ${sizeClasses[size]}`}
    >
      {category.name}
    </Link>
  );
}