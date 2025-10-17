import { 
  type TeamSignup, 
  type InsertTeamSignup, 
  teamSignups,
  users,
  type User,
  type UpsertUser,
  userProfiles,
  type UserProfile,
  type InsertUserProfile,
  parkStats,
  type ParkStats,
  type InsertParkStats,
} from "@shared/schema";
import { db } from "./db";
import { eq, or, and } from "drizzle-orm";

export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Team signup operations
  createTeamSignup(signup: InsertTeamSignup): Promise<TeamSignup>;
  getTeamSignups(teamId: string): Promise<TeamSignup[]>;
  
  // User profile operations
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  getUserProfileByPark(userId: string, parkId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(id: string, profile: Partial<UserProfile>): Promise<UserProfile>;
  getParkMembers(parkId: string): Promise<UserProfile[]>;
  
  // Park stats operations
  getParkStats(parkId: string): Promise<ParkStats | undefined>;
  upsertParkStats(stats: InsertParkStats): Promise<ParkStats>;
  updateParkMemberCount(parkId: string): Promise<void>;
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

  // User profile operations
  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
    return profile;
  }

  async getUserProfileByPark(userId: string, parkId: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(
        and(
          eq(userProfiles.userId, userId),
          eq(userProfiles.parkId, parkId)
        )
      );
    return profile;
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [newProfile] = await db
      .insert(userProfiles)
      .values(profile)
      .returning();
    
    // Update park member count
    await this.updateParkMemberCount(newProfile.parkId);
    
    return newProfile;
  }

  async updateUserProfile(id: string, profile: Partial<UserProfile>): Promise<UserProfile> {
    const [updatedProfile] = await db
      .update(userProfiles)
      .set(profile)
      .where(eq(userProfiles.id, id))
      .returning();
    return updatedProfile;
  }

  async getParkMembers(parkId: string): Promise<UserProfile[]> {
    return await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.parkId, parkId));
  }

  // Park stats operations
  async getParkStats(parkId: string): Promise<ParkStats | undefined> {
    const [stats] = await db
      .select()
      .from(parkStats)
      .where(eq(parkStats.parkId, parkId));
    return stats;
  }

  async upsertParkStats(stats: InsertParkStats): Promise<ParkStats> {
    const existing = await this.getParkStats(stats.parkId);
    
    if (existing) {
      const [updated] = await db
        .update(parkStats)
        .set({
          ...stats,
          updatedAt: new Date(),
        })
        .where(eq(parkStats.parkId, stats.parkId))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(parkStats)
        .values(stats)
        .returning();
      return created;
    }
  }

  async updateParkMemberCount(parkId: string): Promise<void> {
    const members = await this.getParkMembers(parkId);
    const count = members.length.toString();
    
    await this.upsertParkStats({
      parkId,
      totalMembers: count,
    });
  }
}

export const storage = new DbStorage();
