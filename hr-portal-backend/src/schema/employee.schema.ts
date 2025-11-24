import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const employee = pgTable("employees", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 120 }).notNull().unique(),
  position: varchar("position", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export class schema{}