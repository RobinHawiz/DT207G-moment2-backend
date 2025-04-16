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
    companyName: z
      .string()
      .min(1, {
        message: "The company name has to be at least 1 character long.",
      })
      .max(100, {
        message: "The company name cannot exceed 100 characters.",
      }),
    jobTitle: z
      .string()
      .min(1, {
        message: "The job title has to be at least 1 character long.",
      })
      .max(100, {
        message: "The job title cannot exceed 100 characters.",
      }),
    workCityLocation: z
      .string()
      .min(1, {
        message:
          "The work city location name has to be at least 1 character long.",
      })
      .max(100, {
        message: "The work city location name cannot exceed 100 characters.",
      }),
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
    description: z
      .string()
      .min(1, {
        message: "The description has to be at least 1 character long.",
      })
      .max(1000, {
        message: "The description cannot exceed 1000 characters.",
      }),
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
