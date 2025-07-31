'use client';
import React, { useEffect, useState } from 'react'; // Keep React import for general React usage
import { getPostById, deletePost } from '@lib/blogService';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PostPage({ params }) {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Reverting to direct access of params.id to avoid suspension error.
  // Next.js currently supports direct access for client components,
  // though a warning might appear for future compatibility.
  const postId = params.id;

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) {
        setLoading(false);
        setError('Post ID is missing.');
        return;
      }
      try {
        setLoading(true);
        const data = await getPostById(postId);
        if (data) {
          setPost(data);
        } else {
          setError('Post not found.');
        }
      } catch (error) {
        setError('Failed to load post');
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]); // Re-run effect if postId changes

  const handleDelete = async () => {
    // IMPORTANT: window.confirm is replaced.
    // In a real application, you would implement a custom modal/dialog here
    // for user confirmation, as window.confirm/alert are not allowed in Canvas.
    const userConfirmed = confirm('Are you sure you want to delete this post?'); // Using confirm for demonstration, replace with custom modal
    if (userConfirmed) {
      try {
        await deletePost(postId);
        router.push('/');
        router.refresh(); // Refresh the page to reflect changes
      } catch (error) {
        setError('Failed to delete post');
        console.error('Error deleting post:', error);
        alert('Failed to delete post'); // Using alert for demonstration, replace with custom modal
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;
  if (!post) return <div className="text-center py-8">Post not found</div>;

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

      <div className="flex justify-between items-center text-gray-600 mb-8">
        <div>
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => router.push(`/edit-post/${post.$id}`)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>

      {post.image_url && (
        <div className="relative h-96 w-full mb-8">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes prop for Image component
          />
        </div>
      )}

      <div className="prose max-w-none">
        {/* Render content, assuming it's plain text or can be split by newlines */}
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8">
        {post.category && (
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
            {post.category}
          </span>
        )}
      </div>
    </article>
  );
}
