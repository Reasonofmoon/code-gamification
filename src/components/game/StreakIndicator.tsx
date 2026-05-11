"use client";

import { useEffect } from "react";
import { useGameStore } from "@/lib/store/game-store";
import { Flame } from "lucide-react";

export function StreakIndicator() {
  const streakDays = useGameStore((s) => s.streakDays);
  const registerSession = useGameStore((s) => s.registerSession);
  useEffect(() => {
    registerSession();
  }, [registerSession]);
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Flame
        className={`size-4 ${streakDays > 0 ? "text-blade" : "text-muted"}`}
      />
      <span className="font-mono text-foreground">{streakDays}</span>
      <span className="text-muted text-xs">일 연속</span>
    </div>
  );
}
