import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import { fetchProperty } from '@/utils/request'
import React from 'react'


// when you decide to use nextjs , utilize server side rendering and data fetching. Dont make your page.js files as client components, otherwise you will be writing just react
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
        </>
      )}
    </>
  );
}

export default PropertyPage