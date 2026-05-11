"use client";

import { useGameStore } from "@/lib/store/game-store";
import { BADGES } from "@/lib/badges";

export function BadgeStrip() {
  const badges = useGameStore((s) => s.badges);
  if (badges.length === 0) {
    return <span className="text-xs text-muted">획득한 뱃지 없음</span>;
  }
  return (
    <div className="flex items-center gap-1">
      {badges.slice(-5).map((id) => (
        <span
          key={id}
          title={BADGES[id].name}
          className="inline-flex size-7 items-center justify-center rounded-full border border-border bg-surface-strong text-base"
        >
          {BADGES[id].emoji}
        </span>
      ))}
      {badges.length > 5 && (
        <span className="ml-1 text-xs text-muted">+{badges.length - 5}</span>
      )}
    </div>
  );
}
