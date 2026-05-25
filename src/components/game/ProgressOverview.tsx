"use client";

import Link from "next/link";
import { ALL_MISSIONS, missionsByRealm } from "@/content/missions";
import { REALMS } from "@/content/realms";
import { BADGES } from "@/lib/badges";
import { useGameStore } from "@/lib/store/game-store";

function pct(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function ProgressOverview() {
  const level = useGameStore((s) => s.level);
  const xp = useGameStore((s) => s.xp);
  const streakDays = useGameStore((s) => s.streakDays);
  const missionResults = useGameStore((s) => s.missionResults);
  const badges = useGameStore((s) => s.badges);

  const cleared = Object.keys(missionResults).length;
  const total = ALL_MISSIONS.length;
  const threeStarClears = Object.values(missionResults).filter(
    (result) => result.stars === 3
  ).length;
  const completion = pct(cleared, total);
  const accuracy = pct(threeStarClears, Math.max(cleared, 1));

  const nextRealm = REALMS.find((realm) => {
    if (level < realm.requiredLevel) return false;
    const realmMissions = missionsByRealm(realm.id);
    return realmMissions.some((mission) => !missionResults[mission.id]);
  });

  return (
    <section
      aria-labelledby="progress-overview-title"
      className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]"
    >
      <div className="parchment p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Learning loop
            </p>
            <h2
              id="progress-overview-title"
              className="fantasy-title text-2xl text-accent"
            >
              오늘의 수련 현황
            </h2>
          </div>
          <div className="text-sm text-muted">
            Lv.{level} · {xp} XP · {streakDays}일 연속
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Metric label="미션 완료" value={`${cleared}/${total}`} />
          <Metric label="완료율" value={`${completion}%`} />
          <Metric label="3성 숙련도" value={`${accuracy}%`} />
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>전체 진행도</span>
            <span>{completion}%</span>
          </div>
          <div
            className="mt-2 h-2 rounded-full bg-surface-strong overflow-hidden border border-border"
            aria-hidden="true"
          >
            <div
              className="h-full bg-accent transition-[width] duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>

      <aside className="parchment p-5" aria-labelledby="next-step-title">
        <p className="text-xs uppercase tracking-widest text-muted">
          Next action
        </p>
        <h2 id="next-step-title" className="fantasy-title text-xl text-accent">
          다음 추천 경로
        </h2>
        {nextRealm ? (
          <>
            <p className="mt-3 text-sm text-foreground/85">
              {nextRealm.name}에서 아직 끝내지 않은 미션을 이어가세요.
            </p>
            <Link
              href={`/realm/${nextRealm.id}`}
              className="mt-4 inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm text-accent hover:bg-surface-strong"
            >
              {nextRealm.name} 진입
            </Link>
          </>
        ) : (
          <p className="mt-3 text-sm text-foreground/85">
            현재 레벨에서 가능한 미션을 모두 완료했습니다. 3성 도전과 뱃지 수집을 점검하세요.
          </p>
        )}
        <p className="mt-4 text-xs text-muted">
          뱃지 {badges.length}/{Object.keys(BADGES).length}
        </p>
      </aside>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface/50 p-3">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-1 font-mono text-lg text-foreground">{value}</div>
    </div>
  );
}
