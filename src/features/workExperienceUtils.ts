import { DomainError } from "../errors/domainError";
import {
  WorkExperienceDbPayload,
  WorkExperienceEntity,
  WorkExperiencePayload,
} from "../models/workExperienceEntity";

/**
 * Validates domain logic and converts a work experience object into a DB payload.
 *
 * @param data - A work experience object to validate and convert
 * @returns A validated DB payload
 * @throws DomainError if startDate is after endDate
 */
export function toDbPayload(
  data: WorkExperienceEntity | WorkExperiencePayload
): WorkExperienceDbPayload {
  if (data.startDate > data.endDate) {
    throw new DomainError("startDate", "Start date must be before end date.");
  }

  return {
    ...data,
    startDate: data.startDate.toISOString().split("T")[0],
    endDate: data.endDate.toISOString().split("T")[0],
  };
}
