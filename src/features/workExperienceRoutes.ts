import { Router, Request, Response } from "express";
import { WorkExperienceService } from "./workExperienceService";
import {
  getAllWorkExperiences,
  insertWorkExperience,
  deleteWorkExperience,
} from "./workExperienceController";
import {
  validate,
  WorkExperienceSchema,
  WorkExperienceIdSchema,
} from "./workExperienceValidation";
import { SQLiteWorkExperienceRepository } from "./sqliteWorkExperienceRepository";

/**
 * Factory function to create work experience related API routes.
 *
 */
export function workExperienceRoutes(
  db: import("better-sqlite3").Database
): Router {
  const router = Router();
  const sqliteWorkExperienceRepository = new SQLiteWorkExperienceRepository(db);
  const workExperienceService = new WorkExperienceService(
    sqliteWorkExperienceRepository
  );

  /**
   * GET /work-experience
   * Fetches all available examples.
   */
  router.get("/", async (req: Request, res: Response) => {
    try {
      await getAllWorkExperiences(req, res, workExperienceService);
    } catch (error: any) {
      console.error("Error in GET /work-experience:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  /**
   * POST /work-experience/insert
   * Inserts a new work experience after validating the request body.
   */
  router.post(
    "/insert",
    validate(WorkExperienceSchema),
    async (req: Request, res: Response) => {
      await insertWorkExperience(req, res, workExperienceService);
    }
  );

  /**
   * DELETE /work-experience/delete
   * Deletes a work experience by ID after validating the input.
   */
  router.delete(
    "/delete",
    validate(WorkExperienceIdSchema),
    async (req: Request, res: Response) => {
      await deleteWorkExperience(req, res, workExperienceService);
    }
  );

  return router;
}
