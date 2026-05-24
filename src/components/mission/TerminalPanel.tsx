"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import type { TerminalChainStep, TerminalStep } from "@/types/mission";
import { createShell, runCommand, type ShellState } from "@/lib/terminal/fake-shell";
import { checkTerminalSuccess } from "@/lib/terminal/check";

type Props = {
  step: TerminalStep | TerminalChainStep;
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
  const completedObjectivesRef = useRef(0);
  const missesRef = useRef(0);
  const [solved, setSolved] = useState(false);
  const [completedObjectives, setCompletedObjectives] = useState(0);
  const [assist, setAssist] = useState<{
    kind: "hint" | "answer";
    text: string;
  } | null>(null);

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
    if (step.kind === "terminal-chain") {
      const first = step.objectives[0];
      term.writeln(`\x1b[36m목표 1/${step.objectives.length}: ${first.label}\x1b[0m`);
      if (first.hint) term.writeln(`\x1b[90m힌트: ${first.hint}\x1b[0m`);
    }
    prompt();

    const currentHint = () => {
      if (step.kind === "terminal-chain") {
        return step.objectives[completedObjectivesRef.current]?.hint ?? step.hint;
      }
      return step.hint;
    };

    const answerFromHint = (hint?: string) => {
      if (!hint) return null;
      const code = hint.match(/`([^`]+)`/);
      return code?.[1] ?? hint;
    };

    const showHelpAfterMiss = () => {
      missesRef.current += 1;
      const hint = currentHint();
      if (missesRef.current === 1 && hint) {
        setAssist({ kind: "hint", text: hint });
        term.writeln("");
        term.writeln(`\x1b[36m힌트: ${hint}\x1b[0m`);
        term.writeln("\x1b[90m힌트를 보고 같은 목표를 다시 시도하세요.\x1b[0m");
        return;
      }
      if (missesRef.current >= 2) {
        const answer = answerFromHint(hint);
        if (answer) {
          setAssist({ kind: "answer", text: answer });
          term.writeln("");
          term.writeln(`\x1b[33m정답: ${answer}\x1b[0m`);
          term.writeln("\x1b[90m정답을 그대로 다시 입력해 통과하세요.\x1b[0m");
        }
      }
    };

    const evaluate = (): boolean => {
      if (successFiredRef.current) return true;
      if (step.kind === "terminal-chain") {
        const objective = step.objectives[completedObjectivesRef.current];
        if (!objective) return false;
        const last = shell.history[shell.history.length - 1];
        if (
          objective.commandPattern &&
          (!last || !new RegExp(objective.commandPattern).test(last.command))
        ) {
          return false;
        }
        if (!checkTerminalSuccess(shell, objective.successWhen)) return false;

        completedObjectivesRef.current += 1;
        missesRef.current = 0;
        setAssist(null);
        setCompletedObjectives(completedObjectivesRef.current);
        term.writeln("");
        term.writeln(
          `\x1b[1;32m✔ ${objective.label} 완료 (${completedObjectivesRef.current}/${step.objectives.length})\x1b[0m`
        );
        if (completedObjectivesRef.current < step.objectives.length) {
          const next = step.objectives[completedObjectivesRef.current];
          term.writeln(`\x1b[36m다음: ${next.label}\x1b[0m`);
          if (next.hint) term.writeln(`\x1b[90m힌트: ${next.hint}\x1b[0m`);
          return true;
        }
        successFiredRef.current = true;
        setSolved(true);
        term.writeln("");
        term.writeln("\x1b[1;32m✔ 단계 통과 — 다음 장면으로…\x1b[0m");
        setTimeout(onSuccess, 600);
        return true;
      }

      if (checkTerminalSuccess(shell, step.successWhen)) {
        missesRef.current = 0;
        setAssist(null);
        successFiredRef.current = true;
        setSolved(true);
        term.writeln("");
        term.writeln("\x1b[1;32m✔ 단계 통과 — 다음 장면으로…\x1b[0m");
        setTimeout(onSuccess, 600);
        return true;
      }
      return false;
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
      const passed = evaluate();
      if (!passed) showHelpAfterMiss();
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
      {step.kind === "terminal-chain" && (
        <div className="flex flex-wrap gap-1.5">
          {step.objectives.map((objective, index) => (
            <span
              key={objective.id}
              className={
                index < completedObjectives
                  ? "step-chip step-chip-done"
                  : index === completedObjectives
                  ? "step-chip step-chip-active"
                  : "step-chip"
              }
            >
              {index + 1}. {objective.label}
            </span>
          ))}
        </div>
      )}
      {assist && (
        <div
          className={
            assist.kind === "answer"
              ? "rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-200"
              : "rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100"
          }
        >
          <span className="font-semibold">
            {assist.kind === "answer" ? "정답" : "힌트"}:
          </span>{" "}
          <code className="font-mono">{assist.text}</code>
          {assist.kind === "answer" && (
            <span className="ml-2 text-amber-100/80">
              그대로 다시 입력해 통과하세요.
            </span>
          )}
        </div>
      )}
      {solved && (
        <div className="text-sm text-emerald-400 fantasy-title">
          ✓ 단계 통과. 다음 장면으로 이동합니다…
        </div>
      )}
    </div>
  );
}
