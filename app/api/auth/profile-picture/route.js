import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { authenticateRequest } from '@/lib/auth'
import { updateProfilePicture } from '@/services/authService'
import cloudinary from '@/lib/cloudinary'
import User from '@/models/User'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024

export async function POST(request) {
  try {
    await connectDB()
    const user = authenticateRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('profilePicture')

    if (!file || file.size === 0) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only JPG, JPEG, PNG and WebP are allowed.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds 5MB limit.' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const existingUser = await User.findById(user.userId).select('cloudinaryPublicId profilePicture')
    const oldPublicId = existingUser?.cloudinaryPublicId || ''

    const result = await updateProfilePicture(user.userId, buffer, file.name, oldPublicId)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, data: result.data, message: result.message }, { status: 200 })
  } catch (error) {
    console.error('Profile picture upload error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to upload profile picture. Please try again.' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    await connectDB()
    const user = authenticateRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    const existingUser = await User.findById(user.userId).select('cloudinaryPublicId profilePicture')

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    if (existingUser.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(existingUser.cloudinaryPublicId)
      } catch (error) {
        console.error('Failed to delete image from Cloudinary:', error)
      }
    }

    await User.findByIdAndUpdate(user.userId, {
      profilePicture: '',
      cloudinaryPublicId: '',
    })

    return NextResponse.json({ success: true, message: 'Profile picture removed successfully' }, { status: 200 })
  } catch (error) {
    console.error('Profile picture delete error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to remove profile picture.' },
      { status: 500 }
    )
  }
}
