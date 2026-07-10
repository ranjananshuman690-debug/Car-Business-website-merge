import { verifyJwt } from './jwt'

export function getAuthHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (typeof window !== 'undefined') {
    const token = getClientToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  return headers
}

export function getClientToken() {
  if (typeof document === 'undefined') return null

  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1] ?? null
}

export function getTokenFromRequest(req) {
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }

  const cookieHeader = req.headers.get('cookie')
  if (cookieHeader) {
    const match = cookieHeader.match(/token=([^;]+)/)
    if (match) return match[1]
  }

  return null
}

export function authenticateRequest(req) {
  const token = getTokenFromRequest(req)
  if (!token) return null

  const decoded = verifyJwt(token)
  if (!decoded) return null

  return decoded
}

export function parseCookies(req) {
  const cookieHeader = req.headers.get('cookie')
  if (!cookieHeader) return {}

  return cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    acc[key] = value
    return acc
  }, {})
}
