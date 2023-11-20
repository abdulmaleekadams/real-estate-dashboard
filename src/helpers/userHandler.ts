import { Model } from 'mongoose';

export const userExist = async (model: Model<any>, email: string) => {
  const userFound = await model.findOne({ email: email });

  return userFound;
};
