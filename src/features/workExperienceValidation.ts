import { body, ValidationChain } from "express-validator";

/**
 * Validation chain for creating a new work experience.
 *
 * Validates the request body to ensure required fields are present and formatted correctly:
 * - companyName: non-empty string
 * - jobTitle: non-empty string
 * - workCityLocation: non-empty string
 * - startDate: non-empty string
 * - endDate: non-empty string
 * - description: non-empty string
 *
 */
export const workExperienceValidation: Array<ValidationChain> = [
  body("companyName")
    .notEmpty()
    .withMessage("companyName cannot be empty.")
    .isString()
    .withMessage("companyName must be a string."),

  body("jobTitle")
    .notEmpty()
    .withMessage("jobTitle cannot be empty.")
    .isString()
    .withMessage("jobTitle must be a string."),

  body("workCityLocation")
    .notEmpty()
    .withMessage("workCityLocation cannot be empty.")
    .isString()
    .withMessage("workCityLocation must be a string."),

  body("startDate")
    .notEmpty()
    .withMessage("startDate cannot be empty.")
    .isString()
    .withMessage("startDate must be a string."),

  body("endDate")
    .notEmpty()
    .withMessage("endDate cannot be empty.")
    .isString()
    .withMessage("endDate must be a string."),

  body("description")
    .notEmpty()
    .withMessage("description cannot be empty.")
    .isString()
    .withMessage("description must be a string."),
];

/**
 * Validation chain for work experience ID.
 *
 * Used when performing operations that require a work experience ID (e.g., delete).
 * - id: required, must be an integer
 */
export const workExperienceIdValidation: Array<ValidationChain> = [
  body("id")
    .notEmpty()
    .withMessage("Id cannot be empty.")
    .isInt()
    .withMessage("Id must be an integer."),
];
