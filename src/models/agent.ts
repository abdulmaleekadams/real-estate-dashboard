import { timeStamp } from "console";
import mongoose from "mongoose";

mongoose.models = {};
const agentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  properties: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
}, {timestamps: true});

agentSchema.index({ email: 1 }, { unique: true })

export const Agent = mongoose.model('Agent', agentSchema)