import { dbConnect } from '@/dbConnect/dbConnect';
import { NextRequest } from 'next/server';

dbConnect();
export const POST = async (req: NextRequest) => {
  try {
    const { email, password, confirmPassword } = await req.json();

    // Check if any of the input is empty

    // Check if email is a valid one

    // Check if email doesn't belong to an existing user

    // Check is password and confirmPassword matches

    // Check if password Matches Pattern

    // Register user if all checks passed

    // Create a token for user and save it in the session

    
  } catch (error) {}
};
