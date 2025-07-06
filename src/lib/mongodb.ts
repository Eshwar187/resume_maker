// MongoDB connection utility
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn('MongoDB URI not provided - database features will be disabled');
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MongoDB URI not configured');
  }

  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose;
    }
    
    return await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectDB;
