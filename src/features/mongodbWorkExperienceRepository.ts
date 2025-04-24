import { Model } from "mongoose";
import {
  WorkExperienceEntity,
  WorkExperiencePayload,
} from "../models/workExperienceEntity";
import { WorkExperienceDocument } from "../models/workExperienceModel";
import { WorkExperienceRepository } from "./workExperienceRepository";

/**
 * MongoDB implementation of the work experience repository interface.
 *
 * Encapsulates all persistence logic for interacting with the WorkExperience collection.
 */
export class MongoDbWorkExperienceRepository
  implements WorkExperienceRepository
{
  constructor(private readonly model: Model<WorkExperienceDocument>) {}

  async findAll(): Promise<Array<WorkExperienceEntity>> {
    try {
      const documents = await this.model
        .find({})
        .lean<Array<WorkExperienceDocument>>();

      const entities: Array<WorkExperienceEntity> = documents.map((doc) => {
        const { _id, ...rest } = doc;
        return { id: _id.toString(), ...rest };
      });

      return entities;
    } catch (error) {
      console.error("Database fetching error:", error);
      throw error;
    }
  }

  async insert(payload: WorkExperiencePayload): Promise<void> {
    try {
      await this.model.create(payload);
    } catch (error) {
      console.error("Database insertion error:", error);
      throw error;
    }
  }

  async update(id: string, payload: WorkExperiencePayload): Promise<void> {
    try {
      await this.model.updateOne({ _id: id }, payload);
    } catch (error) {
      console.error("Database update error:", error);
      throw error;
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.model.deleteOne({ _id: id });
    } catch (error) {
      console.error("Database deletion error:", error);
      throw error;
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      return !!(await this.model.findById(id).exec());
    } catch (error) {
      console.error("Database lookup error:", error);
      throw error;
    }
  }
}
