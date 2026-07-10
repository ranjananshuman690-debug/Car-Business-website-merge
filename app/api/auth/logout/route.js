import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { logoutHandler } from '@/controllers/authController'

export async function POST(request) {
  try {
    await connectDB()
    return logoutHandler()
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
