"use client";

import { useGameStore } from "@/lib/store/game-store";
import { xpProgressInLevel } from "@/types/player";

export function XPBar() {
  const xp = useGameStore((s) => s.xp);
  const level = useGameStore((s) => s.level);
  const { current, needed, ratio } = xpProgressInLevel(xp);
  return (
    <div className="flex items-center gap-3 min-w-[260px]">
      <div className="flex items-center gap-2">
        <span className="text-accent fantasy-title text-lg glow-accent">Lv.{level}</span>
      </div>
      <div className="flex-1">
        <div className="h-2.5 rounded-full bg-surface-strong overflow-hidden border border-border">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent-strong transition-[width] duration-500"
            style={{ width: `${Math.min(100, ratio * 100)}%` }}
          />
        </div>
        <div className="mt-1 text-[10px] text-muted font-mono">
          XP {current} / {needed}
        </div>
      </div>
    </div>
  );
}
