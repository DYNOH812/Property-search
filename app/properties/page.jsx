'use client';
import React, { useEffect, useState } from 'react'; 
import { fetchProperties } from '@/utils/request';
import PropertySearchForm from '@/components/PropertySearchForm';
import Properties from '@/components/Properties';

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
    if (Array.isArray(properties)) {
      properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, [properties]);
  

  return (
  <>
    <section className="bg-blue-700 py-4">
      <div className="max-w-7xl mx-auto px-4 flex-col items-start sm:px-6 lg:px-8  ">
        <PropertySearchForm/>
      </div>
    </section>
    <Properties/>
  </>
  );
};

export default PropertiesPage;
