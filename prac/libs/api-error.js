class ApiError extends Error {
  constructor (statusCode, originalError = null) {
    const statusText = ApiError.getStatusText(statusCode)
    super(originalError ? originalError.message : statusText)
    this.statusCode = statusCode
    this.status = statusText
    this.originalError = originalError
  }

  // HTTP status code에 따른 text 반환
  static getStatusText (statusCode) {
    const statusTexts = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      500: 'Internal Server Error'
    }
    return statusTexts[statusCode] || 'Unknown Error'
  }

  // 각 HTTP status code에 맞는 인스턴스 생성
  static BAD_REQUEST (originalError) {
    return new ApiError(400, originalError)
  }

  static UNAUTHORIZED (originalError) {
    return new ApiError(401, originalError)
  }

  static FORBIDDEN (originalError) {
    return new ApiError(403, originalError)
  }

  static NOT_FOUND (originalError) {
    return new ApiError(404, originalError)
  }

  static CONFLICT (originalError) {
    return new ApiError(409, originalError)
  }

  static UNPROCESSABLE_ENTITY (originalError) {
    return new ApiError(422, originalError)
  }

  static INTERNAL_SERVER_ERROR (originalError) {
    return new ApiError(500, originalError)
  }
}

export default ApiError
