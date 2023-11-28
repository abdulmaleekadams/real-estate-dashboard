import { sendResponse } from '@/helpers/responseHandler';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const response = sendResponse('success', 'Logout Successfully', 201);
    response.cookies.set('token', '', { expires: new Date(0) });

    return response;
  } catch (error) {
    return sendResponse('failed', 'Logout request failed', 500);
  }
};
