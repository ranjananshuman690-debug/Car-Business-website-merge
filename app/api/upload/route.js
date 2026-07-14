import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { saveFile, generateFilename, isAllowedFileType, getFileSizeLimit } from '@/lib/upload'

export async function POST(request) {
  try {
    await connectDB()

    const contentType = request.headers.get('content-type') || ''

    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { success: false, message: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      )
    }

    const maxFileSize = getFileSizeLimit()
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

    const filename = generateFilename(file.name)
    const filepath = saveFile(Buffer.from(await file.arrayBuffer()), filename)

    return NextResponse.json(
      {
        success: true,
        message: 'File uploaded successfully',
        data: {
          filename,
          path: filepath,
          size: file.size,
          mimetype: file.type,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, message: 'File upload failed' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}
