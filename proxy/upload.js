import { NextResponse } from 'next/server'
import { isAllowedFileType, getFileSizeLimit, generateFilename } from '@/lib/upload'

export function withFileUpload(allowedTypes = ['image/jpeg', 'image/png', 'image/webp'], maxSize = null) {
  const maxFileSize = maxSize || getFileSizeLimit()

  return async (req, handler) => {
    try {
      const contentType = req.headers.get('content-type') || ''

      if (!contentType.includes('multipart/form-data')) {
        return NextResponse.json(
          { success: false, message: 'Content-Type must be multipart/form-data' },
          { status: 400 }
        )
      }

      const formData = await req.formData()
      const file = formData.get('file')

      if (!file) {
        return NextResponse.json(
          { success: false, message: 'No file uploaded' },
          { status: 400 }
        )
      }

      if (file.size > maxFileSize) {
        return NextResponse.json(
          { success: false, message: `File size exceeds ${maxFileSize / 1024 / 1024}MB limit` },
          { status: 400 }
        )
      }

      if (!isAllowedFileType(file.name)) {
        return NextResponse.json(
          { success: false, message: 'Invalid file type. Allowed: jpg, jpeg, png, webp' },
          { status: 400 }
        )
      }

      return handler(formData, file)
    } catch (error) {
      console.error('Upload middleware error:', error)
      return NextResponse.json(
        { success: false, message: 'File upload failed' },
        { status: 500 }
      )
    }
  }
}

export function parseFormData(formData) {
  const data = {}
  for (const [key, value] of formData.entries()) {
    data[key] = value
  }
  return data
}
