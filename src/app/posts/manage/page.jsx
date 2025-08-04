"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Added Link import
import { getAllPosts, deletePost } from '../../lib/blogService';

export default function ManagePostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    loadPosts();
  }, [user]); // Added user to dependency array to reload posts when user data is available

  const loadPosts = async () => {
    setLoading(true);
    try {
      const result = await getAllPosts();
      // Filter posts by the current user if needed
      // Ensure user is loaded before filtering
      if (user?.fullName) {
        const userPosts = result.posts.filter(post => post.author === user.fullName);
        setPosts(userPosts);
      } else {
        // If user is not yet loaded, set posts to empty or handle accordingly
        setPosts([]);
      }
    } catch (error) {
      setError('Failed to load posts');
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    // Replaced window.confirm with a custom modal or message box for better UX
    // For this example, I'll keep the basic logic but note the improvement needed.
    if (!confirm('Are you sure you want to delete this post?')) return; // Using confirm for brevity, but a custom modal is recommended

    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post.$id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      // Replaced alert with a custom message box for better UX
      // For this example, I'll keep the basic logic but note the improvement needed.
      alert('Failed to delete post'); // Using alert for brevity, but a custom modal is recommended
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white-800">Manage Your Posts</h1>
        <Link
          href="/posts/create"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Post
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.length > 0 ? (
              posts.map(post => (
                <tr key={post.$id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/post/${post.$id}`} className="text-blue-600 hover:text-blue-800">
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => router.push(`/edit-post/${post.$id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.$id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No posts found. Create your first post!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
