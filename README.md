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
   ```bash
   git clone https://github.com/mattrob333/Human_Loop.git
   cd Human_Loop
   ```

2. Install dependencies:
   ```bash
   cd project
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project is configured for deployment on Vercel:

1. Push your changes to the main branch
2. Vercel will automatically deploy from the `project` directory
3. Ensure all environment variables are set in your Vercel project settings

## License

MIT
