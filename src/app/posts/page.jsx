'use client';
import React, { useState, useEffect } from 'react';
import { getAllPosts, getPostsByCategory, getPostsByAuthor } from '../lib/blogService';
import PostCard from '../components/PostCard';
export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'category', 'author'
  const [filterValue, setFilterValue] = useState('');
  
  useEffect(() => {
    loadPosts();
  }, [filterType, filterValue]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      let data;
      if (filterType === 'category' && filterValue) {
        data = await getPostsByCategory(filterValue);
      } else if (filterType === 'author' && filterValue) {
        data = await getPostsByAuthor(filterValue);
      } else {
        const result = await getAllPosts();
        data = result.posts;
      }
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };
const filteredPosts = posts.filter(post => {
  const term = searchTerm?.toLowerCase() || '';
  return (
    post?.title?.toLowerCase().includes(term) ||
    post?.author?.toLowerCase().includes(term) ||
    post?.category?.toLowerCase().includes(term)
  );
});


  const categories = [...new Set(posts.map(post => post.category))];
  const authors = [...new Set(posts.map(post => post.author))];

  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">All Posts</h1>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search posts..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setFilterValue('');
            }}
          >
            <option value="all">All Posts</option>
            <option value="category">Filter by Category</option>
            <option value="author">Filter by Author</option>
          </select>

          {filterType === 'category' && (
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          )}

          {filterType === 'author' && (
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="">Select Author</option>
              {authors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostCard key={post.$id} post={post} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
