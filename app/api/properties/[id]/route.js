import connectDB from "@/config/database"
// import Property from '@/models/Property'
// import { fetchProperty } from "@/utils/request";
// GET /api/properties/:id
export const GET = async (request, { params }) => {
    try {
      await connectDB();
      return new Response(JSON.stringify({message:"Hello world!"}), {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response('Something Went Wrong....', { status: 500 });
    }
}