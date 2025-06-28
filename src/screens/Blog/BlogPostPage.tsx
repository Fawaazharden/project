import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../../lib/sanity';
import BlogRenderer, { Post } from '../../components/Blog/BlogRenderer';
import SEO from '../../components/Blog/SEO';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('No article slug provided');
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const data = await getPostBySlug(slug);
        
        if (data) {
          setPost(data);
        } else {
          setError('Post not found.');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to fetch post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </nav>

        {/* Loading Content */}
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading Article</h2>
            <p className="text-gray-600">Preparing your reading experience...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
        {/* Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </nav>

        {/* Error Content */}
        <div className="flex items-center justify-center py-32">
          <div className="text-center max-w-md">
            <div className="text-red-500 text-8xl mb-6">📄</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
            <div className="space-y-4">
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse All Articles
              </Link>
              <p className="text-sm text-gray-500">
                The article you're looking for might have been moved or doesn't exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </nav>

        {/* Not Found Content */}
        <div className="flex items-center justify-center py-32">
          <div className="text-center max-w-md">
            <div className="text-gray-400 text-8xl mb-6">🔍</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Content Available</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We couldn't find any content for this article.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Other Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SEO 
        title={`${post.title} - VocalX Labs Blog`}
        description={post.subtitle}
        keywords={post.seoKeywords}
        publishedTime={post.publishedAt}
        author={post.author?.name}
      />

      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            {/* Share Buttons */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Share:</span>
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Copy link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <BlogRenderer post={post} />
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-gray-600 mb-6">
              Explore more insights on AI, voice technology, and web development.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Read More Articles
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 