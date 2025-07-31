import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-950 text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
            Welcome back, {user.firstName || user.emailAddresses[0]?.emailAddress}!
          </h1>
          <p className="mt-2 text-gray-300 max-w-xl">
            Manage your blog posts and account settings
          </p>
        </header>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Create New Post */}
          <Link href="/posts/create" className="group">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl p-6 border border-blue-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">
                Create New Post
              </h3>
              <p className="text-gray-300">
                Write and publish your next blog post with AI assistance
              </p>
            </div>
          </Link>

          {/* My Posts */}
          <Link href="/posts" className="group">
            <div className="bg-gradient-to-r from-purple-700 to-pink-700 rounded-xl p-6 border border-purple-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">
                My Posts
              </h3>
              <p className="text-gray-300">
                View and manage all your published blog posts
              </p>
            </div>
          </Link>

          {/* Analytics */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="w-12 h-12 bg-black bg-opacity-10 rounded-lg flex items-center justify-center mb-5">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-gray-300">Track your blog performance and engagement</p>
            <div className="mt-4 text-sm text-gray-500 italic">Coming soon...</div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
            Recent Activity
          </h2>
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 text-center shadow-lg">
            <svg
              className="w-14 h-14 text-gray-500 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium mb-2">No recent activity</h3>
            <p className="text-gray-400 mb-6">Start by creating your first blog post!</p>
            <Link
              href="/posts/create"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              Create Post
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
