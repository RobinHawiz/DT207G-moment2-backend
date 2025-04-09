import { WorkExperienceService } from "./workExperienceService";
import { Request, Response } from "express";

/**
 * Handles GET /example
 *
 * Retrieves all example records and returns them in the response.
 *
 * @param _req - Unused Express Request object
 * @param res - Express Response object
 * @param WorkExperienceService - Injected service for retrieving example
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
 * Handles POST /example/insert
 *
 * Inserts a new example using the request body and returns a success message.
 *
 * @param req - Express Request object (expected to contain validated example payload)
 * @param res - Express Response object
 * @param workExperienceService - Injected service for inserting example
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
    console.error("Error inserting workExperience data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * Handles DELETE /example/delete
 *
 * Deletes an example based on the request input and returns a success message.
 *
 * @param req - Express Request object (expected to contain validated example ID)
 * @param res - Express Response object
 * @param workExperienceService - Injected service for deleting example
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
