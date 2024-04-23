'use client';
import React, { useEffect, useState } from 'react'; 
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/request';
import PropertySearchForm from '@/components/PropertySearchForm';

const override = {
  display: 'block',
  margin: '100px auto',
}


const PropertiesPage = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Ensure properties are sorted after fetching
  useEffect(() => {
    properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [properties]);

  

  return (<>
    <section className="bg-blue-700 py-4">
      <div className="max-w-7xl mx-auto px-4 flex-col items-start sm:px-6 lg:px-8  ">
        <PropertySearchForm/>
      </div>
    </section>
   
        <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
      
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        
      </div>
    </section>
      
    
    </>);
};

export default PropertiesPage;
