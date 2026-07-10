export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function isValidPhone(phone) {
  const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/
  return re.test(phone)
}

export function isValidYear(year) {
  const currentYear = new Date().getFullYear()
  return Number(year) >= 1900 && Number(year) <= currentYear + 1
}

export function isValidPrice(price) {
  return !isNaN(price) && Number(price) > 0
}

export function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  return input.trim().replace(/[<>]/g, '')
}
