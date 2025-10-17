import { sql } from "drizzle-orm";
import { index, jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const teamSignups = pgTable("team_signups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teamId: text("team_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  experience: text("experience").notNull(),
  message: text("message"),
});

export const insertTeamSignupSchema = createInsertSchema(teamSignups).omit({
  id: true,
});

export type InsertTeamSignup = z.infer<typeof insertTeamSignupSchema>;
export type TeamSignup = typeof teamSignups.$inferSelect;

// User profile to track park membership and stats
export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  parkId: varchar("park_id").notNull(),
  role: varchar("role").default("member"), // member, captain, admin
  jerseyNumber: varchar("jersey_number"),
  position: varchar("position"),
  joinedAt: timestamp("joined_at").defaultNow(),
  wins: varchar("wins").default("0"),
  gamesPlayed: varchar("games_played").default("0"),
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  joinedAt: true,
});

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;

// Park stats table to track team statistics
export const parkStats = pgTable("park_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  parkId: varchar("park_id").notNull().unique(),
  totalMembers: varchar("total_members").default("0"),
  totalWins: varchar("total_wins").default("0"),
  totalLosses: varchar("total_losses").default("0"),
  championships: varchar("championships").default("0"),
  currentSeason: varchar("current_season").default("2025"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertParkStatsSchema = createInsertSchema(parkStats).omit({
  id: true,
  updatedAt: true,
});

export type InsertParkStats = z.infer<typeof insertParkStatsSchema>;
export type ParkStats = typeof parkStats.$inferSelect;
