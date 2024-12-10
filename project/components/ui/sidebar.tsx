'use client';

import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { IconButton } from './icon-button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarContextValue {
  expanded: boolean;
  toggleExpanded: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        toggleExpanded: () => setExpanded((prev) => !prev),
      }}
    >
      <div className="flex min-h-screen">
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { expanded, toggleExpanded } = useSidebar();
  
  return (
    <IconButton
      icon={expanded ? <ChevronLeft /> : <ChevronRight />}
      onClick={toggleExpanded}
      className={className}
      aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
    />
  );
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  const { expanded } = useSidebar();
  
  return (
    <div className={`flex-1 ml-16 lg:ml-64 transition-all duration-300 ${expanded ? '' : 'lg:ml-16'}`}>
      {children}
    </div>
  );
}