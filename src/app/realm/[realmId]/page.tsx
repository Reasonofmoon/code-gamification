"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getRealm } from "@/content/realms";
import { missionsByRealm } from "@/content/missions";
import { MissionCard } from "@/components/game/MissionCard";
import { useGameStore } from "@/lib/store/game-store";
import { realmIdSchema } from "@/types/mission";

export default function RealmPage() {
  const params = useParams<{ realmId: string }>();
  const parsed = realmIdSchema.safeParse(params.realmId);
  if (!parsed.success) return notFound();
  const realm = getRealm(parsed.data);

  const level = useGameStore((s) => s.level);
  const missionResults = useGameStore((s) => s.missionResults);
  const missions = missionsByRealm(realm.id);

  if (level < realm.requiredLevel) {
    return (
      <div className="parchment p-8 text-center">
        <div className="text-5xl">🔒</div>
        <h2 className="mt-3 fantasy-title text-2xl">아직 닿을 수 없는 대륙</h2>
        <p className="mt-2 text-muted">
          {realm.name} 은 Lv.{realm.requiredLevel} 부터 입장 가능. 현재 Lv.{level}.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-1.5 text-accent hover:text-accent-strong"
        >
          <ArrowLeft className="size-4" /> 월드맵으로
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> 월드맵
      </Link>

      <section className="parchment p-6">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{realm.emoji}</div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              {realm.subtitle}
            </p>
            <h1 className="fantasy-title text-3xl text-accent">{realm.name}</h1>
            <p className="mt-2 text-muted">{realm.flavor}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {missions.map((m, idx) => {
          const prevCleared =
            idx === 0 || Boolean(missionResults[missions[idx - 1].id]);
          const locked = !prevCleared;
          return (
            <MissionCard
              key={m.id}
              mission={m}
              result={missionResults[m.id]}
              locked={locked}
            />
          );
        })}
      </section>

      {missions.length === 0 && (
        <div className="parchment p-6 text-center text-muted">
          이 대륙의 미션은 아직 준비 중입니다. (v2 컨텐츠)
        </div>
      )}
    </div>
  );
}
