import { ZodError } from "zod";
import { ResponseError } from "./responseError";

/**
 * Converts a ZodError into a simplified array of error objects.
 * @param error - A ZodError instance containing validation issues
 * @returns An array of response friendly errors
 */
export function formatZodError(error: ZodError): Array<ResponseError> {
  return error.errors.map(
    (e): ResponseError => ({
      field: String(e.path[0]),
      message: e.message,
    })
  );
}
