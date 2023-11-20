import { dbConnect } from '@/dbConnect/dbConnect';
import { fieldIsNull, validateEmail } from '@/helpers/inputHandler';
import {
  compareHashedPassword,
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
    const { email, password } = await req.json();

    // Check if any of the input is empty
    if (fieldIsNull([email, password])) {
      return sendResponse('failed', 'Kindly fill all required input', 400);
    }
    // Check if email is a valid one
    if (validateEmail(email) === false) {
      return sendResponse('failed', 'Invalid email', 400);
    }

    // Check if  user exist
    const userFound = await userExist(User, email);
    if (!userFound) {
      return sendResponse('failed', "Email doesn't match any account", 404);
    }

    // verifyPassword
    const passwordVerified = await compareHashedPassword(
      password,
      userFound.password
    );
    if (!passwordVerified) {
      return sendResponse('failed', 'Invalid credentials', 401);
    }

    // authenticate user
    if (userFound && passwordVerified) {
      const data = {
        id: userFound._id,
        email: userFound.email,
      };
      const response = sendResponse('success', data, 201);

      // Create a token for user and save it in the session
      response.cookies.set('token', generateToken(data), {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return response;
    }
  } catch (error: any) {
    console.log(error);
    return sendResponse('failed', error.message, 500);
  }
};
