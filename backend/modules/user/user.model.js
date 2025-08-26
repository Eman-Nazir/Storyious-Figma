import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
<<<<<<< HEAD
    role: { type: String, enum: ["user", "admin" , 'author'], default: "user" },
=======
    role: { type: String, enum: ["user", "admin" , "author"], default: "user" },
>>>>>>> 99807b729697c0f2d8e9e262fde7b33a6eb15956
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
