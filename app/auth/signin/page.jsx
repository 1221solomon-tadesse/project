'use client';
import { useState, useEffect } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';

const SignInPage = () => {
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const setUpProviders = async () => {
      try {
        const res = await getProviders();
        setProviders(res);
      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        setLoading(false);
      }
    };
    setUpProviders();
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        <div className="space-y-4">
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name} className="flex justify-center">
                <button
                  onClick={() => {
                    signIn(provider.id, { callbackUrl: '/' });
                  }}
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg w-full"
                >
                  {provider.name === 'Google' && <FaGoogle />}
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;