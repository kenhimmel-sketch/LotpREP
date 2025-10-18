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

  // Free signup endpoint (no auth required)
  app.post("/api/signup", async (req, res) => {
    try {
      const { firstName, lastName, email, phone, experience } = req.body;
      
      // Validate required fields
      if (!firstName || !lastName || !email || !experience) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create or update user (upsert by email)
      const user = await storage.upsertUser({
        email,
        firstName,
        lastName,
        phone: phone || null,
        experience,
      });

      res.json({ success: true, user });
    } catch (error: any) {
      console.error("Signup error:", error);
      res.status(500).json({ error: error.message || "Failed to create account" });
    }
  });

  // Get badge by user email
  app.get("/api/badge", async (req, res) => {
    try {
      const { email } = req.query;
      
      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Email is required" });
      }

      // Get user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Get badge
      const badge = await storage.getBadgeByUserId(user.id);
      if (!badge) {
        return res.status(404).json({ error: "Badge not found. Please choose a park first." });
      }

      res.json(badge);
    } catch (error: any) {
      console.error("Get badge error:", error);
      res.status(500).json({ error: error.message || "Failed to get badge" });
    }
  });

  // Choose park endpoint (saves park choice to user profile)
  app.post("/api/choose-park", async (req, res) => {
    try {
      const { parkCode, email } = req.body;
      
      if (!parkCode || !email) {
        return res.status(400).json({ error: "Park code and email are required" });
      }

      // Verify park exists
      const park = await storage.getParkByCode(parkCode);
      if (!park) {
        return res.status(404).json({ error: "Park not found" });
      }

      // Get user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found. Please sign up first." });
      }

      // Check if badge already exists
      let badge = await storage.getBadgeByUserId(user.id);
      
      if (!badge) {
        // Generate member ID
        const memberId = await storage.generateMemberId(parkCode);

        // Create badge record
        badge = await storage.createBadge({
          userId: user.id,
          parkCode: parkCode,
          memberId: memberId,
          displayName: `${user.firstName} ${user.lastName}`,
          badgeData: {
            parkName: park.name,
            parkColor: park.colorPrimary,
            role: "Member",
          },
        });
      }

      // Update user's chosen park in users table
      await storage.updateUserParkChoice(email, parkCode);

      // Create user profile with park association
      // First check if profile already exists for this user/park combo
      const existingProfile = await storage.getUserProfileByPark(user.id, park.id);
      
      let profile;
      if (existingProfile) {
        // Update existing profile
        profile = await storage.updateUserProfile(existingProfile.id, {
          parkId: park.id,
        });
      } else {
        // Create new profile
        profile = await storage.createUserProfile({
          userId: user.id,
          parkId: park.id,
          role: "member",
        });
      }

      res.json({ success: true, user, park, profile, badge });
    } catch (error: any) {
      console.error("Choose park error:", error);
      res.status(500).json({ error: error.message || "Failed to choose park" });
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

  // Share code endpoint
  const { getShareCode } = await import("./shareCode");
  app.get("/api/share-code/:filePath", getShareCode);

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
