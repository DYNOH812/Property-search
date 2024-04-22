import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";


// GET /api/properties/:id
export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const properties = await Property.findById({});

        if (!properties) {
            return new Response('Property Not Found', { status: 404 });
            // return response.status(404).send('Property Not Found');
        }

        return new Response(JSON.stringify(properties), { status: 200 });
        // return response.status(200).json(property);
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
        // return response.status(500).send('Something went wrong');
    }
};




// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
    try {

        const propertyId = params.id;

        const sessionUser = await getSessionUser();
       // check for session
        if(!sessionUser || !sessionUser.userId){
          return new Response('User Id is required', {status:401});
        }

        const {userId} = sessionUser;

        await connectDB();

        const property = await Property.findById(propertyId);

        if (!property) {
            return new Response('Property Not Found', { status: 404 });
            // return response.status(404).send('Property Not Found');
        }
        //verify ownership
        if(property.owner.toString() !== userId){
            return new Response('Unauthorized',{status:401})
        }

        await property.deleteOne();

        return new Response('Property Deleted', { status: 200 });
        // return response.status(200).json(property);
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
        // return response.status(500).send('Something went wrong');
    }
};

// PUT //api/properties/:id
export const PUT = async (request, {params}) => {
    try {
        await connectDB();
        
        const sessionUser= await getSessionUser();

        if(!sessionUser || !sessionUser.userId){
            return new Response('User ID is required',{status:401});
        }
        
        const {id} = params;
        const {userId} = sessionUser;

        const formData = await request.formData();

        //Access all values from amenities
        const amenities= formData.getAll('amenities');

        //Get property to update
        const existingProperty = await Property.findById(id);
        if(!existingProperty){
            return new Response('Property does not exist', {status:404})
        }

        // verify ownership
        if(existingProperty.owner.toString() !==userId){
            return new Response('Unauthorized', {status:401})
        }

        
        //create propertyData for object for database
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location:{
                street:formData.get('location.street'),
                city:formData.get('location.city'),
                county:formData.get('location.county'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates:{
                weekly: formData.get('weekly'),
                monthly: formData.get('monthly'),
                nightly: formData.get('nightly'),
            },
            seller_info:{
                email:formData.get('seller_info.email'),
                name:formData.get('seller_info.name'),
                phone:formData.get('seller_info.phone'),
            },
            owner:userId,
        };
       
        //update property in database
        const updatedProperty = await Property.findByIdAndUpdate(id,propertyData);
        
        return new Response(JSON.stringify(updatedProperty), {status:200});
        
    } catch (error) {
        return new Response('Failed to add property',{status:500});
    }
}


