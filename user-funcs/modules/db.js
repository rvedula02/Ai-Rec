import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(error => console.error('Connection error:', error.message));

export default mongoose;
