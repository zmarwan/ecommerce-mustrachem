import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tel: { type: String, required: true },
    adresse: { type: String, required: true },
    ville: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;
