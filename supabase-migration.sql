-- Migration script for Supabase
-- Run this in Supabase SQL Editor after creating your project

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user table (if not using Supabase Auth)
-- Note: If you're using Supabase Auth, you can reference auth.users instead
CREATE TABLE "user" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "email_verified" BOOLEAN NOT NULL DEFAULT FALSE,
    "image" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create session table for Better Auth
CREATE TABLE "session" (
    "id" TEXT PRIMARY KEY,
    "expires_at" TIMESTAMP NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

-- Create account table for Better Auth
CREATE TABLE "account" (
    "id" TEXT PRIMARY KEY,
    "account_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "id_token" TEXT,
    "access_token_expires_at" TIMESTAMP,
    "refresh_token_expires_at" TIMESTAMP,
    "scope" TEXT,
    "password" TEXT,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL
);

-- Create verification table for Better Auth
CREATE TABLE "verification" (
    "id" TEXT PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expires_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create courses table
CREATE TABLE "courses" (
    "id" SERIAL PRIMARY KEY,
    "user_id" TEXT NOT NULL REFERENCES "user"("id"),
    "static_course_id" TEXT,
    "professor_name" TEXT,
    "professor_email" TEXT,
    "description" TEXT,
    "class_website" TEXT,
    "location" TEXT,
    "office_hours" TEXT,
    "semester" VARCHAR(100),
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "user_id" TEXT NOT NULL REFERENCES "user"("id"),
    "course_id" INTEGER REFERENCES "courses"("id"),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "due_date" TIMESTAMP,
    "status" VARCHAR(50) DEFAULT 'pending',
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create user preferences table
CREATE TABLE "userPreferences" (
    "id" SERIAL,
    "user_id" TEXT NOT NULL REFERENCES "user"("id"),
    "dark_mode" VARCHAR(10) DEFAULT 'true'
);

-- Create todo items table
CREATE TABLE "todo_items" (
    "id" SERIAL PRIMARY KEY,
    "user_id" TEXT NOT NULL REFERENCES "user"("id"),
    "group_title" VARCHAR(255),
    "text" VARCHAR(255) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for data protection
ALTER TABLE "courses" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "tasks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "userPreferences" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "todo_items" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only access their own data

-- Courses policies
CREATE POLICY "Users can view their own courses" ON "courses"
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own courses" ON "courses"
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own courses" ON "courses"
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own courses" ON "courses"
    FOR DELETE USING (auth.uid()::text = user_id);

-- Tasks policies
CREATE POLICY "Users can view their own tasks" ON "tasks"
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own tasks" ON "tasks"
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own tasks" ON "tasks"
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own tasks" ON "tasks"
    FOR DELETE USING (auth.uid()::text = user_id);

-- Todo items policies
CREATE POLICY "Users can view their own todos" ON "todo_items"
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own todos" ON "todo_items"
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own todos" ON "todo_items"
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own todos" ON "todo_items"
    FOR DELETE USING (auth.uid()::text = user_id);

-- User preferences policies
CREATE POLICY "Users can view their own preferences" ON "userPreferences"
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own preferences" ON "userPreferences"
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own preferences" ON "userPreferences"
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own preferences" ON "userPreferences"
    FOR DELETE USING (auth.uid()::text = user_id);

-- Create indexes for better performance
CREATE INDEX idx_courses_user_id ON "courses"(user_id);
CREATE INDEX idx_tasks_user_id ON "tasks"(user_id);
CREATE INDEX idx_tasks_course_id ON "tasks"(course_id);
CREATE INDEX idx_todo_items_user_id ON "todo_items"(user_id);
CREATE INDEX idx_session_user_id ON "session"(user_id);
CREATE INDEX idx_account_user_id ON "account"(user_id);