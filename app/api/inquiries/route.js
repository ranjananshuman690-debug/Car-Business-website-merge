import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { createInquiry, getAllInquiries } from '@/services/inquiryService'

export async function GET(request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const filters = {
      status: searchParams.get('status') || '',
      userId: searchParams.get('userId') || '',
    }

    const result = await getAllInquiries(filters)

    return NextResponse.json({
      success: true,
      data: result.data,
      total: result.total,
    })
  } catch (error) {
    console.error('Inquiries GET error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()

    const result = await createInquiry(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: true, data: result.data, message: result.message },
      { status: 201 }
    )
  } catch (error) {
    console.error('Inquiry POST error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}
