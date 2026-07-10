import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getCarById, updateCar, deleteCar } from '@/services/carService'

export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const car = await getCarById(id)

    if (!car) {
      return NextResponse.json(
        { success: false, message: 'Car not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: car })
  } catch (error) {
    console.error('Car GET error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch car' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()
    const result = await updateCar(id, body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.message === 'Car not found' ? 404 : 400 }
      )
    }

    return NextResponse.json({ success: true, data: result.data, message: result.message })
  } catch (error) {
    console.error('Car PUT error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update car' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const result = await deleteCar(id)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: result.message })
  } catch (error) {
    console.error('Car DELETE error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete car' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}
