"use client";

import Link from "next/link";
import { CheckCircle2, CircleAlert, ShieldCheck } from "lucide-react";
import { ALL_MISSIONS } from "@/content/missions";
import { REALMS } from "@/content/realms";
import { useGameStore } from "@/lib/store/game-store";

type GateStatus = "pass" | "warn";

type Gate = {
  label: string;
  status: GateStatus;
  detail: string;
};

export function ProductionReadinessPanel() {
  const missionResults = useGameStore((s) => s.missionResults);
  const cleared = Object.keys(missionResults).length;
  const hasAssessment = Object.values(missionResults).some(
    (result) => result.stars > 0 && result.attempts > 0
  );

  const gates: Gate[] = [
    {
      label: "Curriculum",
      status: ALL_MISSIONS.length > 0 && REALMS.length > 0 ? "pass" : "warn",
      detail: `${REALMS.length}개 렐름 · ${ALL_MISSIONS.length}개 미션`,
    },
    {
      label: "Onboarding",
      status: "pass",
      detail: "홈에서 추천 경로와 잠금 조건을 안내",
    },
    {
      label: "Learning loop",
      status: cleared > 0 ? "pass" : "warn",
      detail:
        cleared > 0
          ? `${cleared}개 미션 진행 기록 확인`
          : "첫 미션 완료 후 진행 루프가 채워짐",
    },
    {
      label: "Assessment",
      status: hasAssessment ? "pass" : "warn",
      detail: hasAssessment
        ? "별점과 시도 횟수 기반 평가 기록 있음"
        : "미션 완료 시 별점/시도 횟수 기록",
    },
    {
      label: "Privacy",
      status: "pass",
      detail: "진행도는 localStorage에 저장, 안내 페이지 제공",
    },
    {
      label: "Accessibility",
      status: "pass",
      detail: "본문 건너뛰기, 포커스 표시, 주요 버튼 라벨 적용",
    },
    {
      label: "Release checks",
      status: "pass",
      detail: "lint, typecheck, build를 release:check로 묶음",
    },
  ];

  return (
    <section className="parchment p-5" aria-labelledby="readiness-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">
            Production readiness
          </p>
          <h2 id="readiness-title" className="fantasy-title text-2xl text-accent">
            출시 준비 게이트
          </h2>
        </div>
        <Link
          href="/privacy"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-accent hover:bg-surface-strong"
        >
          <ShieldCheck className="size-4" />
          개인정보 보기
        </Link>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {gates.map((gate) => (
          <ReadinessGate key={gate.label} gate={gate} />
        ))}
      </div>
    </section>
  );
}

function ReadinessGate({ gate }: { gate: Gate }) {
  const isPass = gate.status === "pass";
  return (
    <article className="rounded-lg border border-border bg-surface/50 p-4">
      <div className="flex items-start gap-3">
        {isPass ? (
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-400" />
        ) : (
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-blade" />
        )}
        <div>
          <h3 className="font-mono text-sm text-foreground">{gate.label}</h3>
          <p className="mt-1 text-xs leading-5 text-muted">{gate.detail}</p>
        </div>
      </div>
    </article>
  );
}
