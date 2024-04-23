import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

//POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, phone, message, property, recipient} = await request.json();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.user){
        return new Response('User Id is required', {status:400});
    }

    const {user} = sessionUser;
    // cannot send message to self
    if(user.id === recipient){
        return new Response(JSON.stringify({message:'cannot send a message to yourself'}),{status:402});
    }

    const newMessage = new Message({
        sender: user.id,
        name,
        recipient,
        property,
        email,
        phone,
        body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({message: 'message sent'}), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response('something went wrong', {status:500});
  }
};