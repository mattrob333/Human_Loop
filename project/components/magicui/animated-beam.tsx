"use client";

import { useEffect, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
}

interface AnimatedBeamProps {
  fromRef: RefObject<HTMLElement>;
  toRef: RefObject<HTMLElement>;
  containerRef: RefObject<HTMLElement>;
  duration?: number;
  className?: string;
}

export const AnimatedBeam = ({
  fromRef,
  toRef,
  containerRef,
  duration = 3,
  className,
}: AnimatedBeamProps) => {
  const [fromPoint, setFromPoint] = useState<Point>({ x: 0, y: 0 });
  const [toPoint, setToPoint] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const updatePoints = () => {
      if (!fromRef.current || !toRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      setFromPoint({
        x: fromRect.left + fromRect.width / 2 - containerRect.left,
        y: fromRect.top + fromRect.height / 2 - containerRect.top,
      });

      setToPoint({
        x: toRect.left + toRect.width / 2 - containerRect.left,
        y: toRect.top + toRect.height / 2 - containerRect.top,
      });
    };

    updatePoints();
    window.addEventListener("resize", updatePoints);
    return () => window.removeEventListener("resize", updatePoints);
  }, [fromRef, toRef, containerRef]);

  const distance = Math.sqrt(
    Math.pow(toPoint.x - fromPoint.x, 2) + Math.pow(toPoint.y - fromPoint.y, 2)
  );

  const angle = Math.atan2(toPoint.y - fromPoint.y, toPoint.x - fromPoint.x);

  return (
    <div
      className={cn("absolute top-0 left-0 h-full w-full pointer-events-none", className)}
      style={{
        transform: `translate(${fromPoint.x}px, ${fromPoint.y}px) rotate(${angle}rad)`,
        width: `${distance}px`,
        transformOrigin: "left",
      }}
    >
      <div className="relative h-px w-full">
        <div className="absolute inset-0 h-full w-full">
          <div
            className="h-full w-[20%] animate-beam bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            style={{
              animationDuration: `${duration}s`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
