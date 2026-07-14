import { NextResponse } from 'next/server'

export function errorHandler(handler) {
  return async (req, ...args) => {
    try {
      return await handler(req, ...args)
    } catch (error) {
      console.error('API Error:', error)

      const message = error.message || 'Internal server error'
      const statusCode = error.statusCode || 500

      return NextResponse.json(
        {
          success: false,
          message: statusCode === 500 ? 'Internal server error. Please try again later.' : message,
        },
        { status: statusCode }
      )
    }
  }
}

export function withErrorHandling(handler) {
  return errorHandler(handler)
}
