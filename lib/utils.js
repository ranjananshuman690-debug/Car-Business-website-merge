import { signJwt } from './jwt'

export function generateToken(user) {
  return signJwt(
    {
      userId: user.userId || user._id || user.id,
      email: user.email,
      role: user.role || 'user',
    },
    '7d'
  )
}

export function generateReferralCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function formatDate(date) {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text, length = 100) {
  if (!text) return ''
  return text.length > length ? text.slice(0, length) + '...' : text
}
