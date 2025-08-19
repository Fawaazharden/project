import fs from 'fs';
import { createClient } from '@sanity/client';
import { globby } from 'globby';
import prettier from 'prettier';

const client = createClient({
  projectId: '0u2n1rlt',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-27',
});

async function getAllPosts() {
  const query = `*[_type == "post"] {
    "slug": slug.current,
    "updatedAt": _updatedAt
  }`;
  try {
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error);
    return [];
  }
}

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = [
    '/',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/blog',
  ];

  const blogPosts = await getAllPosts();

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page.replace('index', '');
          return `
            <url>
              <loc>${`https://vocalxlabs.com${path}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
            </url>
          `;
        })
        .join('')}
      ${blogPosts
        .map(({ slug, updatedAt }) => {
          return `
            <url>
              <loc>${`https://vocalxlabs.com/blog/${slug}`}</loc>
              <lastmod>${new Date(updatedAt).toISOString()}</lastmod>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted);
}

generateSitemap();
