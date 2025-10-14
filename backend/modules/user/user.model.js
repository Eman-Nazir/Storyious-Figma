import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

userSchema.statics.ensureAdminExists = async function () {
  const User = this;
  const adminEmail = "admin@storyious.com";
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      username: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
  }
};

export default mongoose.model("User", userSchema);
