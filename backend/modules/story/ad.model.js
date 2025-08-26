import mongoose from "mongoose";

const adsSchema = new mongoose.Schema({
  title: { type: String},          
  description: { type: String},    
  imageUrl: { type: String},        
  buttonText: { type: String},      
 },
  { timestamps: true });

const Ads = mongoose.model("Ads", adsSchema);
export default Ads;
