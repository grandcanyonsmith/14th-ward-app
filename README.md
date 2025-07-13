# 14th Ward Management System

A comprehensive web application for managing ward activities, including attendance tracking, meeting management, and AI-powered transcription services.

## Features

### 🎯 Attendance Tracking
- Upload photos of attendance sheets
- Automatic checkmark extraction using OCR technology
- Manual attendance editing and verification
- Historical attendance records

### 📅 Meeting Management
- Schedule and organize ward meetings
- Support for in-person, Zoom, and hybrid meetings
- Meeting notes and documentation
- Integration with transcription services

### 🎙️ AI Transcription
- Upload audio/video recordings from meetings
- Automatic transcription using OpenAI Whisper
- AI-generated meeting summaries
- Support for Zoom call recordings

### 🔐 User Authentication
- Secure user registration and login
- Role-based access control (Admin, Leader, Member)
- Protected routes and secure data handling

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Image Processing**: Tesseract.js for OCR
- **Transcription**: OpenAI API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key (for transcription features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/14th-ward-app.git
cd 14th-ward-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ward14_db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key
JWT_SECRET=your-jwt-secret
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
14th-ward-app/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Protected dashboard pages
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable React components
│   ├── lib/                   # Utility functions and libraries
│   ├── types/                 # TypeScript type definitions
│   └── middleware.ts          # Next.js middleware
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static files
└── package.json
```

## Usage

### First Time Setup

1. Navigate to `/auth/register` to create an admin account
2. Log in with your credentials
3. Access the dashboard to start using the features

### Attendance Tracking

1. Go to Dashboard > Attendance
2. Upload a photo of your attendance sheet
3. Review and edit the extracted data
4. Save the attendance record

### Meeting Management

1. Go to Dashboard > Meetings
2. Click "New Meeting" to schedule a meeting
3. Fill in meeting details and type
4. For Zoom meetings, add the recording URL

### Transcriptions

1. Go to Dashboard > Transcriptions
2. Upload an audio or video file
3. Wait for the transcription to process
4. View the transcript and AI-generated summary

## Development

### Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Create a migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy
```

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security Considerations

- All user passwords are hashed using bcrypt
- Session management with secure JWT tokens
- Role-based access control for sensitive features
- Input validation and sanitization
- Secure file upload handling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue on GitHub or contact the development team.

## Acknowledgments

- Built for the 14th Ward community
- OCR powered by Tesseract.js
- Transcription powered by OpenAI
- UI components inspired by Tailwind UI 