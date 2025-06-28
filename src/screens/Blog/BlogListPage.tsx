import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../lib/sanity';
import SEO from '../../components/Blog/SEO';

// A basic type for the post list item
interface PostListItem {
  _id: string;
  title: string;
  subtitle: string;
  slug: { current: string };
  publishedAt?: string;
  readTime?: string;
  author?: { name: string };
  categories?: any[];
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SEO title="Blog - VocalX Labs" description="Read the latest articles from the VocalX Labs team." />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              VocalX Labs Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Exploring the future of AI-powered voice technology, web development, and digital innovation
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No posts yet</h3>
            <p className="text-gray-600">Stay tuned for amazing content coming soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Link 
                key={post._id} 
                to={`/blog/${post.slug.current}`}
                className="group block"
              >
                <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
                  {/* Card Header with Gradient */}
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  
                  <div className="p-8">
                    {/* Post Number Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Article #{String(index + 1).padStart(2, '0')}
                      </span>
                      {post.readTime && (
                        <span className="text-sm text-gray-500">
                          {post.readTime}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                      {post.title}
                    </h2>

                    {/* Subtitle/Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {post.subtitle}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        {post.author?.name && (
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {post.author.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {post.author.name}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {post.publishedAt && (
                        <time className="text-sm text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                      )}
                    </div>

                    {/* Read More Arrow */}
                    <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span className="text-sm">Read Article</span>
                      <svg 
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {posts.length > 0 && (
          <div className="mt-20 text-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Get notified when we publish new articles about AI, voice technology, and web development.
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                Subscribe to Updates
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 