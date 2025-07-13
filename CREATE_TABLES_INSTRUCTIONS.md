# 🗄️ Create Database Tables in Supabase

The error `The table 'public.User' does not exist` means your database tables haven't been created yet. Here's how to fix it:

## Option 1: Using Supabase SQL Editor (Recommended)

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard/project/vmgjnvgihaitmgfwpkra

2. **Click on "SQL Editor"** in the left sidebar

3. **Copy and paste the entire contents** of the `supabase-setup.sql` file

4. **Click "Run"** to execute the SQL

5. You should see "Success. No rows returned" - this means tables were created!

## Option 2: Using Prisma CLI (If Option 1 doesn't work)

Run this command in your terminal:
```bash
cd 14th-ward-app
dotenv -e .env.local -- npx prisma db push --accept-data-loss
```

## Option 3: Manual Table Creation via Supabase UI

If both options fail, go to Supabase Table Editor and create these tables manually:

### User Table:
- id (text, primary key)
- email (text, unique)
- name (text)
- password (text)
- role (text, default: 'MEMBER')
- createdAt (timestamp)
- updatedAt (timestamp)

### Attendance Table:
- id (text, primary key)
- date (timestamp)
- userId (text, foreign key to User.id)
- present (boolean)
- imageUrl (text, nullable)
- createdAt (timestamp)
- updatedAt (timestamp)

### Meeting Table:
- id (text, primary key)
- title (text)
- date (timestamp)
- type (text)
- recordingUrl (text, nullable)
- notes (text, nullable)
- createdBy (text, foreign key to User.id)
- createdAt (timestamp)
- updatedAt (timestamp)

### Transcription Table:
- id (text, primary key)
- meetingId (text, foreign key to Meeting.id)
- content (text)
- summary (text, nullable)
- status (text, default: 'PENDING')
- createdBy (text, foreign key to User.id)
- createdAt (timestamp)
- updatedAt (timestamp)

## Verify Tables Were Created

1. Go to Supabase Table Editor
2. You should see all 4 tables: User, Attendance, Meeting, Transcription
3. Try registering again at your app!

## Still Having Issues?

Make sure:
- Your Supabase project is active (not paused)
- The DATABASE_URL in Vercel matches your Supabase connection string
- You're using the connection string with `?pgbouncer=true` at the end 