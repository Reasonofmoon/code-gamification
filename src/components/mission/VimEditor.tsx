"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { VimStep } from "@/types/mission";
import type { editor } from "monaco-editor";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[360px] grid place-items-center text-muted">
      에디터 소환 중…
    </div>
  ),
});

type Props = {
  step: VimStep;
  onSuccess: (info: { keystrokes: number }) => void;
};

export function VimEditor({ step, onSuccess }: Props) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const vimModeRef = useRef<{ dispose(): void } | null>(null);
  const successFiredRef = useRef(false);
  const [mode, setMode] = useState<string>("--NORMAL--");
  const [keystrokes, setKeystrokes] = useState(0);
  const [assist, setAssist] = useState<{
    kind: "hint" | "answer";
    text: string;
  } | null>(null);

  useEffect(() => {
    return () => {
      vimModeRef.current?.dispose();
    };
  }, []);

  const checkSuccess = () => {
    if (successFiredRef.current) return;
    const editorVal = editorRef.current?.getValue() ?? "";
    if (editorVal === step.targetText) {
      successFiredRef.current = true;
      setAssist(null);
      onSuccess({ keystrokes });
    }
  };

  const updateAssist = (nextKeystrokes: number) => {
    if (successFiredRef.current) return;
    const editorVal = editorRef.current?.getValue() ?? step.initialText;
    if (editorVal === step.targetText) return;
    if (nextKeystrokes > step.parTwoStars) {
      setAssist({ kind: "answer", text: step.targetText });
    } else if (nextKeystrokes > step.parThreeStars && step.hint) {
      setAssist({ kind: "hint", text: step.hint });
    }
  };

  const resetForPractice = () => {
    successFiredRef.current = false;
    editorRef.current?.setValue(step.initialText);
    setKeystrokes(0);
    setAssist(null);
    editorRef.current?.focus();
  };

  const handleMount = async (e: editor.IStandaloneCodeEditor) => {
    editorRef.current = e;

    e.onKeyDown(() =>
      setKeystrokes((k) => {
        const next = k + 1;
        window.setTimeout(() => updateAssist(next), 0);
        return next;
      })
    );
    e.onDidChangeModelContent(() => {
      checkSuccess();
      window.setTimeout(() => updateAssist(keystrokes), 0);
    });

    try {
      const monacoVim = await import("monaco-vim");
      const statusNode = document.getElementById(`vim-status-${step.id}`);
      vimModeRef.current = monacoVim.initVimMode(e, statusNode ?? undefined);
    } catch (err) {
      console.error("monaco-vim load failed", err);
    }

    const watcher = setInterval(() => {
      const node = document.getElementById(`vim-status-${step.id}`);
      if (node) setMode(node.textContent || "--NORMAL--");
    }, 200);
    e.onDidDispose(() => clearInterval(watcher));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <div className="text-muted">
          ※ Normal·Insert·Visual 모드 지원. <kbd className="px-1 py-0.5 rounded bg-surface-strong border border-border">Esc</kbd> 로 Normal 복귀.
        </div>
        <div className="font-mono text-foreground">
          ⌨ {keystrokes} keys
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <MonacoEditor
          height="360px"
          defaultLanguage="markdown"
          defaultValue={step.initialText}
          theme="vs-dark"
          onMount={(e) => void handleMount(e as editor.IStandaloneCodeEditor)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            lineNumbers: "on",
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div
          id={`vim-status-${step.id}`}
          className="font-mono text-xs px-2 py-1 rounded bg-surface-strong border border-border min-w-[120px] text-center"
        >
          {mode}
        </div>
        <div className="text-xs text-muted">
          목표 키스트로크: ★★★ ≤ {step.parThreeStars} / ★★ ≤ {step.parTwoStars}
        </div>
      </div>
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
                onClick={resetForPractice}
                className="mt-2 rounded-md border border-amber-300/40 px-3 py-1 text-xs text-amber-100 hover:bg-amber-300/10"
              >
                처음 상태로 다시 연습
              </button>
            </>
          ) : (
            <code className="mt-1 block font-mono">{assist.text}</code>
          )}
        </div>
      )}
    </div>
  );
}
