"use client";

import { REALMS } from "@/content/realms";
import { ALL_MISSIONS, missionsByRealm } from "@/content/missions";
import { RealmCard } from "@/components/game/RealmCard";
import { useGameStore } from "@/lib/store/game-store";
import { BADGES } from "@/lib/badges";
import { ExportImportControls } from "@/components/game/ExportImportControls";

export default function HomePage() {
  const level = useGameStore((s) => s.level);
  const missionResults = useGameStore((s) => s.missionResults);
  const badges = useGameStore((s) => s.badges);

  const clearedCount = Object.keys(missionResults).length;
  const totalCount = ALL_MISSIONS.length;

  return (
    <div className="space-y-10">
      <section className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">
          A Quest of the Cursor
        </p>
        <h1 className="fantasy-title text-4xl sm:text-5xl glow-accent text-accent">
          CodeQuest
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          세 개의 대륙을 여행하라. 셸홀름의 주문, 빔킵의 검술, 룬스카의 룬어 —
          진짜 개발자가 쓰는 도구가 그대의 무기다.
        </p>
        <div className="text-xs text-muted font-mono">
          진행도 {clearedCount} / {totalCount} 미션 · 뱃지 {badges.length} / {Object.keys(BADGES).length}
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REALMS.map((realm) => {
          const realmMissions = missionsByRealm(realm.id);
          const cleared = realmMissions.filter((m) => missionResults[m.id]).length;
          const unlocked = level >= realm.requiredLevel;
          return (
            <RealmCard
              key={realm.id}
              realm={realm}
              unlocked={unlocked}
              totalMissions={realmMissions.length}
              clearedMissions={cleared}
              playerLevel={level}
            />
          );
        })}
      </section>

      <section className="parchment p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-sm">
          <div className="fantasy-title text-base">진행도 보관·이전</div>
          <div className="text-xs text-muted">
            기기를 바꿔도 이어서 도전할 수 있도록 JSON 으로 백업·복원.
          </div>
        </div>
        <ExportImportControls />
      </section>
    </div>
  );
}
