import { NextResponse } from 'next/server';

export const sendResponse = (
  message: string,
  data: any,
  statusCode: number
) => {
  return NextResponse.json(
    { message: message, data: data },
    { status: statusCode }
  );
};
