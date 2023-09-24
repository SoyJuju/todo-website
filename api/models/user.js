import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add the username'],
    },
    email: {
      type: String,
      required: [true, 'Please add the email address'],
      unique: [true, 'Email address already taken'],
    },
    password: {
      type: String,
      required: [true, 'Please add the user password'],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('Users', userSchema);
export default userModel;
