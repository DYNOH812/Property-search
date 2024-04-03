'use client';
import React, { useEffect, useState } from 'react'; 
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/request';

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

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {loading ? (
          <p>Loading...</p>
        ) : properties.length === 0 ? (
          <p>No Properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
