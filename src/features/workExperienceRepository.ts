import {
  WorkExperienceEntity,
  WorkExperiencePayload,
} from "../models/workExperienceEntity";

/**
 * Interface for accessing and modifying work experience entities in a data source.
 *
 * Abstracts the persistence logic and exposes standard operations
 * for retrieving, creating, deleting, and checking existence of records.
 *
 * This allows the service layer to remain decoupled from the specific
 * database technology or access implementation.
 */
export interface WorkExperienceRepository {
  /**
   * Retrieves all work experience entities from the database.
   *
   * @returns A promise resolving to an array of work experience records.
   */
  findAll(): Promise<Array<WorkExperienceEntity>>;
  /**
   * Inserts a new work experience into the database.
   *
   * @param payload - A validated work experience payload containing required fields.
   * @throws If the database operation fails
   */
  insert(payload: WorkExperiencePayload): Promise<void>;
  /**
   * Updates an existing work experience in the database.
   *
   * @param id - The ID of the work experience to update.
   * @param payload - A validated work experience payload containing required fields.
   * @throws If the database operation fails
   */
  update(id: string, payload: WorkExperiencePayload): Promise<void>;
  /**
   * Deletes a work experience from the database by ID.
   *
   * @param id - The ID of the work experience to delete.
   * @throws If the database operation fails
   */
  deleteById(id: string): Promise<void>;
  /**
   * Checks if a work experience exists in the database by ID.
   *
   * @param id - The ID of the work experience to check.
   * @returns A boolean indicating whether the work experience exists.
   * @throws If the database operation fails
   */
  exists(id: string): Promise<boolean>;
}
