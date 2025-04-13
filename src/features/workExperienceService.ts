import { Request } from "express";
import {
  WorkExperiencePayload,
  WorkExperienceEntity,
} from "../models/workExperienceEntity";
import { WorkExperienceRepository } from "./workExperienceRepository";
import { toDbPayload } from "./workExperienceUtils";
import { DomainError } from "../errors/DomainError";

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
   * @param req - Express Request containing the validated work experiences payload
   * @throws DomainError if startDate is after endDate
   */
  async createWorkExperience(
    req: Request<unknown, unknown, WorkExperiencePayload>
  ): Promise<void> {
    const payload = toDbPayload(req.body);
    await this.repo.insert(payload);
  }

  /**
   * Updates an existing work experience if it exists in the database using request body data.
   *
   * @param req - Express Request containing the validated work experiences entity
   * @throws DomainError if startDate is after endDate
   */
  async updateWorkExperience(
    req: Request<unknown, unknown, WorkExperienceEntity>
  ): Promise<void> {
    const workExperienceExists: boolean = await this.repo.exists(req.body.id);
    if (!workExperienceExists) {
      throw new DomainError("The work experience with this Id does not exist!");
    }
    const payload = toDbPayload(req.body);
    await this.repo.update(req.body.id, payload);
  }

  /**
   * Deletes a work experience if it exists in the database.
   *
   * @param req - Express Request containing work experience ID in the body
   * @throws Error if the work experience does not exist
   */
  async deleteWorkExperience(req: Request): Promise<void> {
    const { id }: { id: number } = req.body;
    const workExperienceExists: boolean = await this.repo.exists(id);
    if (!workExperienceExists) {
      throw new DomainError("The work experience with this Id does not exist!");
    }
    await this.repo.deleteById(id);
  }
}
