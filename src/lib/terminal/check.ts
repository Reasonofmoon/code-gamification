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
    case "gitRepoInitialized":
      return state.git.repos.has(check.at);
    case "gitNoRepoAt":
      return !state.git.repos.has(check.at);
    case "gitStagedFile": {
      return [...state.git.repos.values()].some((repo) =>
        repo.staged.has(check.file)
      );
    }
    case "gitCommitCount": {
      return [...state.git.repos.values()].some(
        (repo) => repo.commits.length >= check.min
      );
    }
    case "gitCurrentBranch": {
      return [...state.git.repos.values()].some((repo) => repo.head === check.name);
    }
    case "gitRemoteExists": {
      return [...state.git.repos.values()].some((repo) =>
        repo.remotes.has(check.name)
      );
    }
    case "ghAuthScopeIncludes":
      return state.gh.scopes.has(check.scope);
    case "gitMergeResolved": {
      return [...state.git.conflicts.values()].every((conflict) =>
        check.file ? conflict.file !== check.file || conflict.resolved : conflict.resolved
      );
    }
    case "gitLastPush":
      return (
        state.git.lastPushed?.remote === check.remote &&
        state.git.lastPushed.branch === check.branch
      );
    case "ghPrMerged":
      return state.gh.prs.some(
        (pr) => pr.merged && (check.number === undefined || pr.number === check.number)
      );
  }
}
