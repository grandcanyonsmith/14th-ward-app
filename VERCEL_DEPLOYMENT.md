# Vercel Deployment Guide

## ✅ Fixed Issues

1. **NextAuth Configuration** - Moved `authOptions` to a separate file to fix Next.js 15 compatibility
2. **Next.config File** - Renamed from `.ts` to `.mjs` as required by Next.js
3. **OpenAI Client Initialization** - Made it lazy-loaded to prevent build errors
4. **Environment Variables** - Cleaned up sensitive data from env.example

## 🚀 Setting Up Vercel Deployment

### 1. Environment Variables Required in Vercel

Go to your Vercel project settings and add these environment variables:

```
# Database (from your Supabase project)
DATABASE_URL=postgres://postgres.vmgjnvgihaitmgfwpkra:aYxRE7v58gasnA3z@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true

# NextAuth (IMPORTANT: Change NEXTAUTH_URL to your Vercel URL)
NEXTAUTH_URL=https://14th-ward-app-git-main-grandcanyonsmiths-projects.vercel.app
NEXTAUTH_SECRET=hR91GPHdJF9gLoNGJ3MpNQjlG3Vy88FluYMpttu7YU+sUG8jsDoTCSAsIDJjWGWbp9NQJl/LazKpKn1rr0gJXw==

# JWT Secret
JWT_SECRET=hR91GPHdJF9gLoNGJ3MpNQjlG3Vy88FluYMpttu7YU+sUG8jsDoTCSAsIDJjWGWbp9NQJl/LazKpKn1rr0gJXw==

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://vmgjnvgihaitmgfwpkra.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZ2pudmdpaGFpdG1nZndwa3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MjMwNDksImV4cCI6MjA2Nzk5OTA0OX0.xtkjBEBk6XAsVYuV1cDJ0-i5aO_acyLiZBfkz4WtwUg
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZ2pudmdpaGFpdG1nZndwa3JhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjQyMzA0OSwiZXhwIjoyMDY3OTk5MDQ5fQ.Ouyn8kj4QjHYbgLAQb9nZF9tLlzV9_hz8nfetGMKlaA

# OpenAI (Optional - only if you want transcription features)
OPENAI_API_KEY=your-openai-api-key-here
```

### 2. Build & Development Settings

In Vercel project settings, ensure:
- Framework Preset: Next.js
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

### 3. Database Setup

After deployment, you need to create the database tables:

1. Go to your Supabase project SQL Editor
2. Run the Prisma-generated SQL by first generating it locally:
   ```bash
   npx prisma generate
   npx prisma db push --dry-run
   ```
3. Or use the Supabase dashboard to create tables manually based on the schema

### 4. Post-Deployment

1. Visit your deployed URL
2. Create the first admin account at `/auth/register`
3. Test all features to ensure they're working

## 🎉 Your App is Ready!

Once deployed, your app will be available at:
https://14th-ward-app-git-main-grandcanyonsmiths-projects.vercel.app

## 📝 Notes

- The app will work without an OpenAI API key, but transcription features will be disabled
- Make sure to update `NEXTAUTH_URL` to your production URL
- All Supabase credentials are already configured for your project 