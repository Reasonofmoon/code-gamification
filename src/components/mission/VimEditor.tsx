"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Mission } from "@/types/mission";
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
  mission: Mission;
  onSuccess: (info: { keystrokes: number }) => void;
};

export function VimEditor({ mission, onSuccess }: Props) {
  if (mission.evaluator.kind !== "vim") {
    throw new Error("VimEditor requires a vim mission");
  }
  const evaluator = mission.evaluator;

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const vimModeRef = useRef<{ dispose(): void } | null>(null);
  const successFiredRef = useRef(false);
  const [mode, setMode] = useState<string>("--NORMAL--");
  const [keystrokes, setKeystrokes] = useState(0);

  useEffect(() => {
    return () => {
      vimModeRef.current?.dispose();
    };
  }, []);

  const checkSuccess = () => {
    if (successFiredRef.current) return;
    const editorVal = editorRef.current?.getValue() ?? "";
    if (editorVal === evaluator.targetText) {
      successFiredRef.current = true;
      onSuccess({ keystrokes });
    }
  };

  const handleMount = async (
    e: editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = e;

    e.onKeyDown(() => setKeystrokes((k) => k + 1));
    e.onDidChangeModelContent(() => checkSuccess());

    try {
      const monacoVim = await import("monaco-vim");
      const statusNode = document.getElementById(`vim-status-${mission.id}`);
      vimModeRef.current = monacoVim.initVimMode(e, statusNode ?? undefined);
    } catch (err) {
      console.error("monaco-vim load failed", err);
    }

    const watcher = setInterval(() => {
      const node = document.getElementById(`vim-status-${mission.id}`);
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
          defaultValue={evaluator.initialText}
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
          id={`vim-status-${mission.id}`}
          className="font-mono text-xs px-2 py-1 rounded bg-surface-strong border border-border min-w-[120px] text-center"
        >
          {mode}
        </div>
        <div className="text-xs text-muted">
          목표 키스트로크: ★★★ ≤ {evaluator.parThreeStars} / ★★ ≤ {evaluator.parTwoStars}
        </div>
      </div>
    </div>
  );
}
