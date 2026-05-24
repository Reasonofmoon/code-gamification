"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Play, Loader2 } from "lucide-react";
import type { LanguageStep } from "@/types/mission";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] grid place-items-center text-muted">
      에디터 소환 중…
    </div>
  ),
});

type RunResponse = {
  ok: boolean;
  stdout?: string;
  stderr?: string;
  error?: string;
  cases?: { expected: string; got: string; passed: boolean }[];
  passed?: boolean;
};

type Props = {
  step: LanguageStep;
  onSuccess: () => void;
};

export function CodeEditor({ step, onSuccess }: Props) {
  const [code, setCode] = useState(step.starterCode);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<RunResponse | null>(null);
  const [failures, setFailures] = useState(0);
  const [assist, setAssist] = useState<{
    kind: "hint" | "answer";
    text: string;
  } | null>(null);

  const answerFromHint = () => {
    if (!step.hint) return null;
    const codeBlock = step.hint.match(/```(?:\w+)?\n([\s\S]+?)```/);
    if (codeBlock) return codeBlock[1].trim();
    const inline = step.hint.match(/`([^`]+)`/);
    return inline?.[1] ?? null;
  };

  const showAssistAfterFailure = () => {
    const nextFailures = failures + 1;
    setFailures(nextFailures);
    if (nextFailures === 1 && step.hint) {
      setAssist({ kind: "hint", text: step.hint });
      return;
    }
    if (nextFailures >= 2) {
      const answer = answerFromHint();
      if (answer) setAssist({ kind: "answer", text: answer });
    }
  };

  const run = async () => {
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/run-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          languageId: step.languageId,
          code,
          testCases: step.testCases,
        }),
      });
      const json: RunResponse = await res.json();
      setResult(json);
      if (json.passed) {
        setAssist(null);
        onSuccess();
      } else {
        showAssistAfterFailure();
      }
    } catch (err) {
      setResult({
        ok: false,
        error: (err as Error).message || "네트워크 오류",
      });
      showAssistAfterFailure();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border overflow-hidden">
        <MonacoEditor
          height="300px"
          language={step.languageId}
          value={code}
          theme="vs-dark"
          onChange={(v) => setCode(v ?? "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted">
          언어: <span className="text-accent uppercase">{step.languageId}</span> · Judge0 실행
        </div>
        <button
          onClick={run}
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-strong disabled:opacity-60"
        >
          {busy ? (
            <>
              <Loader2 className="size-4 animate-spin" /> 룬 봉인 중…
            </>
          ) : (
            <>
              <Play className="size-4" /> 룬 봉인 (실행)
            </>
          )}
        </button>
      </div>
      {result && (
        <div className="rounded-lg border border-border bg-surface-strong p-4 text-sm space-y-2">
          {result.error && (
            <div className="text-danger">⚠ {result.error}</div>
          )}
          {result.stderr && (
            <pre className="text-danger whitespace-pre-wrap text-xs">{result.stderr}</pre>
          )}
          {result.cases && (
            <div className="space-y-1">
              {result.cases.map((c, i) => (
                <div
                  key={i}
                  className={`text-xs font-mono ${
                    c.passed ? "text-emerald-400" : "text-danger"
                  }`}
                >
                  케이스 {i + 1}: {c.passed ? "PASS" : "FAIL"}
                  {!c.passed && (
                    <span className="text-muted">
                      {" "}
                      기대 「{c.expected}」 · 실제 「{c.got}」
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          {result.passed && (
            <div className="text-emerald-400 fantasy-title">
              ✓ 모든 시험 통과! 룬이 빛난다…
            </div>
          )}
        </div>
      )}
      {assist && (
        <div
          className={
            assist.kind === "answer"
              ? "rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-100"
              : "rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100"
          }
        >
          <div className="font-semibold">
            {assist.kind === "answer" ? "정답" : "힌트"}
          </div>
          {assist.kind === "answer" ? (
            <>
              <pre className="mt-2 whitespace-pre-wrap rounded bg-black/25 p-3 font-mono text-xs">
                {assist.text}
              </pre>
              <button
                type="button"
                onClick={() => {
                  setCode(assist.text);
                  setFailures(0);
                  setAssist(null);
                  setResult(null);
                }}
                className="mt-2 rounded-md border border-amber-300/40 px-3 py-1 text-xs text-amber-100 hover:bg-amber-300/10"
              >
                정답으로 채우고 다시 실행
              </button>
            </>
          ) : (
            <code className="mt-1 block whitespace-pre-wrap font-mono">
              {assist.text}
            </code>
          )}
        </div>
      )}
    </div>
  );
}
