const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN||null;

//fetch all properties
async function fetchProperties() {
    try {
       //handle case where domain is not available yet
    if(!apiDomain) {
        return[];
    }
      const res = await fetch(`${apiDomain}/properties`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      return res.json();
    } catch (error) {
      console.error('Error fetching properties:', error);
      return []; // Return an empty array in case of error
    }
  }

  //fetch single property
  async function fetchProperty(id) {
    try {
       //handle case where domain is not available yet
    if(!apiDomain) {
        return null;
    }
      const res = await fetch(`${apiDomain}/properties/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      return res.json();
    } catch (error) {
      console.error('Error fetching properties:', error);
      return null; // Return an empty array in case of error
    }
  }

  export{fetchProperties,fetchProperty};