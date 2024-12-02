const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
async function fetchProperties() {
  try {
    // Handle the case where the domain is not avaliable yet
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json(); // Assuming the response is an array
  } catch (error) {
    console.log(error);
    return []; // Return an empty array on error
  }
}
//fetch single property
async function fetchProperty(id) {
  try {
    // Handle the case where the domain is not avaliable yet
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json(); // Assuming the response is an array
  } catch (error) {
    console.log(error);
    return null; // Return an empty array on error
  }
}
export { fetchProperties, fetchProperty };