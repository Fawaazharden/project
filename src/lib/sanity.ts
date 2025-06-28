import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '0u2n1rlt', // Your project ID from instruction.md
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
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