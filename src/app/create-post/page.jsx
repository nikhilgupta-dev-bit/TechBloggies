'use client';
import PostForm from '../components/PostForm';

export default function CreatePost() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Post</h1>
      <PostForm />
    </div>
  );
}
