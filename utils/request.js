const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
async function fetchProperties() {
  console.log("Solomon")
//   try {
//     // Handle the case where the domain is not available yet./////
//     if (!apiDomain) {
//       return [];
//     }
//     const res = await fetch(`${apiDomain}/properties`);
//     if (!res.ok) {
//       throw new error('Failed to fetch data');
//     }
//     const data = await res.json();
//     return data.properties
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }
 try{
  const res = await fetch (`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`)
 }
catch{
  console.log(error)
}}
// Fetch single property
async function fetchProperty(id) {
  try {
    // Handle the case where the domain is not available yet.
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new error('Failed to fetch data');
    }
      await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };