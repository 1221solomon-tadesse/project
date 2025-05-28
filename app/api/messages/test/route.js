import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    
    const sessionUser = await getSessionUser();
    
    if (!sessionUser) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Not authenticated',
        sessionUser: null
      });
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'Authentication successful',
      user: {
        id: sessionUser.userId || sessionUser.user?.id,
        email: sessionUser.user?.email
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    await connectDB();
    
    const sessionUser = await getSessionUser();
    
    if (!sessionUser || !sessionUser.user) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Not authenticated' 
      }, { status: 401 });
    }
    
    // Count existing messages
    const messageCount = await Message.countDocuments();
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      messageCount,
      user: {
        id: sessionUser.userId || sessionUser.user?.id,
        email: sessionUser.user?.email
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}