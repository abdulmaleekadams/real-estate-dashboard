import mongoose from 'mongoose';

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log(`MONGO DB connected successfully`);
  } catch (error) {
    console.log(`Error connecting to MONGO DB\n ${error}`);
  }
};
