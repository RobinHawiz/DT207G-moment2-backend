import { Request } from "express";
import {
  WorkExperiencePayload,
  WorkExperienceEntity,
} from "../models/workExperienceEntity";
import { WorkExperienceRepository } from "./workExperienceRepository";

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
   */
  async createWorkExperience(
    req: Request<unknown, unknown, WorkExperiencePayload>
  ): Promise<void> {
    await this.repo.insert(req.body);
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
      throw new Error("The work experience with this Id does not exist!");
    }
    await this.repo.deleteById(id);
  }
}
