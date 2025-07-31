import Link from 'next/link';
import Image from 'next/image';

export default function PostCard({ post }) {
  return (
    <div className="bg-fuchsia-400  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.image_url && (
        <div className="relative h-48 w-full">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <Link href={`/post/${post.$id}`}>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4">
          {post.content.substring(0, 150)}...
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>By {post.author}</span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
