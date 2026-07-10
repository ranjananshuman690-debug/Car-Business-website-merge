import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getAllCars, createCar, getCategories, seedCarsIfEmpty } from '@/services/carService'

export async function GET(request) {
  try {
    await connectDB()
    await seedCarsIfEmpty()
    const { searchParams } = new URL(request.url)

    if (searchParams.get('categories') === 'true') {
      const categories = await getCategories()
      return NextResponse.json({ success: true, data: categories })
    }

    const filters = {
      make: searchParams.get('make') || '',
      model: searchParams.get('model') || '',
      category: searchParams.get('category') || '',
      yearFrom: searchParams.get('yearFrom') || '',
      yearTo: searchParams.get('yearTo') || '',
      status: searchParams.get('status') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 12,
    }

    const result = await getAllCars(filters)

    return NextResponse.json({
      success: true,
      data: result.data,
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    })
  } catch (error) {
    console.error('Cars GET error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch cars' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()

    const result = await createCar(body)

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
    console.error('Cars POST error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create car' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}

