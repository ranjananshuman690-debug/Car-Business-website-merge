import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getInquiryById, updateInquiryStatus, deleteInquiry } from '@/services/inquiryService'

export async function GET(request, { params }) {
  try {
    await connectDB()
    const inquiry = await getInquiryById(params.id)

    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: 'Inquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: inquiry })
  } catch (error) {
    console.error('Inquiry GET error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch inquiry' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB()
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Status is required' },
        { status: 400 }
      )
    }

    const result = await updateInquiryStatus(params.id, status)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: result.data, message: result.message })
  } catch (error) {
    console.error('Inquiry PUT error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const result = await deleteInquiry(params.id)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: result.message })
  } catch (error) {
    console.error('Inquiry DELETE error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}
