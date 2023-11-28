import { NextResponse } from 'next/server';
import { v2 } from 'cloudinary';
import { AgentsFormDetails } from '@/helpers/formInput';
import { sendResponse } from '@/helpers/responseHandler';
import { Agent } from '@/models/agent';
import { userExist } from '@/helpers/userHandler';
import { dbConnect } from '@/dbConnect/dbConnect';

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  //   secure: true,
});

interface AgentFormDetailsProps {
  firstname: string;
  lastname: string;
  photo: null | Blob | string | ArrayBuffer;
  phone: string;
  dob: string;
  gender: string;
  country: string;
  email: string;
  properties: string;
  [key: string]: string | null | Blob | string | ArrayBuffer;
}

dbConnect();

export const POST = async (req: NextResponse) => {
  try {
    const {
      firstname,
      lastname,
      phone,
      dob,
      gender,
      email,
      properties,
      photo,
      country,
    } = await req.json();

    const formDetails: AgentFormDetailsProps = {
      firstname,
      lastname,
      phone,
      dob,
      gender,
      email,
      properties,
      photo,
      country,
    };

    const hasError = AgentsFormDetails.some(({ name, pattern }) => {
      const value = formDetails[name];

      if (pattern && typeof value === 'string') {
        // Handle pattern validation for fields with a pattern
        return !pattern.test(value);
      } else if (typeof value === 'string') {
        // Handle general string validation (empty or whitespace)
        return value.trim() === '';
      } else {
        // Handle validation for other types (e.g., number)
        return value === null || value === undefined;
      }
    });

    if (hasError) {
      return sendResponse('failed', 'Fill all required inputs', 401);
    }

    if (await userExist(Agent, email)) {
      return sendResponse(
        'failed',
        'A user has been registered with the email provided',
        400
      );
    }

    if (await Agent.findOne({ phone: phone }))
      return sendResponse(
        'failed',
        'An agent has been registered with the provided phone number',
        401
      );

    try {
      const photoUrl = await v2.uploader.upload(photo, {
        folder: 'real-estate/agents',
        resource_type: 'image',
      });
      formDetails.photo = photoUrl.url;
    } catch (error) {
      console.log(error);
      sendResponse('failed', 'Error uploading image, try again', 5000);
    }
    const newAgent = new Agent(formDetails);

    const createdAgent = (await newAgent.save()).toObject();

    const data = {
      createdAgent,
    };
    return sendResponse('success', data, 201);
  } catch (error: any) {
    console.log(error.message);
  }
};
