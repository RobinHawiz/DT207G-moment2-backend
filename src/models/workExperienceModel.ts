import mongoose, { Model, Schema } from "mongoose";
import { WorkExperienceEntity } from "./workExperienceEntity";

/**
 * Represents a MongoDB document version of a work experience entry.
 *
 * Matches the structure of WorkExperienceEntity but uses `_id` instead of `id`.
 */
export type WorkExperienceDocument = Omit<WorkExperienceEntity, "id"> & {
  _id: mongoose.Types.ObjectId;
};

/**
 * Defines the MongoDB schema for a work experience document and disables the version key (`__v`)
 * to avoid storing Mongoose related metadata.
 */
const WorkExperienceSchema = new Schema<WorkExperienceDocument>(
  {
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    workCityLocation: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

/**
 * Mongoose model for the "WorkExperience" collection.
 *
 * Provides typed access to MongoDB documents using the WorkExperienceDocument shape.
 */
export const WorkExperienceModel: Model<WorkExperienceDocument> =
  mongoose.model("WorkExperience", WorkExperienceSchema);
