export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number,
    public readonly details?: unknown,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details)
    this.name = 'ValidationError'
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string, details?: unknown) {
    super(message, 'EXTERNAL_SERVICE_ERROR', 502, details)
    this.name = 'ExternalServiceError'
  }
}

export class ConfigurationError extends AppError {
  constructor(message: string) {
    super(message, 'CONFIGURATION_ERROR', 500)
    this.name = 'ConfigurationError'
  }
}

export interface ApiErrorResponse {
  error: {
    message: string
    code: string
  }
}

export function toErrorResponse(error: unknown): {
  body: ApiErrorResponse
  status: number
} {
  if (error instanceof AppError) {
    return {
      body: { error: { message: error.message, code: error.code } },
      status: error.statusCode,
    }
  }

  if (error instanceof SyntaxError) {
    return {
      body: { error: { message: 'Invalid JSON in request or response', code: 'PARSE_ERROR' } },
      status: 400,
    }
  }

  return {
    body: { error: { message: 'An unexpected error occurred', code: 'INTERNAL_ERROR' } },
    status: 500,
  }
}
