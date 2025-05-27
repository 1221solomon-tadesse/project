'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

const AuthErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage;
  switch (error) {
    case 'AccessDenied':
      errorMessage = 'You do not have permission to sign in';
      break;
    case 'Configuration':
      errorMessage = 'There is a problem with the server configuration';
      break;
    case 'OAuthSignin':
    case 'OAuthCallback':
    case 'OAuthCreateAccount':
    case 'OAuthAccountNotLinked':
      errorMessage = 'There was a problem with the OAuth authentication';
      break;
    default:
      errorMessage = 'An unknown error occurred during authentication';
  }

  return (
    <section className="bg-blue-50 min-h-screen flex-grow">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="flex justify-center">
            <FaExclamationTriangle className="text-8xl text-yellow-400" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2">Authentication Error</h1>
            <p className="text-gray-500 text-xl mb-10">
              {errorMessage}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/auth/signin"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
              >
                Try Again
              </Link>
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
};

export default AuthErrorPage;