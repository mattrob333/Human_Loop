-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Initialize storage
DO $$
BEGIN
    -- Create storage schema if it doesn't exist
    CREATE SCHEMA IF NOT EXISTS storage;
    
    -- Create storage tables if they don't exist
    CREATE TABLE IF NOT EXISTS storage.buckets (
        id text NOT NULL,
        name text NOT NULL,
        owner uuid,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now(),
        public boolean DEFAULT false,
        avif_autodetection boolean DEFAULT false,
        file_size_limit bigint,
        allowed_mime_types text[],
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS storage.objects (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        bucket_id text,
        name text,
        owner uuid,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now(),
        last_accessed_at timestamptz DEFAULT now(),
        metadata jsonb,
        path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/')) STORED,
        CONSTRAINT objects_pkey PRIMARY KEY (id),
        CONSTRAINT objects_buckets_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id)
    );

    -- Create avatars bucket if it doesn't exist
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
        'avatars',
        'avatars',
        true,
        5242880,
        ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    )
    ON CONFLICT (id) DO UPDATE SET
        public = EXCLUDED.public,
        file_size_limit = EXCLUDED.file_size_limit,
        allowed_mime_types = EXCLUDED.allowed_mime_types;

    -- Enable RLS on storage.objects
    ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

    -- Create storage policies
    DROP POLICY IF EXISTS "Avatar Upload Policy" ON storage.objects;
    DROP POLICY IF EXISTS "Avatar Public Read Policy" ON storage.objects;

    CREATE POLICY "Avatar Upload Policy" ON storage.objects
        FOR ALL
        USING (
            bucket_id = 'avatars'
            AND auth.role() = 'authenticated'
            AND (storage.foldername(name))[1] = auth.uid()::text
        );

    CREATE POLICY "Avatar Public Read Policy" ON storage.objects
        FOR SELECT
        USING (bucket_id = 'avatars');
END $$;

-- Drop policies first
DROP POLICY IF EXISTS "Users can view their own assessment results" ON public.assessment_results;
DROP POLICY IF EXISTS "Users can insert their own assessment results" ON public.assessment_results;
DROP POLICY IF EXISTS "Users can view their team memberships" ON public.team_members;
DROP POLICY IF EXISTS "Users can manage their team memberships" ON public.team_members;
DROP POLICY IF EXISTS "Team members can read teams" ON public.teams;

-- Drop tables with CASCADE to handle dependencies
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.teams CASCADE;
DROP TABLE IF EXISTS public.assessment_results CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table first (since other tables might reference it)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    email TEXT,
    rubric TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create assessment_results table
CREATE TABLE public.assessment_results (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    enneagram_type INTEGER NOT NULL,
    communication_style TEXT NOT NULL,
    emotional_style TEXT NOT NULL,
    goal_orientation TEXT NOT NULL,
    adaptability_style TEXT NOT NULL,
    rubric TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on assessment_results
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

-- Create policies for assessment results
CREATE POLICY "Users can view their own assessment results"
    ON public.assessment_results
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessment results"
    ON public.assessment_results
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER assessment_results_updated_at
    BEFORE UPDATE ON public.assessment_results
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Create teams table
CREATE TABLE public.teams (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE public.team_members (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    team_id UUID NOT NULL,
    role TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_team_user
        FOREIGN KEY (user_id)
        REFERENCES auth.users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_team
        FOREIGN KEY (team_id)
        REFERENCES public.teams(id)
        ON DELETE CASCADE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles
    FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Create policies for teams and team members
CREATE POLICY "Users can view their team memberships"
    ON public.team_members
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their team memberships"
    ON public.team_members
    FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Team members can view teams"
    ON public.teams
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.team_members
            WHERE team_members.team_id = teams.id
            AND team_members.user_id = auth.uid()
        )
    );

-- Create trigger to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();
