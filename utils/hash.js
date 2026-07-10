import crypto from 'crypto'

const ALGORITHM = 'sha256'
const KEY_LENGTH = 64
const SALT_LENGTH = 16

export async function hashPassword(password) {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex')
  const hash = crypto
    .createHmac(ALGORITHM, salt)
    .update(password)
    .digest('hex')
  return `${salt}:${hash}`
}

export async function verifyPassword(password, storedHash) {
  const [salt, hash] = storedHash.split(':')
  const testHash = crypto
    .createHmac(ALGORITHM, salt)
    .update(password)
    .digest('hex')
  return hash === testHash
}

export function generateRandomString(length = 32) {
  return crypto.randomBytes(length).toString('hex')
}

export function generateResetToken() {
  return crypto.randomBytes(32).toString('hex')
}
