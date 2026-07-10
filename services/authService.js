import User from '@/models/User'
import { hashPassword, verifyPassword } from '@/utils/hash'
import { generateToken } from '@/lib/utils'
import { validateEmail, validateRequired, validateMinLength } from '@/lib/validation'
import { getEmailTemplate, personalizeTemplate } from '@/utils/email'
import { generateResetToken } from '@/utils/hash'

export async function register(data) {
  const { firstName, lastName, email, password, phone } = data

  if (!validateRequired(firstName)) {
    return { success: false, message: 'First name is required' }
  }
  if (!validateRequired(lastName)) {
    return { success: false, message: 'Last name is required' }
  }
  if (!validateRequired(email)) {
    return { success: false, message: 'Email is required' }
  }
  if (!validateEmail(email)) {
    return { success: false, message: 'Invalid email format' }
  }
  if (!validateRequired(password)) {
    return { success: false, message: 'Password is required' }
  }
  if (!validateMinLength(password, 6)) {
    return { success: false, message: 'Password must be at least 6 characters' }
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() })
  if (existingUser) {
    return { success: false, message: 'User already exists with this email' }
  }

  const hashedPassword = await hashPassword(password)

  const user = new User({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password: hashedPassword,
    phone: phone || '',
    role: 'user',
  })

  await user.save()

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  })

  const userWithoutPassword = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  }

  return {
    success: true,
    message: 'Registration successful',
    data: {
      user: userWithoutPassword,
      token,
    },
  }
}

export async function login(data) {
  const { email, password } = data

  if (!validateRequired(email)) {
    return { success: false, message: 'Email is required' }
  }
  if (!validateRequired(password)) {
    return { success: false, message: 'Password is required' }
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
  if (!user) {
    return { success: false, message: 'Invalid email or password' }
  }

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    return { success: false, message: 'Invalid email or password' }
  }

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  })

  const userWithoutPassword = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  }

  return {
    success: true,
    message: 'Login successful',
    data: {
      user: userWithoutPassword,
      token,
    },
  }
}

export async function getMe(userId) {
  const user = await User.findById(userId)
  if (!user) {
    return { success: false, message: 'User not found' }
  }

  const userWithoutPassword = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  }

  return {
    success: true,
    data: userWithoutPassword,
  }
}

export async function updateMe(userId, updates) {
  const allowedFields = ['firstName', 'lastName', 'email', 'phone']
  const updateData = {}

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      updateData[field] = updates[field]
    }
  }

  if (Object.keys(updateData).length === 0) {
    return { success: false, message: 'No valid fields to update' }
  }

  if (updateData.email) {
    updateData.email = updateData.email.toLowerCase()
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true }
  )

  if (!user) {
    return { success: false, message: 'User not found' }
  }

  if (updates.currentPassword && updates.newPassword) {
    const isValid = await verifyPassword(updates.currentPassword, user.password)
    if (!isValid) {
      return { success: false, message: 'Current password is incorrect' }
    }

    const hashedPassword = await hashPassword(updates.newPassword)
    await User.findByIdAndUpdate(userId, { password: hashedPassword })
  }

  const userWithoutPassword = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  }

  return {
    success: true,
    message: 'Profile updated successfully',
    data: userWithoutPassword,
  }
}

export async function forgotPassword(email) {
  if (!validateRequired(email)) {
    return { success: false, message: 'Email is required' }
  }
  if (!validateEmail(email)) {
    return { success: false, message: 'Invalid email format' }
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    return { success: true, message: 'If an account exists with this email, a reset link will be sent.' }
  }

  const resetToken = generateResetToken()
  const resetExpires = new Date(Date.now() + 3600000)

  await User.findByIdAndUpdate(user._id, {
    resetPasswordToken: resetToken,
    resetPasswordExpires: resetExpires,
  })

  return {
    success: true,
    message: 'Password reset link sent to your email',
    data: { resetToken },
  }
}

export async function resetPassword(token, newPassword) {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  })

  if (!user) {
    return { success: false, message: 'Invalid or expired reset token' }
  }

  const hashedPassword = await hashPassword(newPassword)

  await User.findByIdAndUpdate(user._id, {
    password: hashedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null,
  })

  return { success: true, message: 'Password reset successful' }
}

export function getAllUsers() {
  return User.find().select('-password').lean()
}

export function getUserById(id) {
  return User.findById(id).select('-password').lean()
}
