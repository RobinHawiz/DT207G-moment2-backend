/**
 * Represents an error related to a specific input field, or a general/global issue (e.g., internal server errors).
 */
export type ResponseError = {
  /** The name of the field or issue this error refers to */
  field: string;
  /** A human-readable error message */
  message: string;
};
