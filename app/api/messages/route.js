import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/messages
export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
   
    const { userId } = sessionUser;

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name');

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name');

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: 'Something went wrong', error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    // Log the request body for debugging
    const body = await request.json();
    console.log('Message POST request body:', body);

    const { name, email, phone, message, property, recipient } = body;

    // Validate required fields
    if (!name || !email || !message || !property || !recipient) {
      return new Response(
        JSON.stringify({ 
          message: 'Missing required fields',
          received: { name, email, message, property, recipient }
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const sessionUser = await getSessionUser();
    console.log('Session user:', sessionUser);

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: 'You must be logged in to send a message' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { user } = sessionUser;

    // Can not send message to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: 'Cannot send a message to yourself' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    console.log('Creating new message:', newMessage);
    
    await newMessage.save();
    console.log('Message saved successfully');

    return new Response(JSON.stringify({ message: 'Message Sent' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in POST /api/messages:', error);
    return new Response(
      JSON.stringify({ 
        message: 'Something went wrong', 
        error: error.message,
        stack: error.stack
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
