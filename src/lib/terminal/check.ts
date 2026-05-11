import type { BaseTerminalCheck, TerminalCheck } from "@/types/mission";
import type { ShellState } from "./fake-shell";
import { commandsUsed } from "./fake-shell";

export function checkTerminalSuccess(
  state: ShellState,
  check: TerminalCheck
): boolean {
  if (check.type === "all") {
    return check.checks.every((c) => evalBase(state, c));
  }
  return evalBase(state, check);
}

function evalBase(state: ShellState, check: BaseTerminalCheck): boolean {
  switch (check.type) {
    case "lastOutputMatches": {
      const last = state.history[state.history.length - 1];
      if (!last) return false;
      return new RegExp(check.pattern).test(last.output);
    }
    case "cwdEquals":
      return state.cwd === check.path;
    case "fsHasFile":
      return state.files.has(check.path);
    case "fsHasDir":
      return state.dirs.has(check.path);
    case "fsMissingPath":
      return !state.files.has(check.path) && !state.dirs.has(check.path);
    case "commandUsed":
      return commandsUsed(state).includes(check.command);
  }
}
