import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'My Resume',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Allow guest users
  },
  personalInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    linkedin: { type: String },
    github: { type: String },
    website: { type: String },
  },
  summary: {
    type: String,
    required: true,
  },
  experience: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    description: [{ type: String }],
    location: { type: String },
  }],
  education: [{
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    gpa: { type: String },
    location: { type: String },
  }],
  skills: [{ type: String }],
  projects: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    link: { type: String },
    github: { type: String },
    startDate: { type: String },
    endDate: { type: String },
  }],
  certifications: [{
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    expiryDate: { type: String },
    credentialId: { type: String },
  }],
  templateId: {
    type: String,
    default: 'modern-1',
  },
  analysis: {
    score: { type: Number, default: 0 },
    feedback: [{
      type: { type: String, enum: ['error', 'warning', 'suggestion', 'success'] },
      category: { type: String, enum: ['content', 'formatting', 'structure', 'keywords'] },
      message: { type: String },
      section: { type: String },
      priority: { type: String, enum: ['high', 'medium', 'low'] },
    }],
    keywords: [{ type: String }],
    missingKeywords: [{ type: String }],
    atsCompatibility: { type: Number, default: 0 },
    lastAnalyzed: { type: Date },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ResumeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
