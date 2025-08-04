'use client';
import React, { useState, useEffect } from 'react';
import { getPostById } from '../../lib/blogService';

export default function PostPage({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const postData = await getPostById(params.id);
        if (postData && !postData.error) {
          setPost(postData);
        } else {
          setError(postData?.message || 'Post not found.');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Something went wrong while fetching the post.');
      } finally {
        setLoading(false);
      }
    }

    if (params?.id) {
      fetchPost();
    } else {
      setError('No post ID provided.');
      setLoading(false);
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
        <p className="mt-4 text-gray-600">Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-600">{error || 'The post you are looking for does not exist.'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="font-medium">By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
            {post.category && (
              <>
                <span className="mx-2">•</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {post.category}
                </span>
              </>
            )}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="text-gray-800 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
}
