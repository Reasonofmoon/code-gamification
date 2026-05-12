"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Skull } from "lucide-react";
import type { Mission, DialogueStep } from "@/types/mission";
import { npcImageFor } from "@/lib/npc-images";
import { playSound } from "@/lib/sound";

type Props = {
  mission: Mission;
  step: DialogueStep;
  onContinue: () => void;
};

/**
 * BossStageCutscene — 보스 미션의 *등장* dialogue step 에서 풀스크린 컷씬.
 *
 * 트리거:
 *  - mission.isBoss === true
 *  - step.kind === 'dialogue'
 *  - step.id 가 'boss-enter' / 'mirror-enter' / 'kael-intro' 중 하나
 *
 * 흐름:
 *  - 처음 1.5초: 거대한 보스 초상화 + 페이드 인 + 시스템 메시지 [보스 등장!]
 *  - 그 다음: 사용자가 "응전한다" 버튼을 누르면 → onContinue() → 기존 DialoguePanel
 */
export function BossStageCutscene({ mission, step, onContinue }: Props) {
  const [showActions, setShowActions] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const imgSrc = npcImageFor(step.speaker);

  useEffect(() => {
    // 보스 등장 효과음
    playSound("boss-encounter");
    const t = setTimeout(() => setShowActions(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const _ = mission; // mission 메타데이터는 v2에서 활용

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 bg-black/90 backdrop-blur-md cutscene-bg">
      {/* 시스템 메시지 띠링 */}
      <div className="absolute top-8 system-ping text-lg">*띠리리링!*</div>
      <div className="absolute top-16 inline-flex">
        <span className="system-header">◆ 공허 조율 시스템 · [ 보스 등장 ]</span>
      </div>

      {/* 거대 초상화 */}
      <div className="relative size-56 sm:size-72 mb-8 boss-portrait-enter">
        <div className="absolute -inset-3 rounded-full bg-danger/20 blur-2xl" />
        <div className="relative size-full rounded-full overflow-hidden border-2 border-danger/60 shadow-[0_0_60px_rgba(239,68,68,0.5)]">
          {imgSrc && !imgFailed ? (
            <Image
              src={imgSrc}
              alt={step.speaker}
              fill
              className="object-cover"
              sizes="288px"
              onError={() => setImgFailed(true)}
              priority
            />
          ) : (
            <div className="size-full grid place-items-center bg-surface-strong text-7xl">
              {step.speakerEmoji ?? <Skull className="size-20 text-danger" />}
            </div>
          )}
        </div>
      </div>

      {/* 이름 + 도전 표어 */}
      <div className="text-center max-w-md">
        <p className="text-xs uppercase tracking-[0.3em] text-danger font-mono">
          BOSS ENCOUNTER
        </p>
        <h2 className="mt-2 fantasy-title text-3xl sm:text-4xl text-accent glow-accent">
          {step.speaker}
        </h2>
        <p className="mt-3 text-sm text-muted">{mission.fantasyTitle}</p>
      </div>

      {/* 응전 / 통과 액션 */}
      <div className="mt-10 min-h-[44px] flex items-center gap-3">
        {showActions && (
          <button
            onClick={onContinue}
            className="px-6 py-2.5 rounded-lg bg-danger/90 text-background font-semibold text-sm hover:bg-danger shadow-[0_0_20px_rgba(239,68,68,0.5)] action-fade-in"
          >
            응전한다 →
          </button>
        )}
      </div>
    </div>
  );
}
