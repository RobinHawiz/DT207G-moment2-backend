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
 */
export function toDbPayload(
  data: WorkExperienceEntity | WorkExperiencePayload
): WorkExperienceDbPayload {
  return {
    ...data,
    startDate: data.startDate.toISOString().split("T")[0],
    endDate: data.endDate.toISOString().split("T")[0],
  };
}
