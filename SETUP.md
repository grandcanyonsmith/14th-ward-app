# 14th Ward App - Quick Setup Guide

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/grandcanyonsmith/14th-ward-app.git
   cd 14th-ward-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Then edit `.env.local` with your actual values:
   - Set up a PostgreSQL database and add the connection string
   - Generate a NextAuth secret: `openssl rand -base64 32`
   - Get an OpenAI API key from https://platform.openai.com/api-keys
   - Generate a JWT secret

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   Visit http://localhost:3000

## 📦 Features Available

- **User Authentication**: Register at `/auth/register` and login at `/auth/login`
- **Dashboard**: Access at `/dashboard` after logging in
- **Attendance Tracking**: Upload photos of attendance sheets
- **Meeting Management**: Schedule and track meetings
- **AI Transcription**: Upload audio/video files for transcription

## 🔧 Troubleshooting

- If you get database errors, make sure PostgreSQL is running and the connection string is correct
- For transcription features, ensure you have a valid OpenAI API key
- Check that all environment variables are set correctly

## 📝 Next Steps

1. Create an admin account by registering
2. Explore the dashboard features
3. Test attendance tracking with a sample image
4. Try uploading an audio file for transcription

## 🌐 Deployment

The app is ready for deployment on Vercel:
1. Push to GitHub (already done!)
2. Import the project on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

---

Repository: https://github.com/grandcanyonsmith/14th-ward-app 