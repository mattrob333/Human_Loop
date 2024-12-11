"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Role {
  id: string;
  title: string;
  name?: string;
  contact?: string;
  rubric?: string;
  level: number;
  reportingTo?: string;
}

interface AnimatedOrgChartProps {
  roles: Role[];
  className?: string;
}

interface RoleCardProps {
  role: Role;
}

const RoleCard = React.forwardRef<HTMLDivElement, RoleCardProps>(({ role }, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCSuite = role.level === 0;
  const isManager = role.level === 1;
  
  return (
    <>
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-neutral-800 shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer",
          isCSuite ? "border-blue-500/50 px-8 py-6" : 
          isManager ? "border-blue-400/30 px-6 py-4" : 
          "border-neutral-700/50 px-4 py-3"
        )}
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex flex-col items-center gap-1">
          <h3 className={cn(
            "text-center font-medium whitespace-nowrap",
            isCSuite ? "text-blue-100 text-lg" :
            isManager ? "text-blue-50 text-base" :
            "text-neutral-200 text-sm"
          )}>{role.title}</h3>
          {role.name && (
            <p className="text-sm text-neutral-400 whitespace-nowrap">{role.name}</p>
          )}
        </div>
      </div>

      {/* Expanded Card Dialog */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{role.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {role.name && (
              <div>
                <h4 className="text-sm font-medium text-neutral-400">Name</h4>
                <p className="text-lg text-neutral-200">{role.name}</p>
              </div>
            )}
            {role.contact && (
              <div>
                <h4 className="text-sm font-medium text-neutral-400">Contact</h4>
                <p className="text-lg text-neutral-200">{role.contact}</p>
              </div>
            )}
            {role.rubric && (
              <div>
                <h4 className="text-sm font-medium text-neutral-400">Rubric</h4>
                <p className="text-lg text-neutral-200">{role.rubric}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

RoleCard.displayName = "RoleCard";

export const AnimatedOrgChart = ({ roles, className }: AnimatedOrgChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const roleRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  // Initialize refs for each role
  roles.forEach((role) => {
    if (!roleRefs.current[role.id]) {
      roleRefs.current[role.id] = React.createRef<HTMLDivElement>();
    }
  });

  // Get CEO and C-Suite roles
  const ceoRole = roles.find(r => r.level === 0);

  // Create beams for all reporting relationships
  const renderBeams = () => {
    if (!containerRef.current) return null;

    return roles.map(role => {
      if (!role.reportingTo) return null;
      const managerRef = roleRefs.current[role.reportingTo];
      const roleRef = roleRefs.current[role.id];

      if (!managerRef || !roleRef) return null;

      return (
        <AnimatedBeam
          key={`${role.reportingTo}-${role.id}`}
          fromRef={managerRef}
          toRef={roleRef}
          containerRef={containerRef}
          pathColor="#4a90e2"
          pathWidth={2}
          pathOpacity={0.4}
          gradientStartColor="#4a90e2"
          gradientStopColor="#4a90e2"
          duration={4}
          curvature={0}
        />
      );
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-[600px] p-12"
    >
      {/* Render all beams */}
      {renderBeams()}

      {/* CEO at top center */}
      <div className="absolute left-1/2 -translate-x-1/2 top-12 z-10">
        {ceoRole && <RoleCard ref={roleRefs.current[ceoRole.id]} role={ceoRole} />}
      </div>

      {/* C-Suite Level */}
      <div className="absolute top-48 left-0 right-0 z-10">
        <div className="flex justify-center items-center gap-24">
          {roles.filter(r => r.level === 1).map((role) => (
            <div key={role.id}>
              <RoleCard ref={roleRefs.current[role.id]} role={role} />
            </div>
          ))}
        </div>
      </div>

      {/* Manager Level */}
      <div className="absolute top-96 left-0 right-0 z-10">
        <div className="flex flex-wrap justify-center gap-12">
          {roles.filter(r => r.level === 2).map((role) => (
            <div key={role.id}>
              <RoleCard ref={roleRefs.current[role.id]} role={role} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
