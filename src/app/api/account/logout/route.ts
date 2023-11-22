import { sendResponse } from '@/helpers/responseHandler';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const response = sendResponse('success', 'Logout Successfully', 201);
    response.cookies.set('token', '');
    return response;
  } catch (error) {
    return sendResponse('failed', 'Logout request failed', 500);
  }
};
