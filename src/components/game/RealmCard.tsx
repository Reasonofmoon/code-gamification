"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import type { Realm } from "@/types/mission";
import { cn } from "@/lib/utils";

export function RealmCard({
  realm,
  unlocked,
  totalMissions,
  clearedMissions,
  playerLevel,
}: {
  realm: Realm;
  unlocked: boolean;
  totalMissions: number;
  clearedMissions: number;
  playerLevel: number;
}) {
  const progressPct = totalMissions === 0 ? 0 : (clearedMissions / totalMissions) * 100;
  const accent =
    realm.trackKind === "terminal"
      ? "from-magic/20 to-magic/0"
      : realm.trackKind === "vim"
      ? "from-blade/20 to-blade/0"
      : "from-rune/20 to-rune/0";
  const Inner = (
    <div
      className={cn(
        "parchment relative overflow-hidden p-6 h-full transition-transform",
        unlocked
          ? "hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
          : "opacity-60"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br pointer-events-none",
          accent
        )}
      />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-4xl">{realm.emoji}</div>
            <h3 className="mt-3 fantasy-title text-2xl text-accent">
              {realm.name}
            </h3>
            <p className="text-xs text-muted uppercase tracking-widest">
              {realm.subtitle}
            </p>
          </div>
          {!unlocked && (
            <div className="flex items-center gap-1 text-xs text-muted px-2 py-1 rounded-full bg-surface-strong border border-border">
              <Lock className="size-3" />
              Lv.{realm.requiredLevel}+
            </div>
          )}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80 fantasy-title">
          {realm.flavor}
        </p>
        <div className="mt-6">
          <div className="h-1.5 rounded-full bg-surface-strong overflow-hidden">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted font-mono">
              {clearedMissions} / {totalMissions} 미션
            </span>
            {unlocked ? (
              <span className="text-accent">진입 →</span>
            ) : (
              <span className="text-muted">
                레벨 {realm.requiredLevel} 필요 (현재 Lv.{playerLevel})
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  if (!unlocked) return Inner;
  return (
    <Link href={`/realm/${realm.id}`} className="block h-full">
      {Inner}
    </Link>
  );
}
