"use client"

import { PuzzleIcon as PuzzlePiece, MessageCircle, ClipboardList, Mic, NetworkIcon as Network2, BarChart3, UserCog, BookOpen, User, Target } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

function BentoCard({ title, description, icon, className, children, ...props }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-zinc-950 p-6 hover:shadow-xl transition-all hover:scale-[1.02] hover:ring-2 hover:ring-zinc-700/50",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-zinc-900 before:to-zinc-950 before:opacity-80",
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900/50 text-zinc-500 shadow-inner group-hover:text-zinc-400">
            {icon}
          </div>
        )}
        <h3 className="mb-2 font-semibold tracking-tight text-zinc-100">{title}</h3>
        {description && <p className="text-sm text-zinc-400">{description}</p>}
        {children}
      </div>
    </div>
  )
}

export default function EnhancedDashboard() {
  const [userName, setUserName] = useState<string>('')
  const [userProfile, setUserProfile] = useState<any>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    async function loadUserProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profile) {
          setUserName(profile.full_name || user.email?.split('@')[0] || '')
          setUserProfile(profile)
          if (profile.avatar_url) {
            const { data: { publicUrl } } = supabase
              .storage
              .from('avatars')
              .getPublicUrl(profile.avatar_url)
            setAvatarUrl(publicUrl)
          }
        }
      }
    }
    loadUserProfile()
  }, [supabase])

  const cards = [
    {
      title: "Welcome back, " + userName,
      description: "Your (human)loop profile is ready for enhanced communication.",
      icon: <User className="h-6 w-6" />,
      className: "md:col-span-3",
      type: "welcome"
    },
    {
      title: "Your (human)loop Rubric",
      description: "",
      icon: <Target className="h-6 w-6" />,
      className: "md:col-span-1 md:row-span-2",
      type: "rubric",
      content: userProfile ? (
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">🎯 Enn:</span>
            <span className="text-zinc-300">{userProfile.enneagram || '5'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">🧠 Comm:</span>
            <span className="text-zinc-300">{userProfile.communication_style || 'Analytical'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">❤️ Emo:</span>
            <span className="text-zinc-300">{userProfile.emotional_style || 'Reserved'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">🎯 Goal:</span>
            <span className="text-zinc-300">{userProfile.goal_orientation || 'Growth'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">🔄 Adapt:</span>
            <span className="text-zinc-300">{userProfile.adaptability || 'Methodical'}</span>
          </div>
        </div>
      ) : null
    },
    {
      title: "Personality-Based Matchmaking",
      description: "Form balanced teams using personality insights.",
      icon: <PuzzlePiece className="h-6 w-6" />,
      className: "md:col-span-2 md:row-span-2"
    },
    {
      title: "Intelligent Chat & Messaging",
      description: "Chat with colleagues, guided by personality rubrics.",
      icon: <MessageCircle className="h-6 w-6" />,
      className: "md:col-span-1"
    },
    {
      title: "Project & Task Delegation",
      description: "Assign tasks to the right people with ease.",
      icon: <ClipboardList className="h-6 w-6" />,
      className: "md:col-span-1"
    },
    {
      title: "Transcription & Smart Notes",
      description: "Convert video conference transcripts into tailored notes.",
      icon: <Mic className="h-6 w-6" />,
      className: "md:col-span-1 md:row-span-2"
    },
    {
      title: "Visual Org Chart Builder",
      description: "Construct your team org chart and see personality alignment.",
      icon: <Network2 className="h-6 w-6" />,
      className: "md:col-span-1"
    },
    {
      title: "Team Performance Analytics",
      description: "Monitor team dynamics and effectiveness.",
      icon: <BarChart3 className="h-6 w-6" />,
      className: "md:col-span-2"
    },
    {
      title: "Settings & Personal Profile",
      description: "Adjust your preferences and review your profile.",
      icon: <UserCog className="h-6 w-6" />,
      className: "md:col-span-1"
    },
    {
      title: "Resource Center & Tutorials",
      description: "Learn how to get the most out of HumanLoop.",
      icon: <BookOpen className="h-6 w-6" />,
      className: "md:col-span-1"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl || ''} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Welcome back, {userName}</h1>
            {userProfile?.rubric ? (
              <p className="text-sm font-mono text-zinc-400">{userProfile.rubric}</p>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/assessment'}
              >
                Take Assessment
              </Button>
            )}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {cards.map((card, i) => (
            <BentoCard
              key={i}
              title={card.title}
              description={card.description}
              icon={card.icon}
              className={card.className}
            >
              {card.type === 'rubric' && card.content}
            </BentoCard>
          ))}
        </div>
      </div>
    </div>
  )
}
