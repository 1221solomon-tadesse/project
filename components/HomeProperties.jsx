import Link from 'next/link';
// import { fetchProperties } from '@/utils/request';
import PropertyCard from '@/components/PropertyCard';
 import properties from "@/properties.json";
export const HomeProperties = async() => {
    //  const properties = await fetchProperties();
      /* Recent properties */
    const recentProperties = properties
      .sort(() => Math.random() - Math.random())
      .slice(0, 3);
  return (
    <>
      <section class="px-4 py-6">
      <div class="container-xl lg:container m-auto">
        <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
         <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties===0?( <p>NO recent properties found </p> ):( recentProperties.map((property)=>(
                <PropertyCard key={property._id} property={property}/>
            ))

            )}
         </div>
        </div>
        </section>

        <section className="m-auto max-w-lg my-10 px-6">
            <Link
            href="/properties"
            className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
            >View All Properties</Link>
        </section>
    </>
  )
}
export default HomeProperties