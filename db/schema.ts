import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createDeflate } from "zlib";

export const users = pgTable("users", {
    id: serial("id").primaryKey(), 
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    pfp: text("pfp"), // optional pfp
    createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(), 
    userId: serial("user_id").references(() => users.id),
    name: text("name").notNull(),
    schedule: varchar("location", { length: 255 }),
    professor: text("professor"),
    semester: text("semester"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(), 
    userId: serial("user_id").references(() => users.id),
    courseId: serial("course_id").references(() => courses.id),
    title: text("title").notNull(),
    description: text("description"),
    dueDate: timestamp("due_date"),
    status: varchar("status", { length: 50 }).default("pending"), // pending, done
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const userPreferences = pgTable("userPreferences", {
    id: serial("id"),
    userId: serial("user_id").references(() => users.id),
    darkMode: varchar("dark_mode", { length: 10 }).default("true"),
});

// WORRY ABT THIS LATER
// export const notes = pgTable("notes", {
//   id: serial("id").primaryKey(),
//   userId: serial("user_id").references(() => users.id),
//   courseId: serial("course_id").references(() => courses.id).nullable(),
//   title: varchar("title", { length: 255 }),
//   content: text("content"),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
// });