import { type TeamSignup, type InsertTeamSignup } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createTeamSignup(signup: InsertTeamSignup): Promise<TeamSignup>;
  getTeamSignups(teamId: string): Promise<TeamSignup[]>;
}

export class MemStorage implements IStorage {
  private signups: Map<string, TeamSignup>;

  constructor() {
    this.signups = new Map();
  }

  async createTeamSignup(insertSignup: InsertTeamSignup): Promise<TeamSignup> {
    const id = randomUUID();
    const signup: TeamSignup = { 
      ...insertSignup, 
      id,
      message: insertSignup.message ?? null 
    };
    this.signups.set(id, signup);
    return signup;
  }

  async getTeamSignups(teamId: string): Promise<TeamSignup[]> {
    return Array.from(this.signups.values()).filter(
      (signup) => signup.teamId === teamId,
    );
  }
}

export const storage = new MemStorage();
