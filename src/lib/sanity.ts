import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'phcyc64u', // Your new Sanity project ID for personalized landing pages
  dataset: 'production',
  useCdn: true, // Use CDN for reads (fast)
  apiVersion: '2023-05-03',
  token: (import.meta as any).env?.VITE_SANITY_API_TOKEN, // API token for write operations
  ignoreBrowserTokenWarning: true, // Only use token for admin operations
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// Fetch all blog posts
export async function getAllPosts() {
  return client.fetch(`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
      _id,
      title,
      subtitle,
      slug,
      publishedAt,
      readTime,
      seoKeywords,
      mainImage {
        asset->,
        alt,
        caption
      },
      author->{
        name,
        slug,
        image {
          asset->,
          alt
        }
      },
      categories[]->{
        _id,
        title,
        slug
      },
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      }
    }
  `);
}

// Fetch single post by slug
export async function getPostBySlug(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      subtitle,
      slug,
      publishedAt,
      readTime,
      seoKeywords,
      mainImage {
        asset->,
        alt,
        caption
      },
      author->{
        name,
        slug,
        image {
          asset->,
          alt
        },
        bio
      },
      categories[]->{
        _id,
        title,
        slug,
        description
      },
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      }
    }
  `, { slug });
}

// Fetch personalized page by slug
export async function getPersonalizedPageBySlug(slug: string) {
  return client.fetch(`
    *[_type == "personalizedPage" && slug.current == $slug][0] {
      _id,
      businessName,
      slug,
      youtubeUrl,
      createdAt
    }
  `, { slug });
}

// Fetch all personalized pages (for admin)
export async function getAllPersonalizedPages() {
  return client.fetch(`
    *[_type == "personalizedPage"] | order(createdAt desc) {
      _id,
      businessName,
      slug,
      youtubeUrl,
      createdAt
    }
  `);
}

// Create a new personalized page
export async function createPersonalizedPage(businessName: string, youtubeUrl: string) {
  const slug = businessName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '');
  
  return client.create({
    _type: 'personalizedPage',
    businessName,
    slug: {
      _type: 'slug',
      current: slug
    },
    youtubeUrl,
    createdAt: new Date().toISOString()
  });
}

// Extract YouTube video ID from various URL formats
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
} 