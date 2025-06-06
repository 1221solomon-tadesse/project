'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Layout Error:', error);
  }, [error]);

  return (
    <section className="bg-blue-50 min-h-screen flex-grow">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="flex justify-center">
            <FaExclamationTriangle className="text-8xl text-yellow-400" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2">Something Went Wrong</h1>
            <p className="text-gray-500 text-xl mb-10">
              {error?.message || 'An unexpected error occurred'}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}