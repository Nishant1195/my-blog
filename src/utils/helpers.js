/**
 * Format date to readable string
 */
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Calculate reading time based on content length
 */
export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Get Strapi media URL
 */
export function getStrapiMedia(url) {
  if (!url) return null;
  
  // Return full URL if it's already absolute
  if (url.startsWith('http')) return url;
  
  // Otherwise prepend Strapi URL
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${strapiUrl}${url}`;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}