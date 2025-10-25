# Migration Guide: Neon to Supabase

## What's Changed

### Files Modified:

- `lib/supabase.ts` - New Supabase client configuration
- `drizzle.config.ts` - Updated to use Supabase connection
- `db/drizzle.ts` - Updated to use postgres driver instead of neon-http
- `.env.example` - Updated environment variables template
- `package.json` - Added `postgres` dependency, removed `@neondatabase/serverless`

### Files Created:

- `supabase-migration.sql` - SQL script to set up your schema in Supabase

## Next Steps for You:

### 1. Set up Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and API keys

### 2. Update Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### 3. Run Database Migration

1. In Supabase Dashboard, go to SQL Editor
2. Copy and paste the contents of `supabase-migration.sql`
3. Run the script to create your tables

### 4. Export Data from Neon (if you have existing data)

If you have existing data in Neon:

1. Export your data: `pg_dump your_neon_url > backup.sql`
2. Clean the SQL file to only include INSERT statements
3. Run the INSERT statements in Supabase SQL Editor

### 5. Test the Migration

```bash
npm run dev
```

## What You Need to Verify:

1. **Authentication still works** - Your Better Auth setup should work the same
2. **Database queries work** - All your existing API routes should work
3. **Drizzle migrations work** - You can run `npx drizzle-kit push` to sync schema changes

## Benefits You'll Get:

✅ **Row Level Security** - Automatic data isolation between users  
✅ **Real-time subscriptions** - For live updates if needed  
✅ **Built-in auth** - Option to switch to Supabase Auth later  
✅ **File storage** - For course materials, profile images  
✅ **Better monitoring** - Built-in database monitoring  
✅ **Automatic backups** - Daily backups included

## Rollback Plan:

If something goes wrong, you can revert by:

1. Changing `SUPABASE_DATABASE_URL` back to your Neon `DATABASE_URL`
2. Reverting the changes in `db/drizzle.ts` to use `drizzle-orm/neon-http`

## Questions?

Let me know if you need help with any step!
