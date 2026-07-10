import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'

export async function GET() {
  try {
    await connectDB()
    return NextResponse.json({
      success: true,
      message: 'Elite Motors API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Database connection failed' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}
