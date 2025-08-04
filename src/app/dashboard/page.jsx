'use client';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-950 text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
              Welcome back, {user.firstName || user.emailAddresses[0]?.emailAddress}!
            </h1>
            <p className="mt-2 text-gray-300 max-w-xl">
              Manage your blog posts and account settings
            </p>
          </div>
          <SignOutButton>
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
              Sign Out
            </button>
          </SignOutButton>
        </header>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create New Post */}
          <Link href="/posts/create" className="group">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl p-6 border border-blue-800 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="w-12 h-12 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Create Post</h3>
              <p className="text-gray-300 text-sm">Write new blog post</p>
            </div>
          </Link>

          {/* Manage Posts */}
          <Link href="/posts/manage" className="group">
            <div className="bg-gradient-to-r from-purple-700 to-pink-700 rounded-xl p-6 border border-purple-800 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="w-12 h-12 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Manage Posts</h3>
              <p className="text-gray-300 text-sm">Edit & delete posts</p>
            </div>
          </Link>

          {/* View All Posts */}
          <Link href="/posts" className="group">
            <div className="bg-gradient-to-r from-green-700 to-teal-700 rounded-xl p-6 border border-green-800 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="w-12 h-12 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">All Posts</h3>
              <p className="text-gray-300 text-sm">Browse all posts</p>
            </div>
          </Link>

          {/* AI Assistant */}
          <Link href="/ai-assistence" className="group">
            <div className="bg-gradient-to-r from-orange-700 to-red-700 rounded-xl p-6 border border-orange-800 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="w-12 h-12 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">AI Assistant</h3>
              <p className="text-gray-300 text-sm">Get writing help</p>
            </div>
          </Link>
        </section>



        {/* Quick Actions */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-4">Ready to start blogging?</h3>
              <div className="space-x-4">
                <Link
                  href="/posts/create"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200"
                >
                  Create Your First Post
                </Link>
                <Link
                  href="/posts"
                  className="inline-block px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors duration-200"
                >
                  Browse Posts
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}