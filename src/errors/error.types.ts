export enum ErrorCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export interface ErrorResponse {
  code: ErrorCodes;
  message: string;
  details?: string;
  timestamp: string;
}

export interface SingleValidationError {
  field: string;
  message: string;
}

export type ValidationErrorArray = SingleValidationError[];
