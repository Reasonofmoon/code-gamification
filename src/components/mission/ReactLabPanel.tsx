"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, MousePointerClick, Play } from "lucide-react";
import type { ReactLabStep } from "@/types/mission";

type Props = {
  step: ReactLabStep;
  onSuccess: () => void;
};

export function ReactLabPanel({ step, onSuccess }: Props) {
  const [solved, setSolved] = useState(false);

  const complete = () => {
    if (solved) return;
    setSolved(true);
    window.setTimeout(onSuccess, 650);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-surface/50 p-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted">
          <MousePointerClick className="size-3.5" />
          React Workshop
        </div>
        <p className="mt-2 text-sm leading-6 text-foreground/85">
          실제 React 상태와 이벤트로 통과하는 실습입니다. 코드를 직접 실행하는 대신
          화면의 동작을 조작하며 컴포넌트 모델을 확인합니다.
        </p>
      </div>

      {step.labKind === "component-props" && (
        <ComponentPropsLab onSolved={complete} />
      )}
      {step.labKind === "state-event" && <StateEventLab onSolved={complete} />}
      {step.labKind === "conditional-render" && (
        <ConditionalRenderLab onSolved={complete} />
      )}
      {step.labKind === "import-export" && (
        <ImportExportLab onSolved={complete} />
      )}

      {solved && (
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
          <CheckCircle2 className="mr-1 inline size-4" />
          React 실습 통과. 다음 장면으로 이동합니다…
        </div>
      )}
    </div>
  );
}

function ComponentPropsLab({ onSolved }: { onSolved: () => void }) {
  const [title, setTitle] = useState("보스 시험");
  const [locked, setLocked] = useState(true);
  const preview = `${locked ? "LOCKED" : "OPEN"}: ${title}`;
  const target = "OPEN: 첫 룬";

  return (
    <LabShell
      title="Props로 같은 컴포넌트 다르게 그리기"
      code={[
        "function MissionPreview({ title, locked }) {",
        "  return `${locked ? 'LOCKED' : 'OPEN'}: ${title}`;",
        "}",
      ]}
      goal={`미리보기를 정확히 "${target}" 로 만드세요.`}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="text-muted">title prop</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={locked}
            onChange={(event) => setLocked(event.target.checked)}
          />
          locked prop
        </label>
      </div>
      <Preview value={preview} />
      <CheckButton passed={preview === target} onSolved={onSolved} />
    </LabShell>
  );
}

function StateEventLab({ onSolved }: { onSolved: () => void }) {
  const [count, setCount] = useState(0);
  return (
    <LabShell
      title="이벤트가 상태를 바꾸는 흐름"
      code={[
        "const [count, setCount] = useState(0);",
        "<button onClick={() => setCount(count + 1)}>",
        "  count: {count}",
        "</button>",
      ]}
      goal="버튼 이벤트로 count를 3까지 올리세요."
    >
      <button
        type="button"
        onClick={() => setCount((value) => value + 1)}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background hover:bg-accent-strong"
      >
        <Play className="size-4" />
        count: {count}
      </button>
      <CheckButton passed={count >= 3} onSolved={onSolved} />
    </LabShell>
  );
}

function ConditionalRenderLab({ onSolved }: { onSolved: () => void }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <LabShell
      title="조건부 렌더링"
      code={[
        "{showHint && (",
        "  <p>힌트가 열렸습니다</p>",
        ")}",
      ]}
      goal="상태를 true로 바꿔 힌트 문장을 화면에 렌더링하세요."
    >
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={showHint}
          onChange={(event) => setShowHint(event.target.checked)}
        />
        showHint
      </label>
      <div className="min-h-12 rounded-lg border border-border bg-background/60 p-3 text-sm">
        {showHint ? "힌트가 열렸습니다" : "아직 렌더링된 힌트가 없습니다"}
      </div>
      <CheckButton passed={showHint} onSolved={onSolved} />
    </LabShell>
  );
}

function ImportExportLab({ onSolved }: { onSolved: () => void }) {
  const [exportLine, setExportLine] = useState("export default MissionCard");
  const [importLine, setImportLine] = useState("import MissionCard from './MissionCard'");
  const passed =
    exportLine === "export function MissionCard" &&
    importLine === "import { MissionCard } from './MissionCard'";

  return (
    <LabShell
      title="named export와 named import 맞추기"
      code={[
        "// MissionCard.tsx",
        "export function MissionCard() {}",
        "",
        "// RealmPage.tsx",
        "import { MissionCard } from './MissionCard';",
      ]}
      goal="export 방식과 import 방식이 서로 맞는 조합을 고르세요."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <SelectBox
          label="MissionCard.tsx"
          value={exportLine}
          options={[
            "export default MissionCard",
            "export function MissionCard",
            "module.exports = MissionCard",
          ]}
          onChange={setExportLine}
        />
        <SelectBox
          label="RealmPage.tsx"
          value={importLine}
          options={[
            "import MissionCard from './MissionCard'",
            "import { MissionCard } from './MissionCard'",
            "const MissionCard = require('./MissionCard')",
          ]}
          onChange={setImportLine}
        />
      </div>
      <CheckButton passed={passed} onSolved={onSolved} />
    </LabShell>
  );
}

function LabShell({
  title,
  code,
  goal,
  children,
}: {
  title: string;
  code: string[];
  goal: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-xl border border-border bg-[#0a0814] p-4">
        <h3 className="fantasy-title text-lg text-accent">{title}</h3>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-cyan-100">
          {code.join("\n")}
        </pre>
      </div>
      <div className="rounded-xl border border-border bg-surface-strong p-4">
        <p className="text-sm text-muted">{goal}</p>
        <div className="mt-4 space-y-3">{children}</div>
      </div>
    </div>
  );
}

function Preview({ value }: { value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3 font-mono text-sm text-foreground">
      {value}
    </div>
  );
}

function CheckButton({
  passed,
  onSolved,
}: {
  passed: boolean;
  onSolved: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSolved}
      disabled={!passed}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-accent hover:bg-surface-strong disabled:cursor-not-allowed disabled:opacity-50"
    >
      <CheckCircle2 className="size-4" />
      검증
    </button>
  );
}

function SelectBox({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const id = useMemo(() => label.replace(/[^a-zA-Z0-9]/g, "-"), [label]);
  return (
    <label htmlFor={id} className="block text-sm">
      <span className="text-muted">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
