const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
async function fetchProperties({showFeatured = false}= {}) {
    try {
        // Handle case where domain is not available yet
        if (!apiDomain) {
            return [];
        }
        const res = await fetch(`${apiDomain}/properties${showFeatured ? '/featured': ''}`,{cache:'no-store'});
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching properties:', error);
        return []; // Return an empty array in case of error
    }
}

// Fetch single property
async function fetchProperty(id) {
    try {
        // Handle case where domain is not available yet
        if (!apiDomain) {
            return null;
        }
        const res = await fetch(`${apiDomain}/properties/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching property:', error);
        return null; // Return null in case of error
    }
}

export { fetchProperties, fetchProperty };
