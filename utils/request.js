// Determine API domain with fallback for client-side
const getApiDomain = () => {
  // For server-side rendering or if env var is available
  if (process.env.NEXT_PUBLIC_API_DOMAIN) {
    return process.env.NEXT_PUBLIC_API_DOMAIN;
  }
  
  // For client-side when env var might not be available
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api`;
  }
  
  // Fallback
  return 'https://house-bice.vercel.app/api';
};

// Fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    const apiUrl = `${getApiDomain()}/properties${showFeatured ? "/featured" : ""}`;
    console.log("Fetching from:", apiUrl);
    
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Failed to fetch properties: ${res.status}`);
      return { properties: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { properties: [] };
  }
}

// Fetch single property
async function fetchProperty(id) {
  try {
    const apiUrl = `${getApiDomain()}/properties/${id}`;
    console.log("Fetching property from:", apiUrl);
    
    const res = await fetch(apiUrl);

    if (!res.ok) {
      console.error(`Failed to fetch property: ${res.status}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
