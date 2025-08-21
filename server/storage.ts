import { type User, type InsertUser, type WaitlistRegistration, type InsertWaitlistRegistration, users, waitlistRegistrations } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWaitlistRegistration(registration: InsertWaitlistRegistration): Promise<WaitlistRegistration>;
  getWaitlistRegistrationByEmail(email: string): Promise<WaitlistRegistration | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createWaitlistRegistration(registration: InsertWaitlistRegistration): Promise<WaitlistRegistration> {
    const [waitlistRegistration] = await db
      .insert(waitlistRegistrations)
      .values(registration)
      .returning();
    return waitlistRegistration;
  }

  async getWaitlistRegistrationByEmail(email: string): Promise<WaitlistRegistration | undefined> {
    const [registration] = await db
      .select()
      .from(waitlistRegistrations)
      .where(eq(waitlistRegistrations.email, email));
    return registration || undefined;
  }
}

export const storage = new DatabaseStorage();
