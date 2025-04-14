import z, { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { formatZodError } from "../errors/formatZodError";

/**
 * Validation schema for work experience payload.
 * Used for operations like update and delete.
 *
 * Validates the request body to ensure required fields are present and formatted correctly:
 * - companyName: non-empty string, max 100 characters
 * - jobTitle: non-empty string, max 100 characters
 * - workCityLocation: non-empty string, max 100 characters
 * - startDate: non-empty string with date format: YYYY-MM-DD
 * - endDate: non-empty string with date format: YYYY-MM-DD
 * - description: non-empty string, max 1000 characters
 *
 */

export const WorkExperienceSchema = z
  .object({
    companyName: z.string().min(1).max(100),
    jobTitle: z.string().min(1).max(100),
    workCityLocation: z.string().min(1).max(100),
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in YYYY-MM-DD format.",
      })
      .refine((val) => !!Date.parse(val), {
        message: "Invalid date.",
      })
      .transform((val) => new Date(val)),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in YYYY-MM-DD format",
      })
      .refine((val) => !!Date.parse(val), {
        message: "Invalid date.",
      })
      .transform((val) => new Date(val)),
    description: z.string().min(1).max(1000),
  })
  .strict();

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(formatZodError(error));
      } else {
        res
          .status(500)
          .json({ field: "server", message: "Internal Server Error" });
      }
    }
  };
