"use client";

import { useRef, useState } from "react";
import { Download, Upload, RotateCcw } from "lucide-react";
import { useGameStore } from "@/lib/store/game-store";

export function ExportImportControls() {
  const exportJson = useGameStore((s) => s.exportJson);
  const importJson = useGameStore((s) => s.importJson);
  const reset = useGameStore((s) => s.reset);
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const handleExport = () => {
    const json = exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `codequest-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    const text = await file.text();
    const ok = importJson(text);
    setMsg(ok ? "✓ 진행도 복원 완료" : "✘ 잘못된 파일입니다");
    setTimeout(() => setMsg(null), 3000);
  };

  const handleReset = () => {
    if (window.confirm("정말 모든 진행도를 초기화하시겠습니까? 되돌릴 수 없습니다.")) {
      reset();
      setMsg("✓ 진행도 초기화됨");
      setTimeout(() => setMsg(null), 3000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={handleExport}
        aria-label="진행도 JSON 내보내기"
        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-surface-strong"
      >
        <Download className="size-3.5" /> 내보내기
      </button>
      <button
        onClick={() => fileRef.current?.click()}
        aria-label="진행도 JSON 가져오기"
        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-surface-strong"
      >
        <Upload className="size-3.5" /> 가져오기
      </button>
      <button
        onClick={handleReset}
        aria-label="저장된 진행도 초기화"
        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-danger/10 text-danger"
      >
        <RotateCcw className="size-3.5" /> 초기화
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        className="hidden"
        aria-label="진행도 JSON 파일 선택"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleImport(f);
          e.target.value = "";
        }}
      />
      {msg && <span className="text-xs text-muted">{msg}</span>}
    </div>
  );
}
