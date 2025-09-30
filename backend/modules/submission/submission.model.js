

import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  age: { 
    type: String,
    trim: true 
  },
  city: { 
    type: String,
    trim: true 
  },
  country: { 
    type: String,
    trim: true 
  },
  qualification: { 
    type: String,
    trim: true 
  },
  institution: { 
    type: String,
    trim: true 
  },
  profession: { 
    type: String,
    trim: true 
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true 
  },
  phone: { 
    type: String, 
    required: true,
    trim: true 
  },
  about: { 
    type: String,
    trim: true 
  },
  reason: { 
    type: String,
    trim: true 
  },
  file: { 
    type: String 
  },
}, { 
  timestamps: true 
});

submissionSchema.index({ email: 1 });
submissionSchema.index({ createdAt: -1 });

export default mongoose.model("Submission", submissionSchema);