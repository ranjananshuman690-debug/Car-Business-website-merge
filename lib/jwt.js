const JWT_SECRET = process.env.JWT_SECRET || 'elite-motors-secret-key-change-in-production'

export function signJwt(payload, expiresIn = '7d') {
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const exp = now + parseExpiry(expiresIn)
  const payloadWithClaims = { ...payload, iat: now, exp }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payloadWithClaims))
  const signature = createSignature(`${encodedHeader}.${encodedPayload}`, JWT_SECRET)

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

export function verifyJwt(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [encodedHeader, encodedPayload, signature] = parts
    const expectedSignature = createSignature(`${encodedHeader}.${encodedPayload}`, JWT_SECRET)

    if (signature !== expectedSignature) return null

    const payload = JSON.parse(base64UrlDecode(encodedPayload))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null

    return payload
  } catch {
    return null
  }
}

function parseExpiry(expiresIn) {
  const units = { s: 1, m: 60, h: 3600, d: 86400 }
  const match = String(expiresIn).match(/^(\d+)([smhd])$/)
  if (!match) return 604800
  return parseInt(match[1]) * units[match[2]]
}

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) base64 += '='
  return Buffer.from(base64, 'base64').toString('utf-8')
}

function createSignature(data, secret) {
  const crypto = require('crypto')
  return crypto.createHmac('sha256', secret).update(data).digest('base64url')
}
