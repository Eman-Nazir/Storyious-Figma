import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "dl9nti2kz",
  api_key: process.env.CLOUDINARY_API_KEY || "929448954262188",
  api_secret: process.env.CLOUDINARY_SECRET_KEY || "Oz8tH0s54AfrO53Dg7w89KOaUrA",
});

export default cloudinary;
