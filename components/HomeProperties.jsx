'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";

const HomeProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertiesData = async () => {
      try {
        const res = await fetch('/api/properties');
        
        if (res.ok) {
          const data = await res.json();
          
          if (data && data.properties && data.properties.length > 0) {
            // Get 3 random properties
            const randomProperties = [...data.properties]
              .sort(() => Math.random() - Math.random())
              .slice(0, 3);
            
            setProperties(randomProperties);
          } else {
            console.log('No properties returned from API');
            setProperties([]);
          }
        } else {
          console.error('Failed to fetch properties:', res.status);
          setError('Failed to load properties');
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Error loading properties');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertiesData();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {error ? (
              <p className="text-center col-span-3 text-red-500">{error}</p>
            ) : properties.length === 0 ? (
              <p className="text-center col-span-3">No Properties Found</p>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
