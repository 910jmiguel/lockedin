import { pgTable, serial, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createDeflate } from "zlib";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
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