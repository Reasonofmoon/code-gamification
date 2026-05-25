"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { WORLD_STORY_ARC } from "@/content/world-story";
import { getRealm } from "@/content/realms";
import { missionsByRealm } from "@/content/missions";
import { useGameStore } from "@/lib/store/game-store";
import { cn } from "@/lib/utils";

export function WorldStoryPanel() {
  const missionResults = useGameStore((s) => s.missionResults);
  const level = useGameStore((s) => s.level);

  return (
    <section className="parchment p-5" aria-labelledby="world-story-title">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">
            Story spine
          </p>
          <h2 id="world-story-title" className="fantasy-title text-2xl text-accent">
            카이의 여정이 이어지는 길
          </h2>
        </div>
        <p className="max-w-xl text-sm text-muted">
          각 대륙은 따로 떨어진 강의가 아니라, 기억을 찾고 기록을 남기며
          도구를 다루는 하나의 성장선으로 이어집니다.
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-7">
        {WORLD_STORY_ARC.map((node, index) => {
          const realm = getRealm(node.realmId);
          const missions = missionsByRealm(node.realmId);
          const cleared = missions.filter((mission) => missionResults[mission.id]).length;
          const locked = level < realm.requiredLevel;
          const started = cleared > 0;
          const complete = missions.length > 0 && cleared === missions.length;
          return (
            <Link
              key={node.realmId}
              href={locked ? "/" : `/realm/${node.realmId}`}
              aria-disabled={locked}
              className={cn(
                "rounded-lg border border-border bg-surface/50 p-3 transition-colors",
                locked ? "opacity-55" : "hover:bg-surface-strong",
                complete && "border-emerald-400/50",
                started && !complete && "border-accent/60"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {node.chapter}
                </span>
                {index < WORLD_STORY_ARC.length - 1 && (
                  <ChevronRight className="size-3 text-muted" aria-hidden="true" />
                )}
              </div>
              <div className="mt-2 text-2xl">{realm.emoji}</div>
              <h3 className="mt-2 fantasy-title text-base text-foreground">
                {node.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-muted line-clamp-3">
                {node.role}
              </p>
              <div className="mt-3 font-mono text-[10px] text-muted">
                {locked
                  ? `Lv.${realm.requiredLevel} 필요`
                  : `${cleared}/${missions.length} 미션`}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
