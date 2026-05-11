"use client";

import Link from "next/link";
import { Star, Lock, CheckCircle2, Skull } from "lucide-react";
import type { Mission } from "@/types/mission";
import type { MissionResult } from "@/types/player";
import { cn } from "@/lib/utils";

export function MissionCard({
  mission,
  result,
  locked,
}: {
  mission: Mission;
  result?: MissionResult;
  locked: boolean;
}) {
  const cleared = Boolean(result);
  const stars = result?.stars ?? 0;
  const cardClass = cn(
    "parchment relative p-5 transition-transform",
    locked && "opacity-50",
    !locked && "hover:-translate-y-0.5 cursor-pointer"
  );
  const content = (
    <div className={cardClass}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-muted font-mono">
            <span>#{mission.order.toString().padStart(2, "0")}</span>
            {mission.isBoss && (
              <span className="inline-flex items-center gap-1 text-danger">
                <Skull className="size-3" /> BOSS
              </span>
            )}
            {cleared && (
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="size-3" /> 클리어
              </span>
            )}
          </div>
          <h3 className="mt-1 fantasy-title text-lg">{mission.title}</h3>
          <p className="text-xs text-muted">{mission.fantasyTitle}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex">
            {[1, 2, 3].map((i) => (
              <Star
                key={i}
                className={cn(
                  "size-4",
                  i <= stars
                    ? "text-accent fill-accent"
                    : "text-muted/40"
                )}
              />
            ))}
          </div>
          <div className="text-xs text-muted font-mono">
            +{mission.xpReward} XP
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-foreground/80 line-clamp-2">
        {mission.briefing}
      </p>
      <div className="mt-3 text-xs text-accent">
        {locked ? (
          <span className="inline-flex items-center gap-1 text-muted">
            <Lock className="size-3" /> 이전 미션 클리어 필요
          </span>
        ) : cleared ? (
          "다시 도전 →"
        ) : (
          "도전 →"
        )}
      </div>
    </div>
  );
  if (locked) return content;
  return <Link href={`/mission/${mission.id}`}>{content}</Link>;
}
