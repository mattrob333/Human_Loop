'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/icon-button';
import {
  LayoutDashboard,
  History,
  BarChart2,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: History, label: 'Assessment History', href: '/history' },
  { icon: BarChart2, label: 'Team Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Support', href: '/support' },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <aside className={cn(
      "h-screen fixed left-0 top-0 z-40 flex flex-col bg-background border-r transition-all duration-300",
      expanded ? "w-64" : "w-16"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {expanded && <span className="text-lg font-semibold">TeamSync AI</span>}
        <IconButton
          icon={expanded ? <ChevronLeft /> : <ChevronRight />}
          onClick={() => setExpanded(!expanded)}
          className="ml-auto"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        />
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {expanded && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}