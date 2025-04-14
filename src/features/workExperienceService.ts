import {
  WorkExperiencePayload,
  WorkExperienceEntity,
} from "../models/workExperienceEntity";
import { WorkExperienceRepository } from "./workExperienceRepository";
import { toDbPayload } from "./workExperienceUtils";
import { DomainError } from "../errors/domainError";

/**
 * Service layer for handling business logic related to work experience entities.
 *
 * - Receives a repository abstraction for data access
 * - Contains validation and domain rules around work experience operations
 * - Keeps controller layer free from business rules
 */
export class WorkExperienceService {
  /**
   * Constructs a new instance of the WorkExperienceService.
   *
   * @param repo - A WorkExperienceRepository instance.
   */
  constructor(private readonly repo: WorkExperienceRepository) {}

  /**
   * Retrieves all work experiences from the database.
   *
   * @returns An array of work experience records
   */
  async getAllWorkExperiences(): Promise<Array<WorkExperienceEntity>> {
    return this.repo.findAll();
  }

  /**
   * Inserts a new work experiences into the database using request body data.
   *
   * @param payload - A validated work experiences payload
   * @throws DomainError if startDate is after endDate
   */
  async createWorkExperience(payload: WorkExperiencePayload): Promise<void> {
    const dbPayload = toDbPayload(payload);
    await this.repo.insert(dbPayload);
  }

  /**
   * Updates an existing work experience if it exists in the database using a payload.
   *
   * @param id - A numeric work experience ID
   * @param payload - A validated work experience payload
   * @throws DomainError if startDate is after endDate
   * @throws DomainError if the work experience does not exist
   */
  async updateWorkExperience(
    id: number,
    payload: WorkExperiencePayload
  ): Promise<void> {
    const workExperienceExists: boolean = await this.repo.exists(id);
    if (!workExperienceExists) {
      throw new DomainError(
        "id",
        "The work experience with this Id does not exist!"
      );
    }
    const dbPayload = toDbPayload(payload);
    await this.repo.update(id, dbPayload);
  }

  /**
   * Deletes a work experience if it exists in the database.
   *
   * @param id - A numeric work experience ID
   * @throws DomainError if the work experience does not exist
   */
  async deleteWorkExperience(id: number): Promise<void> {
    const workExperienceExists: boolean = await this.repo.exists(id);
    if (!workExperienceExists) {
      throw new DomainError(
        "id",
        "The work experience with this Id does not exist!"
      );
    }
    await this.repo.deleteById(id);
  }
}
