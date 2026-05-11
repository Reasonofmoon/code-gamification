"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  ALL_MISSIONS,
  getMission,
  missionsByRealm,
  nextMissionInRealm,
} from "@/content/missions";
import { getRealm } from "@/content/realms";
import type { RealmId } from "@/types/mission";
import { TerminalPanel } from "@/components/mission/TerminalPanel";
import { VimEditor } from "@/components/mission/VimEditor";
import { CodeEditor } from "@/components/mission/CodeEditor";
import { DialoguePanel } from "@/components/mission/DialoguePanel";
import { ResultModal } from "@/components/game/ResultModal";
import { EndingCredits } from "@/components/game/EndingCredits";
import { useGameStore } from "@/lib/store/game-store";
import { computeStars, xpForStars } from "@/lib/scoring";
import type { BadgeId } from "@/types/player";
import { cn } from "@/lib/utils";

export default function MissionPage() {
  const params = useParams<{ missionId: string }>();
  const router = useRouter();
  const mission = getMission(params.missionId);
  if (!mission) return notFound();
  const realm = getRealm(mission.realmId);

  const applyMissionClear = useGameStore((s) => s.applyMissionClear);
  const missionResults = useGameStore((s) => s.missionResults);
  const streakDays = useGameStore((s) => s.streakDays);
  const level = useGameStore((s) => s.level);
  const hasHydrated = useGameStore((s) => s._hasHydrated);
  const previousResult = missionResults[mission.id];

  // step runner 상태
  const [stepIndex, setStepIndex] = useState(0);
  const [attempts, setAttempts] = useState(1);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);

  const [modal, setModal] = useState<{
    open: boolean;
    stars: number;
    xpGained: number;
    leveledUp: boolean;
    newLevel: number;
    newBadges: BadgeId[];
    triggersEnding: boolean;
  } | null>(null);
  const [endingOpen, setEndingOpen] = useState(false);

  // URL 직접 접근 잠금 검사 — hydration 완료 후에만 동작
  useEffect(() => {
    if (!hasHydrated) return;
    if (level < realm.requiredLevel) {
      router.replace(`/realm/${mission.realmId}`);
      return;
    }
    if (!missionResults[mission.id]) {
      const realmMissions = missionsByRealm(mission.realmId);
      const idx = realmMissions.findIndex((m) => m.id === mission.id);
      if (idx > 0) {
        const prevMission = realmMissions[idx - 1];
        if (!missionResults[prevMission.id]) {
          router.replace(`/realm/${mission.realmId}`);
        }
      }
    }
  }, [
    hasHydrated,
    level,
    missionResults,
    mission.id,
    mission.realmId,
    realm.requiredLevel,
    router,
  ]);

  const nextMission = useMemo(
    () => nextMissionInRealm(mission.realmId, mission.order),
    [mission]
  );

  const totalSteps = mission.steps.length;
  const currentStep = mission.steps[stepIndex];
  const isLastStep = stepIndex >= totalSteps - 1;

  const completeMission = (finalKeystrokes: number) => {
    const stars = computeStars({
      mission,
      attempts,
      totalKeystrokes: finalKeystrokes > 0 ? finalKeystrokes : undefined,
    });
    const xp = xpForStars(stars, mission.xpReward);
    const isFirstClear = !missionResults[mission.id];
    const clearedAfter = new Set([...Object.keys(missionResults), mission.id]);

    const earnedBadges: BadgeId[] = [];

    if (Object.keys(missionResults).length === 0) {
      earnedBadges.push("first-spell");
    }
    if (isFirstClear && mission.realmId === "vimkeep") {
      const vimMissions = missionsByRealm("vimkeep");
      const vimCleared = vimMissions.filter((m) => clearedAfter.has(m.id)).length;
      if (vimCleared === 1) earnedBadges.push("vim-novice");
    }
    if (isFirstClear && mission.realmId === "runescar") {
      const runeMissions = missionsByRealm("runescar");
      const runeCleared = runeMissions.filter((m) => clearedAfter.has(m.id)).length;
      if (runeCleared === 1) earnedBadges.push("rune-reader");
    }

    const realmsCleared: Record<RealmId, boolean> = {
      shellholm: missionsByRealm("shellholm").every((m) => clearedAfter.has(m.id)),
      vimkeep: missionsByRealm("vimkeep").every((m) => clearedAfter.has(m.id)),
      runescar: missionsByRealm("runescar").every((m) => clearedAfter.has(m.id)),
    };
    if (realmsCleared.shellholm) earnedBadges.push("shellholm-champion");
    if (realmsCleared.vimkeep) {
      earnedBadges.push("vimkeep-champion");
      earnedBadges.push("vim-sage");
    }
    if (realmsCleared.runescar) earnedBadges.push("runescar-champion");

    const allCleared = ALL_MISSIONS.every((m) => clearedAfter.has(m.id));
    if (allCleared) earnedBadges.push("the-cursor-emperor");

    if (stars === 3) earnedBadges.push("speedrunner");
    if (attempts === 1) earnedBadges.push("no-death-run");
    if (streakDays >= 7) earnedBadges.push("streak-7");
    if (streakDays >= 30) earnedBadges.push("streak-30");

    const outcome = applyMissionClear({
      missionId: mission.id,
      stars,
      xp,
      attempts,
      keystrokes: finalKeystrokes > 0 ? finalKeystrokes : undefined,
      earnedBadges,
    });

    setModal({
      open: true,
      stars,
      xpGained: previousResult ? 0 : xp,
      leveledUp: outcome.leveledUp,
      newLevel: outcome.newLevel,
      newBadges: outcome.newBadges,
      triggersEnding:
        allCleared && outcome.newBadges.includes("the-cursor-emperor"),
    });
  };

  const advance = (info?: { keystrokes?: number }) => {
    const newKeystrokes = totalKeystrokes + (info?.keystrokes ?? 0);
    if (info?.keystrokes) setTotalKeystrokes(newKeystrokes);
    if (isLastStep) {
      completeMission(newKeystrokes);
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handleRetry = () => {
    setAttempts((a) => a + 1);
    setStepIndex(0);
    setTotalKeystrokes(0);
    router.refresh();
  };

  const handleModalClose = () => {
    const shouldOpenEnding = modal?.triggersEnding ?? false;
    setModal(null);
    if (shouldOpenEnding) setEndingOpen(true);
  };

  if (!hasHydrated) {
    return (
      <div className="parchment p-8 flex items-center justify-center gap-2 text-muted">
        <Loader2 className="size-4 animate-spin" /> 진행도 불러오는 중…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href={`/realm/${realm.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> {realm.name}
      </Link>

      <header className="parchment p-6">
        <div className="text-xs uppercase tracking-widest text-muted">
          {realm.emoji} {realm.name} · #{mission.order}
          {mission.isBoss && " · 🐉 BOSS"}
        </div>
        <h1 className="mt-1 fantasy-title text-3xl text-accent">
          {mission.title}
        </h1>
        <p className="text-sm text-muted">{mission.fantasyTitle}</p>
        <p className="mt-3 text-foreground/85 text-sm">{mission.summary}</p>

        {/* Step progress */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {mission.steps.map((s, i) => (
            <span
              key={s.id}
              className={cn(
                "step-chip",
                i < stepIndex && "step-chip-done",
                i === stepIndex && "step-chip-active"
              )}
              title={`${s.kind} · step ${i + 1}/${totalSteps}`}
            >
              {i + 1}.{" "}
              {s.kind === "dialogue"
                ? "대화"
                : s.kind === "terminal"
                ? "주문"
                : s.kind === "vim"
                ? "검술"
                : "룬어"}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <span>+{mission.xpReward} XP (완료 시)</span>
          <span>·</span>
          <span>시도 {attempts}회</span>
          {previousResult && (
            <>
              <span>·</span>
              <span>최고 ★{previousResult.stars}</span>
            </>
          )}
        </div>
      </header>

      {/* 현재 step 의 briefing/hint (dialogue 가 아닐 때만) */}
      {currentStep.kind !== "dialogue" && (
        <section className="parchment p-5">
          <div className="text-xs uppercase tracking-widest text-muted">
            Step {stepIndex + 1} / {totalSteps} — {currentStep.kind === "terminal" ? "주문 시전" : currentStep.kind === "vim" ? "검술 수련" : "룬어 봉인"}
          </div>
          <p className="mt-2 text-foreground/90">{currentStep.briefing}</p>
          {currentStep.hint && (
            <details className="mt-2 text-sm">
              <summary className="cursor-pointer text-accent hover:text-accent-strong">
                힌트 보기
              </summary>
              <p className="mt-2 text-muted">{currentStep.hint}</p>
            </details>
          )}
        </section>
      )}

      <section key={currentStep.id}>
        {currentStep.kind === "dialogue" && (
          <DialoguePanel step={currentStep} onAdvance={() => advance()} />
        )}
        {currentStep.kind === "terminal" && (
          <TerminalPanel step={currentStep} onSuccess={() => advance()} />
        )}
        {currentStep.kind === "vim" && (
          <VimEditor step={currentStep} onSuccess={(info) => advance(info)} />
        )}
        {currentStep.kind === "language" && (
          <CodeEditor step={currentStep} onSuccess={() => advance()} />
        )}
      </section>

      <div className="flex justify-end">
        <button
          onClick={handleRetry}
          className="text-xs text-muted hover:text-foreground underline"
        >
          미션 처음부터 다시
        </button>
      </div>

      {modal && (
        <ResultModal
          open={modal.open}
          onClose={handleModalClose}
          mission={mission}
          stars={modal.stars}
          xpGained={modal.xpGained}
          leveledUp={modal.leveledUp}
          newLevel={modal.newLevel}
          newBadges={modal.newBadges}
          nextMissionId={nextMission?.id}
        />
      )}

      <EndingCredits open={endingOpen} onClose={() => setEndingOpen(false)} />
    </div>
  );
}
