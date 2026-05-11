"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import type { TerminalStep } from "@/types/mission";
import { createShell, runCommand, type ShellState } from "@/lib/terminal/fake-shell";
import { checkTerminalSuccess } from "@/lib/terminal/check";

type Props = {
  step: TerminalStep;
  onSuccess: () => void;
};

export function TerminalPanel({ step, onSuccess }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const shellRef = useRef<ShellState | null>(null);
  const lineBufRef = useRef("");
  const cursorRef = useRef(0);
  const successFiredRef = useRef(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new Terminal({
      fontFamily:
        'var(--font-geist-mono, "JetBrainsMono"), Menlo, Monaco, "Cascadia Code", monospace',
      fontSize: 14,
      cursorBlink: true,
      theme: {
        background: "#0a0814",
        foreground: "#ece9f5",
        cursor: "#f7b955",
        selectionBackground: "#3b3563",
      },
    });
    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(containerRef.current);
    fit.fit();
    termRef.current = term;
    fitRef.current = fit;

    const shell = createShell(step.initialFs, step.initialCwd);
    shellRef.current = shell;

    const prompt = () =>
      term.write(`\r\n\x1b[35m${shell.cwd}\x1b[0m \x1b[33m❯\x1b[0m `);

    term.writeln("\x1b[33m✦ 견습 터미널 — 'help' 입력으로 사용 가능한 주문 확인.\x1b[0m");
    prompt();

    const evaluate = () => {
      if (successFiredRef.current) return;
      if (checkTerminalSuccess(shell, step.successWhen)) {
        successFiredRef.current = true;
        setSolved(true);
        term.writeln("");
        term.writeln("\x1b[1;32m✔ 단계 통과 — 다음 장면으로…\x1b[0m");
        setTimeout(onSuccess, 600);
      }
    };

    const submit = () => {
      const line = lineBufRef.current;
      lineBufRef.current = "";
      cursorRef.current = 0;
      term.writeln("");
      if (line.trim() === "") {
        prompt();
        return;
      }
      const result = runCommand(shell, line);
      if (result.output === "__CLEAR__") {
        term.clear();
      } else if (result.output) {
        const color = result.ok ? "\x1b[0m" : "\x1b[31m";
        term.write(color + result.output.replace(/\n/g, "\r\n") + "\x1b[0m");
      }
      evaluate();
      if (!successFiredRef.current) prompt();
    };

    const onData = term.onData((data) => {
      if (successFiredRef.current) return;
      for (let i = 0; i < data.length; i++) {
        const ch = data[i];
        const code = ch.charCodeAt(0);
        if (ch === "\r") {
          submit();
        } else if (code === 127) {
          if (cursorRef.current > 0) {
            lineBufRef.current =
              lineBufRef.current.slice(0, cursorRef.current - 1) +
              lineBufRef.current.slice(cursorRef.current);
            cursorRef.current--;
            term.write("\b \b");
          }
        } else if (ch === "\x03") {
          term.writeln("^C");
          lineBufRef.current = "";
          cursorRef.current = 0;
          prompt();
        } else if (code >= 32 && code < 127) {
          lineBufRef.current =
            lineBufRef.current.slice(0, cursorRef.current) +
            ch +
            lineBufRef.current.slice(cursorRef.current);
          cursorRef.current++;
          term.write(ch);
        }
      }
    });

    const onResize = () => fit.fit();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      onData.dispose();
      term.dispose();
    };
  }, [step, onSuccess]);

  return (
    <div className="space-y-2">
      <div className="text-xs text-muted">
        ※ 이것은 학습용 가상 셸입니다. 실제 시스템에는 영향이 없습니다.
      </div>
      <div ref={containerRef} className="xterm-frame" />
      {solved && (
        <div className="text-sm text-emerald-400 fantasy-title">
          ✓ 단계 통과. 다음 장면으로 이동합니다…
        </div>
      )}
    </div>
  );
}
