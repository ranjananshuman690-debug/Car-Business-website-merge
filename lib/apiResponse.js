export function successResponse(res, data, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  })
}

export function errorResponse(res, message = 'Something went wrong', statusCode = 400, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  })
}

export function paginatedResponse(res, data, page = 1, limit = 10, total = 0) {
  return res.status(200).json({
    success: true,
    data,
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages: Math.ceil(total / limit),
  })
}
