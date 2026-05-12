"use client";

import { useEffect } from "react";
import { Star, X } from "lucide-react";
import Link from "next/link";
import type { Mission } from "@/types/mission";
import { BADGES } from "@/lib/badges";
import type { BadgeId } from "@/types/player";
import { cn } from "@/lib/utils";
import { playSound } from "@/lib/sound";

type Props = {
  open: boolean;
  onClose: () => void;
  mission: Mission;
  stars: number;
  xpGained: number;
  leveledUp: boolean;
  newLevel: number;
  newBadges: BadgeId[];
  nextMissionId?: string;
};

/**
 * 미션 클리어 모달 — 카이의 *공허 조율 시스템* 디제틱 창 스타일.
 *
 * 디자인:
 *  - parchment 카드 위에 `system-window` 시스템 창을 *얹어서* 보여줌
 *  - 상단: 띠링 효과음 텍스트 + [퀘스트 완료!] / [보스 격파!] 시스템 헤더
 *  - 본문: ★ + XP(공허력 +N 병기) + 레벨업 + 뱃지
 *  - 보스 미션에는 더 강한 헤더 + 추가 시스템 라인
 */
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
}: Props) {
  // 모달이 열릴 때 효과음 — 보스 격파는 success + level-up, 일반은 success
  useEffect(() => {
    if (!open) return;
    playSound("success");
    if (leveledUp) {
      setTimeout(() => playSound("level-up"), 500);
    }
  }, [open, leveledUp]);

  if (!open) return null;

  const headerLabel = mission.isBoss ? "[ 보스 격파 ]" : "[ 퀘스트 완료 ]";
  const ping = mission.isBoss ? "*띠리리링!*" : "*띠링!*";
  const headerLine = mission.isBoss
    ? "보스급 적대자가 *완전히 정화* 되었습니다."
    : "심연의 메아리가 *기록* 되었습니다.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
      <div className="system-window w-full max-w-md p-7 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted hover:text-foreground z-10"
          aria-label="닫기"
        >
          <X className="size-5" />
        </button>

        {/* ── System Header ─────────────────────────── */}
        <div className="text-center">
          <div className="system-ping">{ping}</div>
          <div className="mt-2 inline-flex">
            <span className="system-header">◆ 공허 조율 시스템 · {headerLabel}</span>
          </div>
          <p className="mt-3 system-line opacity-80">{headerLine}</p>
        </div>

        {/* ── Mission identity ───────────────────────── */}
        <div className="text-center mt-5">
          <div className="text-5xl">{mission.isBoss ? "🐉" : "✨"}</div>
          <h2 className="mt-2 fantasy-title text-2xl text-accent glow-accent">
            {mission.isBoss ? "보스 격파!" : "주문 시전 성공!"}
          </h2>
          <p className="mt-1 text-sm text-muted">{mission.fantasyTitle}</p>
        </div>

        {/* ── Stars ──────────────────────────────────── */}
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

        {/* ── Reward block (XP + 공허력) ─────────────── */}
        <div className="mt-5 flex justify-center">
          <div className="inline-flex flex-col items-center gap-1 px-4 py-2 rounded-lg bg-surface-strong border border-border">
            <span className="text-xs text-muted">획득 보상</span>
            <span className="fantasy-title text-2xl text-accent-strong">
              +{xpGained} XP
            </span>
            <span className="text-[11px] text-rune font-mono">
              [ 공허력 +{xpGained} ]
            </span>
          </div>
        </div>

        {/* ── Level up ───────────────────────────────── */}
        {leveledUp && (
          <div className="mt-4 p-3 rounded-lg bg-magic/10 border border-magic/40 text-center">
            <div className="font-mono text-magic text-xs uppercase tracking-widest">
              [ Level Up ]
            </div>
            <div className="fantasy-title text-magic text-lg">
              Lv.{newLevel} — 새로운 대륙이 열렸을지 모른다
            </div>
          </div>
        )}

        {/* ── Badges ─────────────────────────────────── */}
        {newBadges.length > 0 && (
          <div className="mt-4 text-center">
            <div className="font-mono text-rune text-[11px] uppercase tracking-widest mb-2">
              [ 새 칭호 획득 ]
            </div>
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

        {/* ── Actions ────────────────────────────────── */}
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
  );
}
