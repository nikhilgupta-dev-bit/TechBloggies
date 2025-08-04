'use client';
import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <Link href={`/post/${post.$id}`}>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-500 mb-1">
          By <span className="font-medium">{post.author}</span> • {post.category}
        </p>

        <p className="text-gray-700 mb-4">
          {post.content?.slice(0, 150)}...
        </p>

        <div className="text-sm text-gray-500">
          {new Date(post.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}