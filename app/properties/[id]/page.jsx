'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PropertyHeaderImage from '@/components/propertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import BookmarkButton from '@/components/BookmarkButton';
import PropertyContactForm from '@/components/PropertyContactForm';
import ShareButtons from '@/components/ShareButtons';
import Spinner from '@/components/Spinner';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

const PropertyPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      
      try {
        console.log(`Fetching property with ID: ${id}`);
        const res = await fetch(`/api/properties/${id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            setError('Property not found');
          } else {
            setError('Error loading property');
          }
          return;
        }
        
        const data = await res.json();
        if (!data || data.error) {
          setError(data?.error || 'Property not found');
          return;
        }
        
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
        setError('Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (error || !property) {
    return (
      <section className="bg-blue-50 min-h-screen flex-grow">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <div className="flex justify-center">
              <FaExclamationTriangle className="text-8xl text-yellow-400" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold mt-4 mb-2">Property Not Found</h1>
              <p className="text-gray-500 text-xl mb-10">
                {error || "The property you are looking for does not exist."}
              </p>
              <Link
                href='/properties'
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
              >
                Back to Properties
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>

      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <PropertyDetails property={property} />
            <aside className='space-y-4'>
              <BookmarkButton property={property} /> 
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
