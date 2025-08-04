'use client';

import React, { useState } from 'react';

export default function PostsPage() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [prompt, setPrompt] = useState('Write a blog about AI in education');
  const [copied, setCopied] = useState(false);

  const generateContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/tempapi/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ body: prompt }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }
      if (response.ok) {
        setOutput(data.output || '');
      } else {
        setOutput('Error: ' + (data.error || `Status ${response.status}`));
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setOutput('An error occurred.');
    } finally {
      setLoading(false);
      setCopied(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        AI Blog Generator
      </h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-3 border-2 border-purple-500 rounded mb-4 focus:ring-2 focus:ring-purple-400"
      />

      <button
        onClick={generateContent}
        disabled={loading}
        className="mb-4 inline-block px-6 py-2 font-semibold text-white rounded bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-colors duration-300 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Blog'}
      </button>

      <div className="mt-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 rounded-lg relative">
        <div className="text-gray-900 whitespace-pre-wrap">
          {output || <span className="text-gray-500 italic">No blog generated yet.</span>}
        </div>
        {/* Copy button */}
        {output && (
          <button
            onClick={handleCopy}
            className={`absolute top-4 right-4 px-3 py-1 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 transition`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
    </div>
  );
}
