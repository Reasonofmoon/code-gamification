"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Lock, CheckCircle2, Skull } from "lucide-react";
import type { Mission } from "@/types/mission";
import type { MissionResult } from "@/types/player";
import { cn } from "@/lib/utils";
import { missionImageFor } from "@/lib/npc-images";

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
  const imageSrc = missionImageFor(mission.id);
  const isBridge =
    mission.id.includes("bridge") ||
    mission.id.includes("review") ||
    mission.id.includes("remote-check");
  const cardClass = cn(
    "parchment relative overflow-hidden p-5 transition-transform",
    locked && "opacity-50",
    !locked && "hover:-translate-y-0.5 cursor-pointer"
  );
  const content = (
    <div className={cardClass}>
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover opacity-35 pointer-events-none"
            sizes="(max-width: 640px) 100vw, 360px"
            loading={mission.order <= 6 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/25 pointer-events-none" />
        </>
      )}
      <div className="relative">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-muted font-mono">
            <span>#{mission.order.toString().padStart(2, "0")}</span>
            {mission.isBoss && (
              <span className="inline-flex items-center gap-1 text-danger">
                <Skull className="size-3" /> BOSS
              </span>
            )}
            {isBridge && !mission.isBoss && (
              <span className="inline-flex items-center rounded-full border border-accent/40 px-1.5 py-0.5 text-[10px] text-accent">
                BRIDGE
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
        {mission.summary}
      </p>
      <div className="mt-2 text-[10px] text-muted font-mono">
        {mission.steps.length} step{mission.steps.length > 1 ? "s" : ""}
      </div>
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
    </div>
  );
  if (locked) return content;
  return <Link href={`/mission/${mission.id}`}>{content}</Link>;
}
