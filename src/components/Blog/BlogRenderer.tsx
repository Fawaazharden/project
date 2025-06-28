import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '../../lib/sanity';

export interface Post {
  title: string;
  subtitle: string;
  body: any;
  author: { name?: string };
  publishedAt: string;
  readTime: string;
  mainImage?: any;
  categories?: any[];
  [key: string]: any;
}

export default function BlogRenderer({ post }: { post: Post }) {
  const {
    title,
    subtitle,
    body,
    author,
    publishedAt,
    readTime,
    mainImage,
    categories
  } = post;

  // 🎯 This handles ALL your VocalX Labs formatting automatically
  const components: Partial<PortableTextComponents> = {
    block: {
      normal: ({ children }) => <p>{children}</p>,
      h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mb-6">{children}</h1>,
      h2: ({ children }) => <h2 className="section-number">{children}</h2>,
      h3: ({ children }) => <h3>{children}</h3>,
      h4: ({ children }) => <h4>{children}</h4>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-6 bg-blue-50 italic text-gray-700">
          {children}
        </blockquote>
      ),
    },
    
    list: {
      bullet: ({ children }) => <ul className="xai-benefits">{children}</ul>,
      number: ({ children }) => <ol className="benefit-list">{children}</ol>,
    },
    
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      link: ({ value, children }) => (
        <a 
          href={value?.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline transition-colors"
        >
          {children}
        </a>
      ),
    },
    
    types: {
      // 🔥 Key Insight - Automatically renders your template
      keyInsight: ({ value }) => (
        <div className="key-insight">
          <p><strong>Key Insight:</strong> {value.content}</p>
        </div>
      ),
      
      // ⚠ Warning Box - Automatically renders your template
      warningBox: ({ value }) => (
        <div className="warning-box">
          <p><strong>{value.type?.charAt(0).toUpperCase() + value.type?.slice(1)}:</strong> {value.content}</p>
        </div>
      ),
      
      // 📊 Comparison Table - Automatically renders your template
      comparisonTable: ({ value }) => (
        <div className="comparison-table">
          <h4>{value.title}:</h4>
          <table>
            <thead>
              <tr>
                {value.headers?.map((header: string, index: number) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.rows?.map((row: { cells: string[] }, rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.cells?.map((cell: string, cellIndex: number) => (
                    <td key={cellIndex}>
                      {cellIndex === 0 ? <strong>{cell}</strong> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      
      image: ({ value }) => {
        // Check if image has proper asset reference
        if (!value || !value.asset) {
          console.warn('Image missing asset reference:', value);
          return (
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center my-6">
              <div className="text-gray-400 text-4xl mb-2">🖼️</div>
              <p className="text-gray-500 text-sm">
                {value?.alt || 'Image unavailable'}
              </p>
              {value?.caption && (
                <p className="text-gray-400 text-xs mt-1">{value.caption}</p>
              )}
            </div>
          );
        }

        try {
          return (
            <div className="my-6">
              <img
                src={urlFor(value).url()}
                alt={value.alt || ''}
                className="rounded-lg shadow-md max-w-full h-auto"
              />
              {value.caption && (
                <p className="text-sm text-gray-600 mt-2 italic text-center">
                  {value.caption}
                </p>
              )}
            </div>
          );
        } catch (error) {
          console.error('Error rendering image:', error, value);
          return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center my-6">
              <div className="text-red-400 text-3xl mb-2">⚠️</div>
              <p className="text-red-600 text-sm">Failed to load image</p>
              {value?.alt && (
                <p className="text-red-500 text-xs mt-1">{value.alt}</p>
              )}
            </div>
          );
        }
      },
    },
  };

  return (
    <article className="blog-post">
      {/* 📝 SEO Header - Automatically generated */}
      <header className="blog-header">
        <h1>{title}</h1>
        <p className="blog-subtitle">{subtitle}</p>
        
        <div className="blog-meta">
          <span className="author">by {author?.name}</span>
          <span className="read-time">{readTime}</span>
          <span className="publish-date">
            {new Date(publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </header>

      {/* 🎯 Main Content - Automatically converts Sanity to your HTML */}
      <div className="blog-content">
        <PortableText value={body} components={components} />
      </div>
    </article>
  );
} 