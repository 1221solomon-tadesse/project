async function fetchProperties(){
    try{
   const res =await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`)
   if(!res.ok){
    throw new Error('Failed to fetch data')
   }
   const data = await res.json()
      return data
    }
    catch(error){
  console.log(error)
    }
    
  }
  export {fetchProperties}