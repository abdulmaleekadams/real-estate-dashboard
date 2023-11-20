import jwt from 'jsonwebtoken';

export const generateToken = (payloadData: any) => {
  const token = jwt.sign(payloadData, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  return token;
};

export const decodeToken = (token: string) => {
  const decodedData = jwt.verify(token, process.env.JWT_SECRET!);
  return decodedData;
};
