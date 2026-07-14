import { successResponse, errorResponse, paginatedResponse } from '@/lib/apiResponse'
import carService from '@/services/carService'
import { withAdmin } from '@/middleware/auth'
import { withErrorHandling } from '@/middleware/errorHandler'
import { validateCarData } from '@/lib/validation'

export const getCars = withErrorHandling(async (req) => {
  const { searchParams } = new URL(req.url)

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

  const result = await carService.getAllCars(filters)

  return paginatedResponse(
    req,
    result.data,
    result.page,
    result.limit,
    result.total
  )
})

export const getCarById = withErrorHandling(async (req, { params }) => {
  const car = await carService.getCarById(params.id)

  if (!car) {
    return errorResponse(req, 'Car not found', 404)
  }

  return successResponse(req, car)
})

export const createCar = withErrorHandling(withAdmin(async (req) => {
  const body = await req.json()

  const { isValid, errors } = validateCarData(body)
  if (!isValid) {
    return errorResponse(req, 'Validation failed', 400, errors)
  }

  const result = await carService.createCar(body)

  if (!result.success) {
    return errorResponse(req, result.message, 400)
  }

  return successResponse(req, result.data, result.message, 201)
}))

export const updateCar = withErrorHandling(withAdmin(async (req, { params }) => {
  const body = await req.json()

  const result = await carService.updateCar(params.id, body)

  if (!result.success) {
    return errorResponse(req, result.message, result.message === 'Car not found' ? 404 : 400)
  }

  return successResponse(req, result.data, result.message)
}))

export const deleteCar = withErrorHandling(withAdmin(async (req, { params }) => {
  const result = await carService.deleteCar(params.id)

  if (!result.success) {
    return errorResponse(req, result.message, 404)
  }

  return successResponse(req, null, result.message)
}))

export const getCarCategories = withErrorHandling(async (req) => {
  const categories = carService.getCategories()
  return successResponse(req, categories)
})

export const getCarMakes = withErrorHandling(async (req) => {
  const makes = carService.getAllMakes()
  return successResponse(req, makes)
})
