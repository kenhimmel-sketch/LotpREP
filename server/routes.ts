import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTeamSignupSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Test route to create a team signup
  app.post("/api/team-signups", async (req, res) => {
    try {
      const data = insertTeamSignupSchema.parse(req.body);
      const signup = await storage.createTeamSignup(data);
      res.json(signup);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Test route to get team signups by team ID
  app.get("/api/team-signups/:teamId", async (req, res) => {
    try {
      const signups = await storage.getTeamSignups(req.params.teamId);
      res.json(signups);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
