import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    profilePic: { type: String, default: "https://via.placeholder.com/150" },
  },
  { timestamps: true }
);

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

export default Profile;

