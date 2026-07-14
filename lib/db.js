import mongoose from 'mongoose'

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return
  }

  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables')
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    })
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    mongoose.connection.readyState = 0
    throw new Error('Failed to connect to MongoDB')
  }
}

export function disconnectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.disconnect()
  }
}

export function getDB() {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Database not connected. Call connectDB() first.')
  }
  return mongoose.connection
}

export default { connectDB, disconnectDB, getDB }
