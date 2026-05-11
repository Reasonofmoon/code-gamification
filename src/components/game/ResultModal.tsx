"use client";

import { Star, X } from "lucide-react";
import Link from "next/link";
import type { Mission } from "@/types/mission";
import { BADGES } from "@/lib/badges";
import type { BadgeId } from "@/types/player";
import { cn } from "@/lib/utils";

export function ResultModal({
  open,
  onClose,
  mission,
  stars,
  xpGained,
  leveledUp,
  newLevel,
  newBadges,
  nextMissionId,
}: {
  open: boolean;
  onClose: () => void;
  mission: Mission;
  stars: number;
  xpGained: number;
  leveledUp: boolean;
  newLevel: number;
  newBadges: BadgeId[];
  nextMissionId?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="parchment w-full max-w-md p-7 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted hover:text-foreground"
          aria-label="닫기"
        >
          <X className="size-5" />
        </button>
        <div className="text-center">
          <div className="text-5xl">{mission.isBoss ? "🐉" : "✨"}</div>
          <h2 className="mt-3 fantasy-title text-2xl text-accent glow-accent">
            {mission.isBoss ? "보스 격파!" : "주문 시전 성공!"}
          </h2>
          <p className="mt-1 text-sm text-muted">{mission.fantasyTitle}</p>

          <div className="mt-5 flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <Star
                key={i}
                className={cn(
                  "size-9 transition-all",
                  i <= stars
                    ? "text-accent fill-accent drop-shadow-[0_0_8px_rgba(247,185,85,0.7)]"
                    : "text-muted/30"
                )}
              />
            ))}
          </div>

          <div className="mt-5 inline-flex flex-col items-center gap-1 px-4 py-2 rounded-lg bg-surface-strong border border-border">
            <span className="text-xs text-muted">획득 경험치</span>
            <span className="fantasy-title text-2xl text-accent-strong">
              +{xpGained} XP
            </span>
          </div>

          {leveledUp && (
            <div className="mt-4 p-3 rounded-lg bg-magic/10 border border-magic/40">
              <div className="fantasy-title text-magic text-lg">
                레벨 업! Lv.{newLevel}
              </div>
              <div className="text-xs text-muted">새로운 대륙이 열렸을지 모른다.</div>
            </div>
          )}

          {newBadges.length > 0 && (
            <div className="mt-4">
              <div className="text-xs text-muted mb-2">새 뱃지</div>
              <div className="flex justify-center gap-2 flex-wrap">
                {newBadges.map((id) => (
                  <div
                    key={id}
                    className="px-3 py-1.5 rounded-full bg-surface-strong border border-accent/40 text-sm"
                    title={BADGES[id].description}
                  >
                    {BADGES[id].emoji} {BADGES[id].name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex gap-2 justify-center">
            <Link
              href={`/realm/${mission.realmId}`}
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-surface-strong"
            >
              대륙으로
            </Link>
            {nextMissionId ? (
              <Link
                href={`/mission/${nextMissionId}`}
                className="px-4 py-2 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-strong"
              >
                다음 미션 →
              </Link>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-strong"
              >
                계속하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
