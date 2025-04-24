import "./config/env"; // Import environment variables before any other modules touch process.env.
import express, { Express } from "express";
import cors from "cors";
import { corsOptions, connectToMongoDb } from "./config/index";
import { workExperienceRoutes } from "./features/workExperienceRoutes";
import { WorkExperienceModel } from "./models/workExperienceModel";

/**
 * Initializes the Express application with all middleware and route handlers.
 *
 * Note: Environment variables are loaded before this function runs via the top-level import of `./config/env.js`.
 * - Connects to the database
 * - Mounts JSON middleware
 * - Creates a /api/health check route
 * - Attaches route handlers for /api/work-experience
 *
 * @returns A fully configured Express application instance
 */
export async function createApp(): Promise<Express> {
  const app = express();
  // Connect to db
  await connectToMongoDb();
  const routes = workExperienceRoutes(WorkExperienceModel);
  // Middlewares
  app.use(cors(corsOptions));
  app.use(express.json());
  // Health check route
  app.get("/api/health", (_, res) => {
    res.status(200).send("OK");
  });
  // Mount work experience related routes
  app.use("/api/work-experience", routes);

  return app;
}
