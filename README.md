# HumanLoop - Team Personality Assessment Platform

A modern web application for team personality assessments and analytics, built with Next.js and Supabase.

## Features

- User authentication with Supabase Auth
- Personality assessment system
- Team analytics and insights
- Profile management with avatar upload
- Real-time data synchronization
- Responsive UI with dark mode support

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Supabase (Authentication & Database)
- Tailwind CSS
- Shadcn UI Components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   cd project
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Database Setup

1. Create a new Supabase project
2. Run the SQL migrations in `supabase/migrations`
3. Apply the schema from `supabase/schema.sql`

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
