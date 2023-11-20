import { dbConnect } from '@/dbConnect/dbConnect';
import { fieldIsNull, validateEmail } from '@/helpers/inputHandler';
import {
  hashPassword,
  validatePasswordPattern,
} from '@/helpers/passwordHandler';
import { sendResponse } from '@/helpers/responseHandler';
import { generateToken } from '@/helpers/tokenHandler';
import { userExist } from '@/helpers/userHandler';
import { User } from '@/models/user';
import { NextRequest } from 'next/server';

dbConnect();
export const POST = async (req: NextRequest) => {
  try {
    const { email, password, confirmPassword } = await req.json();

    // Check if any of the input is empty
    if (fieldIsNull([email, password, confirmPassword])) {
      return sendResponse('failed', 'Kindly fill all required input', 400);
    }
    // Check if email is a valid one
    if (validateEmail(email) === false) {
      return sendResponse('failed', 'Invalid email', 400);
    }
    // Check if password has spaces
    if (password.includes(' ')) {
      return sendResponse('failed', "Password can't have spaces.", 400);
    }
    // Check if password Matches Pattern
    if (validatePasswordPattern(password) === false) {
      return sendResponse(
        'failed',
        'Password must be at least 6 characters and contain at least one symbol, one capital letter, and one number.',
        400
      );
    }
    // Check is password and confirmPassword matches
    if (password !== confirmPassword) {
      return sendResponse('failed', "Password doesn't match", 400);
    }
    // Check if email doesn't belong to an existing user
    if (await userExist(User, email)) {
      return sendResponse(
        'failed',
        'A user has been registered with the email provided',
        400
      );
    }

    // Register user if all checks passed
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, password: hashedPassword });

    const createdUser = await newUser.save();
    const data = {
      id: createdUser._id,
      email: createdUser.email,
    };
    const response = sendResponse('success', data, 201);

    response.cookies.set('token', generateToken(data), {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return response;

    // Create a token for user and save it in the session
  } catch (error: any) {
    console.log(error);
    return sendResponse('failed', error.message, 500);
  }
};
