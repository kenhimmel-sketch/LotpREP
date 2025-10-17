import { type TeamSignup, type InsertTeamSignup, teamSignups } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createTeamSignup(signup: InsertTeamSignup): Promise<TeamSignup>;
  getTeamSignups(teamId: string): Promise<TeamSignup[]>;
}

export class DbStorage implements IStorage {
  async createTeamSignup(insertSignup: InsertTeamSignup): Promise<TeamSignup> {
    const [signup] = await db
      .insert(teamSignups)
      .values(insertSignup)
      .returning();
    return signup;
  }

  async getTeamSignups(teamId: string): Promise<TeamSignup[]> {
    return await db
      .select()
      .from(teamSignups)
      .where(eq(teamSignups.teamId, teamId));
  }
}

export const storage = new DbStorage();
