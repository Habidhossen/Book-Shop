import mongoose, { Document, Schema } from "mongoose";

// * If Using the Type
// type IUser = Document & {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
// };

// * If Using the Interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
}

// Create a new Mongoose Schema
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  phone: {
    type: String,
    required: true,
  },
});

// Create the User model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

// Export the User model
export default User;
