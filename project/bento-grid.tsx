"use client"

import { PuzzleIcon as PuzzlePiece, MessageCircle, ClipboardList, Mic, NetworkIcon as Network2, BarChart3, UserCog, BookOpen } from 'lucide-react'
import { cn } from "@/lib/utils"

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}

function BentoCard({ title, description, icon, className, ...props }: BentoCardProps) {
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
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900/50 text-zinc-500 shadow-inner group-hover:text-zinc-400">
          {icon}
        </div>
        <h3 className="mb-2 font-semibold tracking-tight text-zinc-100">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </div>
  )
}

export default function BentoGrid() {
  const cards = [
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
    <div className="relative min-h-screen w-full bg-black p-4 md:p-8">
      {/* Dot pattern background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(39 39 42 / 0.2) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-4">
          {cards.map((card, i) => (
            <BentoCard
              key={i}
              title={card.title}
              description={card.description}
              icon={card.icon}
              className={card.className}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

