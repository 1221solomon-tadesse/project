const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
async function fetchProperties() {
  console.log("Solomon")

 try{
  const res = await fetch (`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`)
 }
catch{
  console.log(error)
}}

export { fetchProperties};