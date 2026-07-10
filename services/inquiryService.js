import Inquiry from '@/models/Inquiry'
import { validateInquiryData } from '@/lib/validation'
import { getEmailTemplate, personalizeTemplate } from '@/utils/email'

export async function createInquiry(data) {
  const { isValid, errors } = validateInquiryData(data)
  if (!isValid) {
    return { success: false, message: 'Validation failed', errors }
  }

  const inquiry = new Inquiry(data)
  const savedInquiry = await inquiry.save()

  const template = getEmailTemplate('INQUIRY_CONFIRMATION')
  if (template) {
    const personalized = personalizeTemplate(template, {
      name: `${data.firstName} ${data.lastName}`,
      carModel: data.carModel,
    })
    console.log('Inquiry confirmation email:', personalized)
  }

  return {
    success: true,
    message: 'Inquiry submitted successfully. Our team will contact you within 24 hours.',
    data: savedInquiry.toJSON ? savedInquiry.toJSON() : savedInquiry,
  }
}

export async function getAllInquiries(filters = {}) {
  const query = {}

  if (filters.status) {
    query.status = filters.status
  }
  if (filters.userId) {
    query.userId = filters.userId
  }

  const inquiries = await Inquiry.find(query)
    .sort({ createdAt: -1 })
    .lean()

  return {
    data: inquiries,
    total: inquiries.length,
  }
}

export async function getInquiryById(id) {
  const inquiry = await Inquiry.findById(id).lean()
  return inquiry
}

export async function updateInquiryStatus(id, status) {
  const inquiry = await Inquiry.findById(id)
  if (!inquiry) {
    return { success: false, message: 'Inquiry not found' }
  }

  inquiry.status = status
  const updatedInquiry = await inquiry.save()

  return {
    success: true,
    message: 'Inquiry status updated',
    data: updatedInquiry.toJSON ? updatedInquiry.toJSON() : updatedInquiry,
  }
}

export async function deleteInquiry(id) {
  const inquiry = await Inquiry.findById(id)
  if (!inquiry) {
    return { success: false, message: 'Inquiry not found' }
  }

  await Inquiry.findByIdAndDelete(id)
  return {
    success: true,
    message: 'Inquiry deleted successfully',
  }
}
