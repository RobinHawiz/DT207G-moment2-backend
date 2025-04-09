import BetterSqlite3 from "better-sqlite3";
import Database from "better-sqlite3";
import path from "path";

/**
 * Connects to a SQLite database.
 *
 * @returns A SQLite database connection
 * @throws If the database connection failed
 */
export async function connectToSQLiteDb(): Promise<BetterSqlite3.Database> {
  try {
    const dbConnection = new Database(path.resolve(__dirname, "../db/CVDb.db"));
    return dbConnection;
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
}
