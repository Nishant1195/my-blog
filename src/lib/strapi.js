import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Helper function to make requests to Strapi
 */
async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${STRAPI_URL}/api${path}${
      queryString ? `?${queryString}` : ''
    }`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Get all blog posts with pagination
 */
export async function getPosts(page = 1, pageSize = 10) {
  const urlParamsObject = {
    sort: ['published_date:desc'],
    populate: '*',
    pagination: {
      page,
      pageSize,
    },
  };

  return await fetchAPI('/posts', urlParamsObject);
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug) {
  const urlParamsObject = {
    filters: { slug: { $eq: slug } },
    populate: '*',
  };

  const response = await fetchAPI('/posts', urlParamsObject);
  return response.data?.[0] || null;
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(categorySlug, page = 1, pageSize = 9) {
  const urlParamsObject = {
    filters: {
      category: {
        slug: { $eq: categorySlug },
      },
    },
    sort: ['published_date:desc'],
    populate: '*',
    pagination: {
      page,
      pageSize,
    },
  };

  return await fetchAPI('/posts', urlParamsObject);
}

/**
 * Get all categories
 */
export async function getCategories() {
  const urlParamsObject = {
    sort: ['name:asc'],
    populate: '*',
  };

  return await fetchAPI('/categories', urlParamsObject);
}

/**
 * Search posts by title or content
 */
export async function searchPosts(query, page = 1, pageSize = 10) {
  const urlParamsObject = {
    filters: {
      $or: [
        { title: { $containsi: query } },
        { excerpt: { $containsi: query } },
      ],
    },
    sort: ['published_date:desc'],
    populate: '*',
    pagination: {
      page,
      pageSize,
    },
  };

  return await fetchAPI('/posts', urlParamsObject);
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(limit = 3) {
  const urlParamsObject = {
    filters: {
      featured: { $eq: true },
    },
    sort: ['published_date:desc'],
    populate: '*',
    pagination: {
      pageSize: limit,
    },
  };

  return await fetchAPI('/posts', urlParamsObject);
}