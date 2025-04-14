/**
 * Represents a domain-level error, used to distinguish business logic failures from other error types.
 */
export class DomainError extends Error {
  /** Identifies the error as a domain error for filtering in error handlers */
  name: string;

  /** The name of the field or issue this error refers to */
  field: string;

  /** The HTTP status code to return for this error (defaults to 400) */
  statusCode: number;

  constructor(field: string, message: string, statusCode: number = 400) {
    super(message);
    this.name = "DomainError";
    this.field = field;
    this.statusCode = statusCode;
  }
}
