import {pgTable, text, serial, timestamp} from "drizzle-orm/pg-core"

export const users = pgTable("users",{
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
})