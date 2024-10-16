import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let connection: typeof mongoose | null = null;

async function dbConnect(): Promise<typeof mongoose> {
  if (connection) {
    return connection;
  }

  try {
    connection = await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default dbConnect;