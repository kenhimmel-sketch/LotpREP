import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTeamSignupSchema, insertUserProfileSchema } from "@shared/schema";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth route to get current user
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

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

  // Get all parks
  app.get("/api/parks", async (req, res) => {
    try {
      const parks = await storage.getAllParks();
      res.json(parks);
    } catch (error: any) {
      console.error("Error getting parks:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get single park by code
  app.get("/api/parks/:parkCode", async (req, res) => {
    try {
      const { parkCode } = req.params;
      const park = await storage.getParkByCode(parkCode);
      if (!park) {
        return res.status(404).json({ error: "Park not found" });
      }
      res.json(park);
    } catch (error: any) {
      console.error("Error getting park:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Join a park (requires authentication)
  app.post("/api/parks/:parkId/join", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { parkId } = req.params;
      
      // Check if user already belongs to this park
      const existingProfile = await storage.getUserProfileByPark(userId, parkId);
      if (existingProfile) {
        return res.status(400).json({ error: "Already a member of this park" });
      }
      
      // Create new profile
      const profile = await storage.createUserProfile({
        userId,
        parkId,
        role: "member",
        wins: "0",
        gamesPlayed: "0",
      });
      
      res.json(profile);
    } catch (error: any) {
      console.error("Error joining park:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get user's park membership
  app.get("/api/user/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getUserProfile(userId);
      res.json(profile);
    } catch (error: any) {
      console.error("Error getting user profile:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get park members
  app.get("/api/parks/:parkId/members", async (req, res) => {
    try {
      const { parkId } = req.params;
      const members = await storage.getParkMembers(parkId);
      
      // Get user details for each member
      const membersWithDetails = await Promise.all(
        members.map(async (member) => {
          const user = await storage.getUser(member.userId);
          return {
            ...member,
            user: user ? {
              firstName: user.firstName,
              lastName: user.lastName,
              profileImageUrl: user.profileImageUrl,
              email: user.email,
            } : null,
          };
        })
      );
      
      res.json(membersWithDetails);
    } catch (error: any) {
      console.error("Error getting park members:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get park stats
  app.get("/api/parks/:parkId/stats", async (req, res) => {
    try {
      const { parkId } = req.params;
      let stats = await storage.getParkStats(parkId);
      
      // If no stats exist, create default ones
      if (!stats) {
        stats = await storage.upsertParkStats({
          parkId,
          totalMembers: "0",
          totalWins: "0",
          totalLosses: "0",
          championships: "0",
          currentSeason: "2025",
        });
      }
      
      res.json(stats);
    } catch (error: any) {
      console.error("Error getting park stats:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
