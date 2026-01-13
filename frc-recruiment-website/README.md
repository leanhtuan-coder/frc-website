# FRC Recruitment Website

Production-ready registration website for student club recruitment with multi-step form, admin panel, and email confirmation.

## Features

- 🎨 Beautiful glassmorphism UI with animated background
- 📝 Multi-step registration form (Individual or Team mode)
- ⏱️ Countdown timer for registration deadline
- 📧 Email confirmation with ref code
- 🔐 Admin panel with password protection
- 📊 CSV export functionality
- 🛡️ Rate limiting and hCaptcha integration
- 📱 Fully responsive design
- 🌐 Vietnamese language support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Form Handling**: React Hook Form + Zod
- **Database**: Prisma ORM (SQLite for dev, Postgres for prod)
- **Email**: Nodemailer
- **Captcha**: hCaptcha
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frc-recruitment-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration (see Environment Variables below).

4. Set up the database:
```bash
pnpm db:push
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Club Information
CLUB_NAME="FPTU Robotics Club (FRC)"
SITE_TITLE="ĐĂNG KÝ THÀNH VIÊN FRC 2025"
SITE_DESCRIPTION="Đơn đăng ký thành viên cho CLB Robotics. Vui lòng nhập thông tin chính xác."

# Registration Settings
REGISTRATION_DEADLINE="2025-12-31T17:00:00+07:00"
TEAM_MODE="false"  # Set to "true" for team registration (2-3 members)

# Database
DATABASE_URL="file:./dev.db"  # SQLite for dev
# For production (Neon Postgres):
# DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Admin
ADMIN_PASSWORD="set-a-strong-password"

# Email (SMTP)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-email@example.com"
SMTP_PASS="your-password"
SMTP_FROM="FRC <no-reply@frc-fptu.club>"

# hCaptcha (optional, can be left empty for development)
HCAPTCHA_SITE_KEY="your-site-key"
HCAPTCHA_SECRET="your-secret-key"
```

### Client-side Environment Variables

For client-side access, prefix variables with `NEXT_PUBLIC_`:

```env
NEXT_PUBLIC_CLUB_NAME="FPTU Robotics Club (FRC)"
NEXT_PUBLIC_REGISTRATION_DEADLINE="2025-12-31T17:00:00+07:00"
NEXT_PUBLIC_TEAM_MODE="false"
NEXT_PUBLIC_HCAPTCHA_SITE_KEY="your-site-key"
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── register/route.ts      # Registration API
│   │   ├── admin/
│   │   │   ├── list/route.ts      # Admin list API
│   │   │   └── export/route.ts    # CSV export API
│   │   ├── config/route.ts        # Config API
│   │   └── rules/route.ts         # Rules content API
│   ├── admin/page.tsx             # Admin panel
│   ├── success/page.tsx           # Success page
│   ├── page.tsx                   # Landing page
│   └── layout.tsx                 # Root layout
├── components/
│   ├── multi-step-form/           # Form components
│   ├── ui/                        # shadcn/ui components
│   ├── countdown.tsx              # Countdown timer
│   └── glass-card.tsx             # Glassmorphism card
├── lib/
│   ├── prisma.ts                  # Prisma client
│   ├── schema.ts                  # Zod schemas
│   ├── utils.ts                   # Utility functions
│   ├── mailer.ts                  # Email service
│   └── rate-limit.ts              # Rate limiting
├── prisma/
│   └── schema.prisma              # Database schema
└── content/
    └── rules.md                   # Rules and terms content
```

## Database Schema

### Submission
- `id`: Unique identifier
- `refCode`: Reference code (e.g., FRC-XXXXXX)
- `mode`: "INDIVIDUAL" or "TEAM"
- `consentTruth`, `consentRules`, `consentData`: Consent flags
- `surveySource`, `surveySkills`, `surveyTimeSlots`: Survey data
- `metaIpHash`, `metaUA`: Metadata for rate limiting

### Applicant
- `id`: Unique identifier
- `submissionId`: Foreign key to Submission
- `isLeader`: Boolean (true for team leader)
- `fullName`, `dob`, `email`, `phone`: Personal info
- `school`, `major`, `facebook`: Additional info

### Team
- `id`: Unique identifier
- `submissionId`: Foreign key to Submission
- `teamName`: Team name

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Database Setup (Production)

1. Create a Neon Postgres database
2. Update `DATABASE_URL` in Vercel environment variables
3. Run migrations:
```bash
pnpm db:push
```

### Environment Variables for Production

Make sure to set all required environment variables in Vercel:
- `DATABASE_URL` (Postgres connection string)
- `ADMIN_PASSWORD`
- `SMTP_*` variables
- `HCAPTCHA_SITE_KEY` and `HCAPTCHA_SECRET`
- `CLUB_NAME`, `REGISTRATION_DEADLINE`, `TEAM_MODE`

## Usage

### Individual Mode (Default)

When `TEAM_MODE="false"`, the form collects:
- Personal information (name, DOB, email, phone)
- School and major
- Facebook link (optional)
- Reason for joining
- Survey responses
- Consent agreements

### Team Mode

When `TEAM_MODE="true"`, the form collects:
- Team name
- Member 1 (Team Leader) information
- Member 2 information
- Member 3 information (optional)
- Survey responses
- Consent agreements

### Admin Panel

Access the admin panel at `/admin`:
- Login with `ADMIN_PASSWORD`
- View all submissions
- Search by name, email, or ref code
- Export to CSV
- Pagination support

## Development

### Database Commands

```bash
# Push schema changes
pnpm db:push

# Open Prisma Studio
pnpm db:studio

# Generate Prisma Client
pnpm postinstall
```

### Building for Production

```bash
pnpm build
pnpm start
```

## Security

- Rate limiting: 5 requests per IP per 10 minutes
- hCaptcha integration for bot protection
- Server-side validation with Zod
- HTML sanitization for user input
- Password-protected admin panel
- IP hashing for privacy

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

