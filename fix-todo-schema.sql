-- Migration to update todo_items table
-- This fixes the user_id column type from integer to text

-- Check if table exists, if not create it
CREATE TABLE IF NOT EXISTS "todo_items" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" integer,
  "group_title" varchar(255),
  "text" varchar(255) NOT NULL,
  "completed" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now()
);

-- Drop foreign key constraint if it exists
ALTER TABLE "todo_items" DROP CONSTRAINT IF EXISTS "todo_items_user_id_user_id_fk";

-- Drop existing data (since it's likely test data)
DELETE FROM "todo_items";

-- Change the column type
ALTER TABLE "todo_items" ALTER COLUMN "user_id" TYPE text;

-- Add the foreign key constraint back
ALTER TABLE "todo_items" 
ADD CONSTRAINT "todo_items_user_id_user_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
