import { NextResponse } from 'next/server'
import { register, login, getMe, updateMe, logout, forgotPassword, resetPassword } from '@/services/authService'
import { validateUserData } from '@/lib/validation'

export async function registerHandler(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password, phone } = body

    const { isValid, errors } = validateUserData(body)
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors },
        { status: 400 }
      )
    }

    const result = await register({ firstName, lastName, email, password, phone })

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      )
    }

    const response = NextResponse.json(
      { success: true, data: result.data, message: result.message },
      { status: 201 }
    )

    const token = result.data.token
    const isProduction = process.env.NODE_ENV === 'production'

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
}

export async function loginHandler(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const result = await login({ email, password })

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      )
    }

    const response = NextResponse.json(
      { success: true, data: result.data, message: result.message }
    )

    const token = result.data.token
    const isProduction = process.env.NODE_ENV === 'production'

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}

export async function getMeHandler(request, user) {
  try {
    const result = await getMe(user.userId)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: result.data })
  } catch (error) {
    console.error('GetMe error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function updateMeHandler(request, user) {
  try {
    const body = await request.json()
    const result = await updateMe(user.userId, body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, data: result.data, message: result.message })
  } catch (error) {
    console.error('UpdateMe error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update profile' },
      { status: 500 }
    )
  }
}

export async function logoutHandler() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' }
  )
  response.cookies.delete('token', { path: '/' })
  return response
}

export async function forgotPasswordHandler(request) {
  try {
    const body = await request.json()
    const { email } = body

    const result = await forgotPassword(email)

    return NextResponse.json({
      success: true,
      data: result.data,
      message: result.message,
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to process request' },
      { status: 500 }
    )
  }
}

export async function resetPasswordHandler(request) {
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: 'Token and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const result = await resetPassword(token, password)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, message: result.message })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to reset password' },
      { status: 500 }
    )
  }
}
