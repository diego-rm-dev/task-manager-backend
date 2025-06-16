import { SingleValidationError, ValidationErrorArray } from './error.types';

export class ValidationErrorClass extends Error {
  public readonly errors: ValidationErrorArray;

  constructor(errors: ValidationErrorArray) {
    const firstError = errors[0];
    super(`Validation Error: ${firstError.message}`);
    this.errors = errors;
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationErrorClass.prototype);
  }

  static createFromErrors(errors: ValidationErrorArray): ValidationErrorClass {
    return new ValidationErrorClass(errors);
  }
}
