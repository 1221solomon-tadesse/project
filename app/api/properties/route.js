import connectDB from "@/config/database"
export const  GET =async(request)=>{
   try{
    await connectDB()
    return new Response(JSON.stringify({message:'hello soll'
   } ),{status:200})
   }
   catch(error ){
    console.log(error)
    return new Response('something went wrong',{status:500})

   }
}