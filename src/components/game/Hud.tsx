"use client";

import Link from "next/link";
import { XPBar } from "./XPBar";
import { StreakIndicator } from "./StreakIndicator";
import { BadgeStrip } from "./BadgeStrip";
import { SoundToggle } from "./SoundToggle";
import { BookOpen, Crown } from "lucide-react";

export function Hud() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 group" aria-label="CodeQuest 홈">
          <Crown className="size-5 text-accent group-hover:text-accent-strong" />
          <span className="fantasy-title text-xl glow-accent">CodeQuest</span>
        </Link>
        <Link
          href="/glossary"
          className="hidden lg:inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground"
          aria-label="용어 사전으로 이동"
        >
          <BookOpen className="size-3.5" />
          용어 사전
        </Link>
        <div className="ml-auto hidden sm:block">
          <XPBar />
        </div>
        <StreakIndicator />
        <div className="hidden md:block">
          <BadgeStrip />
        </div>
        <SoundToggle />
      </div>
      <div className="sm:hidden mx-auto max-w-6xl px-4 pb-3">
        <XPBar />
      </div>
    </header>
  );
}
