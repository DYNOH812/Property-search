import React from 'react';
import PropertyImages from '@/components/PropertyImages';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import { fetchProperty } from '@/utils/request';
import Link from 'next/link';
import PropertyDetails from '@/components/PropertyDetails';
import {FaArrowLeft} from 'react-icons/fa';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from '@/components/ShareButtons';
import PropertyContactForm from '@/components/PropertyContactForm';



// when you decide to use Next.js , utilize server side rendering and data fetching. Don't make your page.js files as client components, otherwise you will be writing just react
async function PropertyPage({ params }) {

  const property = await fetchProperty(params.id)

  if (!property) {
    return (<h1 className="text-center text-2xl font-bold mt-10">No Property Found</h1>);
  }

  return (
    <>
      {property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
      <div className ="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className ="text-blue-500 hover:text-blue-600 flex items-center">
          <FaArrowLeft className='mr-2'/>Back to Properties
        </Link>
      </div>
    </section>
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                          
              <PropertyDetails property={ property }/>
         <aside className="space-y-4">       
            <BookmarkButton property={property}/>
            <ShareButtons property={property}/>
            <PropertyContactForm property={property}/>
         </aside>
        </div>
      </div>
    </section>
    <PropertyImages images = {property.images}/>
        </>
      )}
    </>
  );
}

export default PropertyPage;