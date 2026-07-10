import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')

export function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR, { recursive: true })
  }
}

export function saveFile(buffer, filename) {
  ensureUploadDir()
  const filepath = join(UPLOAD_DIR, filename)
  writeFileSync(filepath, buffer)
  return `/uploads/${filename}`
}

export function generateFilename(originalname) {
  const ext = originalname.split('.').pop()
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${timestamp}-${random}.${ext}`
}

export function isAllowedFileType(filename) {
  const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  const ext = '.' + filename.split('.').pop().toLowerCase()
  return allowed.includes(ext)
}

export function getFileSizeLimit() {
  return 5 * 1024 * 1024
}
