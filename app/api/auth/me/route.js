import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getMe, updateMe } from '@/services/authService'
import { authenticateRequest } from '@/lib/auth'

export async function GET(request) {
  try {
    await connectDB()
    const user = authenticateRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = await getMe(user.userId)
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: result.data })
  } catch (error) {
    console.error('GetMe error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  try {
    await connectDB()
    const user = authenticateRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const result = await updateMe(user.userId, body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, data: result.data, message: result.message })
  } catch (error) {
    console.error('UpdateMe error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update profile' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}
