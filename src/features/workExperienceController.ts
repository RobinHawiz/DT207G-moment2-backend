import { DomainError } from "../errors/DomainError";
import { WorkExperienceService } from "./workExperienceService";
import { Request, Response } from "express";

/**
 * Handles GET /work-experience
 *
 * Responds with all work experience records and status 200.
 *
 * @param _req - Express request object (unused)
 * @param res - Express response object
 * @param workExperienceService - Service for retrieving word experience data
 */
export async function getAllWorkExperiences(
  _req: Request,
  res: Response,
  workExperienceService: WorkExperienceService
): Promise<void> {
  try {
    const workExperiences = await workExperienceService.getAllWorkExperiences();
    res.status(200).json(workExperiences);
  } catch (error: any) {
    console.error("Error retrieving work experience data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * Handles POST /work-experience/insert
 *
 * Creates a new work experience from the request body.
 * Responds with status 201 and a success message.
 *
 * @param req - Express request object containing a validated work experience payload)
 * @param res - Express response object
 * @param workExperienceService - Service for inserting word experience data
 */
export async function insertWorkExperience(
  req: Request,
  res: Response,
  workExperienceService: WorkExperienceService
): Promise<void> {
  try {
    await workExperienceService.createWorkExperience(req);
    res.status(201).json({ message: "Work experience inserted successfully" });
  } catch (error: any) {
    if (error instanceof DomainError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Error inserting workExperience data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

/**
 * Handles DELETE /work-experience/delete
 *
 * Deletes a work experience based on request input.
 * Responds with status 204 on success.
 *
 * @param req - Express request object containing the ID of the work experience to delete
 * @param res - Express response object
 * @param workExperienceService - Service for deleting work experience data
 */
export async function deleteWorkExperience(
  req: Request,
  res: Response,
  workExperienceService: WorkExperienceService
): Promise<void> {
  try {
    await workExperienceService.deleteWorkExperience(req);
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting workExperience:", error);
    res.status(404).json({ error: error.message });
  }
}
