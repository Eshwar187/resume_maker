import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false, // Not required for OAuth users
  },
  provider: {
    type: String,
    enum: ['credentials', 'google'],
    default: 'credentials',
  },
  providerId: {
    type: String,
    required: false,
  },
  resumes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  }],
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    defaultTemplate: {
      type: String,
      default: 'modern-1',
    },
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

UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
