import { 
  type TeamSignup, 
  type InsertTeamSignup, 
  teamSignups,
  users,
  type User,
  type UpsertUser,
} from "@shared/schema";
import { db } from "./db";
import { eq, or } from "drizzle-orm";

export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Team signup operations
  createTeamSignup(signup: InsertTeamSignup): Promise<TeamSignup>;
  getTeamSignups(teamId: string): Promise<TeamSignup[]>;
}

export class DbStorage implements IStorage {
  // User operations for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUsers = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.id, userData.id!),
          eq(users.email, userData.email!)
        )
      )
      .limit(1);

    if (existingUsers.length > 0) {
      const existingUser = existingUsers[0];
      const [user] = await db
        .update(users)
        .set({
          ...userData,
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser.id))
        .returning();
      return user;
    } else {
      const [user] = await db
        .insert(users)
        .values(userData)
        .returning();
      return user;
    }
  }

  // Team signup operations
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
