import {
  WorkExperiencePayload,
  WorkExperienceEntity,
} from "../models/workExperienceEntity";
import { WorkExperienceRepository } from "./workExperienceRepository";

/**
 * SQLite implementation of the work experience repository interface.
 *
 * Encapsulates all persistence logic for interacting with the WorkExperience table
 * via prepared statements in a SQLite database.
 */
export class SQLiteWorkExperienceRepository
  implements WorkExperienceRepository
{
  constructor(
    private readonly dbConnection: import("better-sqlite3").Database
  ) {}
  async findAll(): Promise<Array<WorkExperienceEntity>> {
    const rows = this.dbConnection
      .prepare("select * from WorkExperiences")
      .all() as Array<WorkExperienceEntity>;
    return rows;
  }

  insert(data: WorkExperiencePayload): Promise<void> {
    try {
      const statement = this.dbConnection
        .prepare(`insert into WorkExperiences (CompanyName, JobTitle, WorkCityLocation, StartDate, EndDate, Description)
                  values(@companyName, @jobTitle, @workCityLocation, @startDate, @endDate, @description)`);
      statement.run(data);
      return Promise.resolve();
    } catch (error) {
      console.error("Database insertion error:", error);
      throw error;
    }
  }

  deleteById(id: number): Promise<void> {
    try {
      const statement = this.dbConnection.prepare(
        `delete from WorkExperiences where Id = @id`
      );
      statement.run({ id });
      return Promise.resolve();
    } catch (error) {
      console.error("Database deletion error:", error);
      throw error;
    }
  }

  exists(id: number): Promise<boolean> {
    try {
      const statement = this.dbConnection.prepare(
        `select * from WorkExperiences where Id = @id`
      );
      const row = !!statement.get({ id });
      return Promise.resolve(row);
    } catch (error) {
      console.error("Database lookup error:", error);
      throw error;
    }
  }
}
