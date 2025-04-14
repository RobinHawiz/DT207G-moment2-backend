import z, { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { formatZodError } from "../errors/formatZodError";

/**
 * Validation schema for a complete work experience entity.
 * Used for operations like update, where all fields including `id` are required.
 *
 * Validates the request body to ensure required fields are present and formatted correctly:
 * - id: non-empty positive number
 * - companyName: non-empty string, max 100 characters
 * - jobTitle: non-empty string, max 100 characters
 * - workCityLocation: non-empty string, max 100 characters
 * - startDate: non-empty string with date format: YYYY-MM-DD
 * - endDate: non-empty string with date format: YYYY-MM-DD
 * - description: non-empty string, max 1000 characters
 *
 */

export const WorkExperienceEntitySchema = z.object({
  id: z.number().positive(),
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
});

/**
 * Validation schema for creating a new work experience.
 *
 * Used for insert operations. Has the same shape as WorkExperienceEntitySchema,
 * but excludes the `id` field since it's assigned by the database.
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

export const WorkExperiencePayloadSchema = WorkExperienceEntitySchema.omit({
  id: true,
});

/**
 * Validation for work experience ID.
 *
 * Used when performing operations that require a work experience ID (e.g., delete).
 * - id: required, must be an integer
 */

export const WorkExperienceIdSchema = z.object({
  id: z.number(),
});

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
