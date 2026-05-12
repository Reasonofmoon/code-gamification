"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { DialogueStep } from "@/types/mission";
import { npcImageFor } from "@/lib/npc-images";
import { playSound } from "@/lib/sound";

type Props = {
  step: DialogueStep;
  onAdvance: () => void;
};

/**
 * DialoguePanel — 멀티스텝 시나리오의 *대화* step.
 *
 * 한 번에 한 줄씩 보여주고, 사용자가 클릭(또는 Space/Enter)으로 다음 줄.
 * 마지막 줄에서 한 번 더 클릭 → onAdvance() 호출 → 다음 step.
 *
 * NPC 초상화 (public/npc/<id>.png) 가 있으면 원형 슬롯에 표시하고,
 * 없으면 step.speakerEmoji 이모지로 fallback.
 */
export function DialoguePanel({ step, onAdvance }: Props) {
  const [lineIndex, setLineIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const isLastLine = lineIndex >= step.lines.length - 1;
  const imgSrc = npcImageFor(step.speaker);

  const handleNext = () => {
    playSound("click");
    if (isLastLine) {
      onAdvance();
    } else {
      setLineIndex((i) => i + 1);
    }
  };

  return (
    <div
      className="parchment p-6 sm:p-8 cursor-pointer select-none"
      onClick={handleNext}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleNext();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="다음 대사로 진행"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 size-16 rounded-full bg-surface-strong border border-border overflow-hidden flex items-center justify-center text-3xl ring-1 ring-accent/20">
          {imgSrc && !imgFailed ? (
            <Image
              src={imgSrc}
              alt={step.speaker}
              width={64}
              height={64}
              className="size-full object-cover"
              onError={() => setImgFailed(true)}
              priority={false}
            />
          ) : (
            <span>{step.speakerEmoji ?? "🗣️"}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="fantasy-title text-accent text-sm">
            {step.speaker}
          </div>
          <p className="mt-2 text-foreground/95 leading-relaxed fantasy-title text-lg dialogue-line">
            {step.lines[lineIndex]}
          </p>
          <div className="mt-5 flex items-center justify-between text-xs text-muted">
            <span>
              {lineIndex + 1} / {step.lines.length}
            </span>
            <span className="inline-flex items-center gap-1 text-accent hover:text-accent-strong">
              {isLastLine ? "장면 시작" : "다음"} <ChevronRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
