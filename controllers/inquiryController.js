import { successResponse, errorResponse } from '@/lib/apiResponse'
import inquiryService from '@/services/inquiryService'
import { withAdmin } from '@/middleware/auth'
import { withErrorHandling } from '@/middleware/errorHandler'
import { validateInquiryData } from '@/lib/validation'

export const createInquiry = withErrorHandling(async (req) => {
  const body = await req.json()

  const { isValid, errors } = validateInquiryData(body)
  if (!isValid) {
    return errorResponse(req, 'Validation failed', 400, errors)
  }

  const result = await inquiryService.createInquiry(body)

  if (!result.success) {
    return errorResponse(req, result.message, 400)
  }

  return successResponse(req, result.data, result.message, 201)
})

export const getAllInquiries = withErrorHandling(withAdmin(async (req) => {
  const { searchParams } = new URL(req.url)
  const filters = {
    status: searchParams.get('status') || '',
    userId: searchParams.get('userId') || '',
  }

  const result = await inquiryService.getAllInquiries(filters)

  return successResponse(req, result.data, 'Inquiries fetched successfully')
}))

export const getInquiryById = withErrorHandling(withAdmin(async (req, { params }) => {
  const inquiry = await inquiryService.getInquiryById(params.id)

  if (!inquiry) {
    return errorResponse(req, 'Inquiry not found', 404)
  }

  return successResponse(req, inquiry)
}))

export const updateInquiryStatus = withErrorHandling(withAdmin(async (req, { params }) => {
  const body = await req.json()
  const { status } = body

  if (!status) {
    return errorResponse(req, 'Status is required', 400)
  }

  const validStatuses = ['pending', 'contacted', 'completed', 'cancelled']
  if (!validStatuses.includes(status)) {
    return errorResponse(req, 'Invalid status', 400)
  }

  const result = await inquiryService.updateInquiryStatus(params.id, status)

  if (!result.success) {
    return errorResponse(req, result.message, 404)
  }

  return successResponse(req, result.data, result.message)
}))

export const deleteInquiry = withErrorHandling(withAdmin(async (req, { params }) => {
  const result = await inquiryService.deleteInquiry(params.id)

  if (!result.success) {
    return errorResponse(req, result.message, 404)
  }

  return successResponse(req, null, result.message)
}))
