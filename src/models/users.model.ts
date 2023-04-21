import mongoose, { Schema, Model, Types } from "mongoose";

interface UserDocument {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ip: string;
  verified: boolean;
}

const userSchema = new Schema<UserDocument, Model<UserDocument>>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    ip: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
