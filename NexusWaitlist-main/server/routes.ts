import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistRegistrationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist registration endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body
      const validationResult = insertWaitlistRegistrationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          message: "Invalid input",
          errors: validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        });
      }

      const { fullName, email } = validationResult.data;

      // Check if email already exists
      const existingRegistration = await storage.getWaitlistRegistrationByEmail(email);
      if (existingRegistration) {
        return res.status(409).json({
          message: "This email is already registered on our waitlist"
        });
      }

      // Create waitlist registration
      const registration = await storage.createWaitlistRegistration({
        fullName,
        email
      });

      res.status(201).json({
        message: "Successfully joined the waitlist!",
        registration: {
          id: registration.id,
          fullName: registration.fullName,
          email: registration.email,
          createdAt: registration.createdAt
        }
      });

    } catch (error) {
      console.error("Error creating waitlist registration:", error);
      res.status(500).json({
        message: "Internal server error. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
