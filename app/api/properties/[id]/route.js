import connectDB from "@/config/database"
// import Property from '@/models/Property'
// import { fetchProperty } from "@/utils/request";
// GET /api/properties/:id
export const GET = async (reqest, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    if (!property) return new Response("Property not found ", { status: 4044 });
    return new Response(JSON.stringify(property));
  } catch (error) {
    console.log(error);
  }
};