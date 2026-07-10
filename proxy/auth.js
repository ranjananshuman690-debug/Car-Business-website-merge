import { NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/auth'

export function withAuth(handler) {
  return async (req) => {
    try {
      const user = authenticateRequest(req)

      if (!user) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized. Please log in.' },
          { status: 401 }
        )
      }

      return handler(req, user)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return NextResponse.json(
        { success: false, message: 'Authentication failed.' },
        { status: 401 }
      )
    }
  }
}

export function withAdmin(handler) {
  return withAuth(async (req, user) => {
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden. Admin access required.' },
        { status: 403 }
      )
    }
    return handler(req, user)
  })
}

export function withSuperAdmin(handler) {
  return withAuth(async (req, user) => {
    if (user.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden. Super admin access required.' },
        { status: 403 }
      )
    }
    return handler(req, user)
  })
}
