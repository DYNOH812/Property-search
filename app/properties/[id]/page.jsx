'use client';
import { useEffect, useState } from "react";
import { fetchProperty } from "@/utils/request";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import { useRouter } from 'next/navigation';

const PropertyPage = () => {
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    if (router.asPath !== router.route) {
      setIsRouterReady(true);
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      const id = router.query?.id;
      if (!id) return;
      try {
        const propertyData = await fetchProperty(id);
        setProperty(propertyData);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isRouterReady) {
      fetchData();
    }
  }, [isRouterReady, router]);

  if (!property && !loading) {
    return (<h1 className="text-center text-2xl font-bold mt-10">No Property Found</h1>);
  }

  return (
    <>
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
