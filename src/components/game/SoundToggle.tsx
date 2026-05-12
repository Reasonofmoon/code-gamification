"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isSoundEnabled, toggleSound, playSound } from "@/lib/sound";

/**
 * SoundToggle — HUD 우측에 표시되는 사운드 ON/OFF 버튼.
 *
 * - 기본 OFF (사용자가 직접 켜는 패턴, 자동재생 정책 호환)
 * - 토글 시 localStorage 저장 + 켜진 직후 'ping' 으로 즉시 청각 피드백
 * - SSR 안전: mount 후에만 localStorage 읽음 (hydration mismatch 방지)
 */
export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(isSoundEnabled());
  }, []);

  if (!mounted) {
    // 첫 렌더는 OFF 모양으로 통일 (hydration mismatch 회피)
    return (
      <button
        aria-label="사운드 토글"
        className="size-8 grid place-items-center rounded-lg text-muted/60"
        disabled
      >
        <VolumeX className="size-4" />
      </button>
    );
  }

  const handleClick = () => {
    const next = toggleSound();
    setEnabled(next);
    if (next) playSound("ping");
  };

  return (
    <button
      onClick={handleClick}
      aria-label={enabled ? "사운드 끄기" : "사운드 켜기"}
      title={enabled ? "사운드 ON" : "사운드 OFF"}
      className={`size-8 grid place-items-center rounded-lg border border-border hover:bg-surface-strong transition-colors ${
        enabled ? "text-accent" : "text-muted"
      }`}
    >
      {enabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
    </button>
  );
}
