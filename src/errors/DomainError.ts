export class DomainError extends Error {
  name: string;
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = "DomainError";
    this.statusCode = statusCode;
  }
}
