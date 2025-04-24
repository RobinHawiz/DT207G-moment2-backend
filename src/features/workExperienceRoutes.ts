import { Router, Request, Response } from "express";
import { WorkExperienceService } from "./workExperienceService";
import {
  getAllWorkExperiences,
  insertWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} from "./workExperienceController";
import { validate, WorkExperienceSchema } from "./workExperienceValidation";
import { WorkExperiencePayload } from "../models/workExperienceEntity";
import { WorkExperienceDocument } from "../models/workExperienceModel";
import { Model } from "mongoose";
import { MongoDbWorkExperienceRepository } from "./mongodbWorkExperienceRepository";

/**
 * Factory function to create work experience related API routes.
 *
 */
export function workExperienceRoutes(
  db: Model<WorkExperienceDocument>
): Router {
  const router = Router();
  const mongodbWorkExperienceRepository = new MongoDbWorkExperienceRepository(
    db
  );
  const workExperienceService = new WorkExperienceService(
    mongodbWorkExperienceRepository
  );

  /**
   * GET /api/work-experience
   * Fetches all available examples.
   */
  router.get("/", async (req: Request, res: Response) => {
    await getAllWorkExperiences(req, res, workExperienceService);
  });

  /**
   * POST /api/work-experience
   * Inserts a new work experience after validating the request body.
   */
  router.post(
    "/",
    validate(WorkExperienceSchema),
    async (req: Request, res: Response) => {
      await insertWorkExperience(req, res, workExperienceService);
    }
  );

  /**
   * PUT /api/work-experience/:id
   * Updates an exisiting work experience after validating the input.
   */
  router.put(
    "/:id",
    validate(WorkExperienceSchema),
    async (
      req: Request<{ id: string }, unknown, WorkExperiencePayload>,
      res: Response
    ) => {
      await updateWorkExperience(req, res, workExperienceService);
    }
  );

  /**
   * DELETE /api/work-experience/:id
   * Deletes an exisiting work experience.
   */
  router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
    await deleteWorkExperience(req, res, workExperienceService);
  });

  return router;
}
