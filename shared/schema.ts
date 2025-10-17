import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
