import { Request, Response, NextFunction } from 'express';
import { ErrorCodes, ErrorResponse } from './error.types';

export class ApiError extends Error {
  public code: ErrorCodes;
  public details?: string;

  constructor(
    message: string,
    code: ErrorCodes = ErrorCodes.INTERNAL_SERVER_ERROR,
    details?: string
  ) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'ApiError';
  }

  static badRequest(message: string, details?: string): ApiError {
    return new ApiError(message, ErrorCodes.BAD_REQUEST, details);
  }

  static notFound(message: string): ApiError {
    return new ApiError(message, ErrorCodes.NOT_FOUND);
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(message, ErrorCodes.UNAUTHORIZED);
  }

  static forbidden(message: string): ApiError {
    return new ApiError(message, ErrorCodes.FORBIDDEN);
  }

  static conflict(message: string): ApiError {
    return new ApiError(message, ErrorCodes.CONFLICT);
  }

  static internal(message: string): ApiError {
    return new ApiError(message, ErrorCodes.INTERNAL_SERVER_ERROR);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    const errorResponse: ErrorResponse = {
      code: err.code,
      message: err.message,
      details: err.details,
      timestamp: new Date().toISOString(),
    };
    res.status(err.code).json(errorResponse);
  } else {
    // Error no manejado
    console.error(err);
    const errorResponse: ErrorResponse = {
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      timestamp: new Date().toISOString(),
    };
    res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};
