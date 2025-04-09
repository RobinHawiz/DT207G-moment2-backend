import z, { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const WorkExperienceSchema = z.object({
  id: z.number().optional(),
  companyName: z.string().min(1).max(100),
  jobTitle: z.string().min(1).max(100),
  workCityLocation: z.string().min(1).max(100),
  startDate: z
    .string()
    .date()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in YYYY-MM-DD format.",
    })
    .transform((val) => new Date(val)),
  endDate: z
    .string()
    .date()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in YYYY-MM-DD format",
    })
    .transform((val) => new Date(val)),
  description: z.string().min(1).max(1000),
});

type WorkExperience = z.infer<typeof WorkExperienceSchema>;

/**
 * Validation for creating or updating a new work experience.
 *
 * Validates the request body to ensure required fields are present and formatted correctly:
 * - id: optional non-empty number (is required when performing update operations)
 * - companyName: non-empty string, max 100 characters
 * - jobTitle: non-empty string, max 100 characters
 * - workCityLocation: non-empty string, max 100 characters
 * - startDate: non-empty string with date format: YYYY-MM-DD
 * - endDate: non-empty string with date format: YYYY-MM-DD
 * - description: non-empty string, max 1000 characters
 *
 */
export const workExperienceValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const data: WorkExperience = req.body;
  try {
    req.body = WorkExperienceSchema.parse(data);
    next();
  } catch (error) {
    res.status(400).json({ errors: (error as ZodError).issues });
  }
};

const WorkExperienceIdSchema = z.object({
  id: z.number(),
});

type WorkExperienceId = z.infer<typeof WorkExperienceIdSchema>;

/**
 * Validation for work experience ID.
 *
 * Used when performing operations that require a work experience ID (e.g., delete).
 * - id: required, must be an integer
 */
export const workExperienceIdValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const data: WorkExperienceId = req.body;
  try {
    req.body = WorkExperienceIdSchema.parse(data);
    next();
  } catch (error) {
    res.status(400).json({ errors: (error as ZodError).issues });
  }
};
