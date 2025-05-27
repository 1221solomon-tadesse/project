import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    console.log(`Fetching property with ID: ${params.id}`);
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) {
      console.log(`Property not found with ID: ${params.id}`);
      return new Response(JSON.stringify({ error: "Property Not Found" }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log(`Successfully found property: ${property.name}`);
    return new Response(JSON.stringify(property), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(`Error fetching property: ${error.message}`);
    return new Response(JSON.stringify({ error: "Something Went Wrong", details: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};


