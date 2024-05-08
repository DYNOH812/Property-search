import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";


//GET/api/properties
export const GET = async (request)=>{
    try {
         await connectDB();

         const page = request.nextUrl.searchParams.get('page') || 1;
         const pageSize = request.nextUrl.searchParams.get('pageSize') || 6;

         const skip = (page-1) * pageSize;

         const total = await Property.countDocuments({});
         const properties = await Property.find({}).skip(skip).limit(pageSize);

         const result = {
            total,
            properties
         }

        return new Response(JSON.stringify(result),{status:200});
    } catch (error) {
        
        return new Response('Something went wrong',{status:500});
    }
};

export const POST = async (request) => {
    try {
        await connectDB();
        
        const sessionUser= await getSessionUser();

        if(!sessionUser || !sessionUser.userId){
            return new Response('User ID is required',{status:401});
        }

        const {userId} = sessionUser;

        const formData = await request.formData();

        //Access all values from amenities and images
        const amenities= formData.getAll('amenities');
        const images= formData.getAll('images').filter((image)=> image.name !=='');
        
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
        // upload images to cloudinary
        const imageUploadPromises = [];

        for(const image of images){
            const imageBuffer = await image.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            // convert image data to base 64
            const imageBase64= imageData.toString('base64');

            // make request to upload to cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,{folder:'propertysearch'}
            );
            imageUploadPromises.push(result.secure_url);

            //wait for all images to upload
            const uploadedImages = await Promise.all(imageUploadPromises);

            //Add uploaded images to propertyData object
            propertyData.images= uploadedImages;
        }
        
        const newProperty = new Property(propertyData);
        await newProperty.save();

        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);

        
        //return new Response(JSON.stringify({message:"success"}, {status:200}))
    } catch (error) {
        return new Response('Failed to add property',{status:500});
    }
}