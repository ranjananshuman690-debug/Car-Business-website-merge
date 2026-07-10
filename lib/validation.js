export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePhone(phone) {
  const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/
  return re.test(phone)
}

export function validateRequired(value) {
  return value && value.trim().length > 0
}

export function validateMinLength(value, min) {
  return value && value.length >= min
}

export function validateMaxLength(value, max) {
  return value && value.length <= max
}

export function validateRange(value, min, max) {
  const num = Number(value)
  return !isNaN(num) && num >= min && num <= max
}

export function validateUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function sanitizeString(str) {
  return str?.trim().replace(/[<>]/g, '') || ''
}

export function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

export function validateCarData(data) {
  const errors = {}

  if (!validateRequired(data.name)) errors.name = 'Name is required'
  if (!validateRequired(data.make)) errors.make = 'Make is required'
  if (!validateRequired(data.model)) errors.model = 'Model is required'
  if (!validateRequired(data.year)) errors.year = 'Year is required'
  if (!validateRequired(data.price)) errors.price = 'Price is required'
  if (!validateRequired(data.condition)) errors.condition = 'Condition is required'
  if (!validateRequired(data.status)) errors.status = 'Status is required'

  if (data.year && !validateRange(data.year, 1900, new Date().getFullYear() + 1)) {
    errors.year = 'Invalid year'
  }

  if (data.price && Number(data.price) <= 0) {
    errors.price = 'Price must be greater than 0'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateInquiryData(data) {
  const errors = {}

  if (!validateRequired(data.firstName)) errors.firstName = 'First name is required'
  if (!validateRequired(data.lastName)) errors.lastName = 'Last name is required'
  if (!validateRequired(data.email)) errors.email = 'Email is required'
  else if (!validateEmail(data.email)) errors.email = 'Invalid email format'
  if (!validateRequired(data.phone)) errors.phone = 'Phone is required'
  if (!validateRequired(data.carModel)) errors.carModel = 'Car model is required'
  if (!validateRequired(data.message)) errors.message = 'Message is required'

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateUserData(data, isUpdate = false) {
  const errors = {}

  if (!isUpdate || data.firstName !== undefined) {
    if (!validateRequired(data.firstName)) errors.firstName = 'First name is required'
  }

  if (!isUpdate || data.lastName !== undefined) {
    if (!validateRequired(data.lastName)) errors.lastName = 'Last name is required'
  }

  if (!isUpdate || data.email !== undefined) {
    if (!validateRequired(data.email)) errors.email = 'Email is required'
    else if (!validateEmail(data.email)) errors.email = 'Invalid email format'
  }

  if (!isUpdate || data.password !== undefined) {
    if (!validateMinLength(data.password, 6)) errors.password = 'Password must be at least 6 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
