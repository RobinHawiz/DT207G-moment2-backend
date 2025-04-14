export class DomainError extends Error {
  name: string;
  field: string;
  statusCode: number;
  constructor(field: string, message: string, statusCode: number = 400) {
    super(message);
    this.name = "DomainError";
    this.field = field;
    this.statusCode = statusCode;
  }
}
