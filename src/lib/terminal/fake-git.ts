import type { ShellState } from "./fake-shell";

export type FakeGitState = {
  repos: Map<string, FakeRepo>;
  conflicts: Map<string, FakeConflict>;
  lastPushed: { remote: string; branch: string } | null;
};

export type FakeRepo = {
  root: string;
  head: string;
  upstream: string | null;
  staged: Set<string>;
  commits: FakeCommit[];
  remotes: Map<string, string>;
  branches: Map<string, string | null>;
  trackedFiles: Map<string, string>;
  mergedBranches: Set<string>;
};

export type FakeCommit = {
  hash: string;
  message: string;
  branch: string;
  files: string[];
};

export type FakeConflict = {
  repoRoot: string;
  file: string;
  resolved: boolean;
};

export type FakeGhState = {
  loggedIn: boolean;
  account: string;
  scopes: Set<string>;
  repos: Map<string, { owner: string; name: string; sourcePath: string }>;
  prs: { number: number; title: string; body: string; branch: string; merged: boolean }[];
};

type CommandResult = { output: string; ok: boolean };

export function createFakeGitState(): FakeGitState {
  return { repos: new Map(), conflicts: new Map(), lastPushed: null };
}

export function createFakeGhState(): FakeGhState {
  return {
    loggedIn: true,
    account: "Reasonofmoon",
    scopes: new Set(["read:org"]),
    repos: new Map(),
    prs: [],
  };
}

export function seedGitFromFs(state: ShellState) {
  for (const dir of [...state.dirs]) {
    if (!dir.endsWith("/.git")) continue;
    const root = parentOf(dir);
    if (!state.git.repos.has(root)) state.git.repos.set(root, createSeedRepo(state, root));
  }

  for (const [path, content] of [...state.files]) {
    if (!path.endsWith(".forge-git.json")) continue;
    try {
      const seed = JSON.parse(content) as {
        root?: string;
        branch?: string;
        commits?: string[];
        trackedFiles?: string[];
        remotes?: Record<string, string>;
        scopes?: string[];
        prs?: { title?: string; body?: string; branch?: string; merged?: boolean }[];
      };
      const root = normalizeAbs(seed.root ?? parentOf(path));
      const repo = state.git.repos.get(root) ?? createSeedRepo(state, root);
      repo.head = seed.branch ?? repo.head;
      repo.branches.set(repo.head, repo.branches.get(repo.head) ?? null);
      for (const [name, url] of Object.entries(seed.remotes ?? {})) repo.remotes.set(name, url);
      for (const scope of seed.scopes ?? []) state.gh.scopes.add(scope);
      const commits = seed.commits ?? [];
      const worktreeFiles = listWorktreeFiles(state, repo).filter((file) => !file.endsWith(".forge-git.json"));
      for (let i = commits.length - 1; i >= 0; i--) {
        const message = commits[i];
        const hash = fakeHash(repo.commits.length + 1, message);
        repo.commits.unshift({ hash, message, branch: repo.head, files: worktreeFiles });
      }
      if (repo.commits[0]) repo.branches.set(repo.head, repo.commits[0].hash);
      repo.trackedFiles.clear();
      const filesToTrack = seed.trackedFiles ?? (commits.length > 0 ? worktreeFiles : []);
      for (const file of filesToTrack) {
        repo.trackedFiles.set(file, state.files.get(join(root, file)) ?? "");
      }
      for (const pr of seed.prs ?? []) {
        state.gh.prs.push({
          number: state.gh.prs.length + 1,
          title: pr.title ?? "forge changes",
          body: pr.body ?? "",
          branch: pr.branch ?? repo.head,
          merged: pr.merged ?? false,
        });
      }
      state.git.repos.set(root, repo);
      state.files.delete(path);
    } catch {
      state.files.delete(path);
    }
  }
}

export function dispatchGit(state: ShellState, args: string[]): CommandResult {
  if (args.length === 0) return { output: "git: 사용법: git <command> [args]", ok: false };
  const [sub, ...rest] = args;

  if (sub === "-v" || sub === "--version" || sub === "version") {
    return { output: "git version 2.43.0-forge", ok: true };
  }
  if (sub === "init") return gitInit(state, rest);
  if (sub === "status") return gitStatus(state);
  if (sub === "add") return gitAdd(state, rest);
  if (sub === "commit") return gitCommit(state, rest);
  if (sub === "log") return gitLog(state);
  if (sub === "remote") return gitRemote(state, rest);
  if (sub === "push") return gitPush(state, rest);
  if (sub === "pull") return { output: "Already up to date.", ok: true };
  if (sub === "clone") return gitClone(state, rest);
  if (sub === "branch") return gitBranch(state);
  if (sub === "switch" || sub === "checkout") return gitSwitch(state, rest);
  if (sub === "merge") return gitMerge(state, rest);
  if (sub === "rebase") {
    if (rest.includes("-i") || rest.includes("--interactive")) {
      return {
        output: [
          "Successfully rebased and updated refs/heads/main.",
          "(squash · reword · drop 으로 커밋 정리 완료)",
        ].join("\n"),
        ok: true,
      };
    }
    return { output: `Successfully rebased onto ${rest[0] ?? "main"}.`, ok: true };
  }
  if (sub === "cherry-pick") {
    return { output: `[main abc1234] cherry-picked: ${rest[0] ?? "commit"}`, ok: true };
  }
  if (sub === "bisect" && rest[0] === "start") {
    return { output: "Bisecting started. git bisect good|bad 으로 좁혀가시오.", ok: true };
  }

  return { output: `git: 알 수 없는 서브커맨드 '${sub}'`, ok: false };
}

export function dispatchGh(state: ShellState, args: string[]): CommandResult {
  if (args.length === 0) return { output: "gh: GitHub CLI. 사용법: gh <command> [args]", ok: false };
  const [sub, ...rest] = args;

  if (sub === "auth" && rest[0] === "status") {
    return {
      output: [
        "github.com",
        `  ✓ Logged in to github.com account ${state.gh.account}`,
        "  - Active account: true",
        `  - Token scopes: ${[...state.gh.scopes].sort().join(", ")}`,
      ].join("\n"),
      ok: true,
    };
  }
  if (sub === "auth" && rest[0] === "refresh") {
    const scopeArg = rest.find((a) => a === "--scopes" || a.startsWith("--scopes="));
    const scopeValue =
      scopeArg === "--scopes"
        ? rest[rest.indexOf(scopeArg) + 1]
        : scopeArg?.slice("--scopes=".length);
    if (!scopeValue) return { output: "gh: --scopes 값이 필요합니다", ok: false };
    for (const scope of scopeValue.split(",")) state.gh.scopes.add(scope.trim());
    return { output: `✓ Authentication refreshed. Token scopes: ${[...state.gh.scopes].sort().join(", ")}`, ok: true };
  }
  if (sub === "repo" && rest[0] === "create") return ghRepoCreate(state, rest.slice(1));
  if (sub === "repo" && rest[0] === "view") {
    return {
      output: [
        "Reasonofmoon/code-gamification",
        "Description: 터미널·vim·언어를 RPG로 익히는 게이미피케이션 학습 앱.",
        "URL: https://github.com/Reasonofmoon/code-gamification",
      ].join("\n"),
      ok: true,
    };
  }
  if (sub === "pr" && rest[0] === "list") {
    return {
      output: ["#12  feat: add ai era missions          oracle-tower", "#11  feat: vimkeep scenarios            main", "Showing 2 of 2 open pull requests"].join("\n"),
      ok: true,
    };
  }
  if (sub === "pr" && rest[0] === "create") return ghPrCreate(state, rest.slice(1));
  if (sub === "pr" && rest[0] === "merge") return ghPrMerge(state);
  if (sub === "issue" && rest[0] === "list") return { output: "no open issues", ok: true };

  return { output: `gh: 알 수 없는 서브커맨드 '${sub}'`, ok: false };
}

export function removeGitDirAt(state: ShellState, gitDirPath: string) {
  if (!gitDirPath.endsWith("/.git")) return;
  const root = parentOf(gitDirPath);
  state.git.repos.delete(root);
  state.git.conflicts.delete(root);
}

export function findRepo(state: ShellState, start: string = state.cwd): FakeRepo | null {
  let cur = normalizeAbs(start);
  while (true) {
    const repo = state.git.repos.get(cur);
    if (repo) return repo;
    if (cur === "/") return null;
    cur = parentOf(cur);
  }
}

function gitInit(state: ShellState, args: string[]): CommandResult {
  const branchFlag = args.findIndex((a) => a === "-b");
  const branch = branchFlag >= 0 ? args[branchFlag + 1] ?? "main" : "main";
  const root = state.cwd;
  const repo: FakeRepo = {
    root,
    head: branch,
    upstream: null,
    staged: new Set(),
    commits: [],
    remotes: new Map(),
    branches: new Map([[branch, null]]),
    trackedFiles: new Map(),
    mergedBranches: new Set(),
  };
  state.git.repos.set(root, repo);
  state.dirs.add(root === "/" ? "/.git" : `${root}/.git`);
  return { output: `Initialized empty Git repository in ${root === "/" ? "" : root}/.git/\nOn branch ${branch}`, ok: true };
}

function createSeedRepo(state: ShellState, root: string): FakeRepo {
  return {
    root,
    head: "main",
    upstream: null,
    staged: new Set(),
    commits: [],
    remotes: new Map(),
    branches: new Map([["main", null]]),
    trackedFiles: new Map(
      [...state.files.keys()]
        .filter((file) => file.startsWith(root === "/" ? "/" : `${root}/`))
        .map((file) => [relativeTo(root, file), state.files.get(file) ?? ""])
    ),
    mergedBranches: new Set(),
  };
}

function gitStatus(state: ShellState): CommandResult {
  const repo = findRepo(state);
  if (!repo) return { output: "fatal: not a git repository (or any of the parent directories): .git", ok: false };
  const conflict = state.git.conflicts.get(repo.root);
  if (conflict && !conflict.resolved) {
    return {
      output: [
        `On branch ${repo.head}`,
        "You have unmerged paths.",
        "",
        "Unmerged paths:",
        `  both modified:   ${conflict.file}`,
        "",
        "fix conflicts and run \"git commit\"",
      ].join("\n"),
      ok: true,
    };
  }
  const untracked = listWorktreeFiles(state, repo).filter((f) => !repo.trackedFiles.has(f) && !repo.staged.has(f));
  const staged = [...repo.staged].sort();
  const lines = [`On branch ${repo.head}`];
  if (repo.upstream) lines.push(`Your branch is up to date with '${repo.upstream}'.`);
  lines.push("");
  if (staged.length > 0) {
    lines.push("Changes to be committed:");
    for (const file of staged) lines.push(`  new file:   ${file}`);
    lines.push("");
  }
  if (untracked.length > 0) {
    lines.push("Untracked files:");
    for (const file of untracked) lines.push(`  ${file}`);
    lines.push("");
  }
  if (staged.length === 0 && untracked.length === 0) lines.push("nothing to commit, working tree clean");
  return { output: lines.join("\n"), ok: true };
}

function gitAdd(state: ShellState, args: string[]): CommandResult {
  const repo = findRepo(state);
  if (!repo) return { output: "fatal: not a git repository", ok: false };
  if (args.length === 0) return { output: "Nothing specified, nothing added.", ok: false };
  const files = listWorktreeFiles(state, repo);
  for (const arg of args) {
    if (arg === ".") {
      for (const file of files) if (!isIgnored(state, repo, file)) repo.staged.add(file);
      continue;
    }
    const abs = resolvePath(state, arg);
    const rel = relativeTo(repo.root, abs);
    if (state.files.has(abs)) repo.staged.add(rel);
  }
  const conflict = state.git.conflicts.get(repo.root);
  if (conflict && args.some((a) => a === "." || relativeTo(repo.root, resolvePath(state, a)) === conflict.file)) {
    const content = state.files.get(join(repo.root, conflict.file)) ?? "";
    if (!content.includes("<<<<<<<") && !content.includes(">>>>>>>")) {
      conflict.resolved = true;
      repo.staged.add(conflict.file);
    }
  }
  return { output: "", ok: true };
}

function gitCommit(state: ShellState, args: string[]): CommandResult {
  const repo = findRepo(state);
  if (!repo) return { output: "fatal: not a git repository", ok: false };
  const conflict = state.git.conflicts.get(repo.root);
  if (conflict && !conflict.resolved) return { output: "error: Committing is not possible because you have unmerged files.", ok: false };
  const msgIndex = args.findIndex((a) => a === "-m");
  const message = msgIndex >= 0 ? args[msgIndex + 1] ?? "commit" : "commit";
  if (repo.staged.size === 0) return { output: "nothing added to commit but untracked files present", ok: false };
  const files = [...repo.staged].sort();
  for (const file of files) repo.trackedFiles.set(file, state.files.get(join(repo.root, file)) ?? "");
  const hash = fakeHash(repo.commits.length + 1, message);
  repo.commits.unshift({ hash, message, branch: repo.head, files });
  repo.branches.set(repo.head, hash);
  repo.staged.clear();
  if (conflict?.resolved) state.git.conflicts.delete(repo.root);
  return { output: `[${repo.head} ${hash}] ${message}\n ${files.length} file changed`, ok: true };
}

function gitLog(state: ShellState): CommandResult {
  const repo = findRepo(state);
  if (!repo) {
    return { output: "fatal: not a git repository", ok: false };
  }
  if (repo.commits.length === 0) {
    return { output: `fatal: your current branch '${repo.head}' does not have any commits yet`, ok: false };
  }
  return { output: repo.commits.map((c) => `${c.hash} ${c.message}`).join("\n"), ok: true };
}

function gitRemote(state: ShellState, args: string[]): CommandResult {
  const repo = findRepo(state);
  if (!repo) return { output: "fatal: not a git repository", ok: false };
  if (args[0] === "add" && args[1] && args[2]) {
    repo.remotes.set(args[1], args[2]);
    return { output: "", ok: true };
  }
  if (args[0] === "-v") {
    return { output: [...repo.remotes].map(([name, url]) => `${name}\t${url} (fetch)\n${name}\t${url} (push)`).join("\n"), ok: true };
  }
  return { output: "git remote: 지원되는 형식은 add, -v 입니다", ok: false };
}

function gitPush(state: ShellState, args: string[]): CommandResult {
  const repo = findRepo(state);
  if (!repo) return { output: "fatal: not a git repository", ok: false };
  const positional = args.filter((a) => !a.startsWith("-"));
  const remote = positional[0] ?? "origin";
  const branch = positional[1] ?? repo.head;
  if (!repo.remotes.has(remote)) return { output: `fatal: '${remote}' does not appear to be a git repository`, ok: false };
  if (repo.commits.length === 0) return { output: "error: src refspec main does not match any", ok: false };
  if (args.includes("-u") || args.includes("--set-upstream")) repo.upstream = `${remote}/${branch}`;
  state.git.lastPushed = { remote, branch };
  return { output: `Enumerating objects: ${repo.commits.length}, done.\nTo ${repo.remotes.get(remote)}\n * [new branch]      ${branch} -> ${branch}`, ok: true };
}

function gitClone(state: ShellState, args: string[]): CommandResult {
  if (args.length === 0) return { output: "git clone: URL이 필요합니다", ok: false };
  const dir = resolvePath(state, args[1] ?? basename(args[0]).replace(/\.git$/, ""));
  state.dirs.add(dir);
  state.cwd = dir;
  gitInit(state, ["-b", "main"]);
  const repo = state.git.repos.get(dir)!;
  repo.remotes.set("origin", args[0]);
  repo.staged.add("README.md");
  state.files.set(join(dir, "README.md"), "# cloned");
  gitCommit(state, ["-m", "initial clone"]);
  return { output: `Cloning into '${basename(dir)}'...\nremote: Enumerating objects: 3, done.`, ok: true };
}

function gitBranch(state: ShellState): CommandResult {
  const repo = findRepo(state);
  if (!repo) return { output: "fatal: not a git repository", ok: false };
  return { output: [...repo.branches.keys()].sort().map((b) => `${b === repo.head ? "*" : " "} ${b}`).join("\n"), ok: true };
}

function gitSwitch(state: ShellState, args: string[]): CommandResult {
  const repo = findRepo(state);
  if (!repo) return { output: "fatal: not a git repository", ok: false };
  if (args[0] === "-c") {
    const name = args[1];
    if (!name) return { output: "fatal: branch name required", ok: false };
    repo.branches.set(name, repo.branches.get(repo.head) ?? null);
    repo.head = name;
    return { output: `Switched to a new branch '${name}'`, ok: true };
  }
  const name = args[0] ?? "main";
  if (!repo.branches.has(name)) return { output: `fatal: invalid reference: ${name}`, ok: false };
  repo.head = name;
  return { output: `Switched to branch '${name}'`, ok: true };
}

function gitMerge(state: ShellState, args: string[]): CommandResult {
  const repo = findRepo(state);
  if (!repo) return { output: "fatal: not a git repository", ok: false };
  const branch = args[0];
  if (!branch || !repo.branches.has(branch)) return { output: `merge: ${branch ?? ""} - not something we can merge`, ok: false };
  const conflictFile = "bio.md";
  if (state.files.has(join(repo.root, conflictFile)) && branch.includes("conflict")) {
    state.files.set(join(repo.root, conflictFile), ["<<<<<<< HEAD", "main version", "=======", "branch version", `>>>>>>> ${branch}`].join("\n"));
    state.git.conflicts.set(repo.root, { repoRoot: repo.root, file: conflictFile, resolved: false });
    return { output: `Auto-merging ${conflictFile}\nCONFLICT (content): Merge conflict in ${conflictFile}\nAutomatic merge failed; fix conflicts and then commit the result.`, ok: false };
  }
  repo.mergedBranches.add(branch);
  return { output: `Updating ${repo.branches.get(repo.head) ?? "0000000"}..${repo.branches.get(branch) ?? "0000001"}\nFast-forward`, ok: true };
}

function ghRepoCreate(state: ShellState, args: string[]): CommandResult {
  if (!state.gh.scopes.has("repo")) {
    return { output: "GraphQL: Resource not accessible by personal access token (repo scope required)", ok: false };
  }
  const repo = findRepo(state);
  const name = args.find((a) => !a.startsWith("-")) ?? "git-quest";
  const sourceFlag = args.find((a) => a.startsWith("--source="));
  const sourcePath = sourceFlag ? resolvePath(state, sourceFlag.slice("--source=".length)) : state.cwd;
  state.gh.repos.set(name, { owner: state.gh.account, name, sourcePath });
  if (repo && (args.includes("--remote=origin") || args.includes("--remote") || args.includes("--push") || args.includes("--source=."))) {
    repo.remotes.set("origin", `https://github.com/${state.gh.account}/${name}.git`);
  }
  return { output: `✓ Created repository ${state.gh.account}/${name} on GitHub\n✓ Added remote origin`, ok: true };
}

function ghPrCreate(state: ShellState, args: string[]): CommandResult {
  const repo = findRepo(state);
  const title = valueAfter(args, "--title") ?? "forge changes";
  const body = valueAfter(args, "--body") ?? "";
  const number = state.gh.prs.length + 1;
  state.gh.prs.push({ number, title, body, branch: repo?.head ?? "feature-bio", merged: false });
  return { output: `https://github.com/${state.gh.account}/git-quest/pull/${number}`, ok: true };
}

function ghPrMerge(state: ShellState): CommandResult {
  const pr = [...state.gh.prs].reverse().find((p) => !p.merged);
  if (!pr) return { output: "no pull requests found", ok: false };
  pr.merged = true;
  const repo = findRepo(state);
  if (repo) {
    repo.head = "main";
    repo.branches.delete(pr.branch);
  }
  return { output: `✓ Merged pull request #${pr.number}\n✓ Deleted branch ${pr.branch}`, ok: true };
}

function listWorktreeFiles(state: ShellState, repo: FakeRepo): string[] {
  const prefix = repo.root === "/" ? "/" : `${repo.root}/`;
  return [...state.files.keys()]
    .filter((file) => file.startsWith(prefix))
    .map((file) => relativeTo(repo.root, file))
    .filter((file) => !file.startsWith(".git/"))
    .sort();
}

function isIgnored(state: ShellState, repo: FakeRepo, rel: string): boolean {
  const ignore = state.files.get(join(repo.root, ".gitignore"));
  if (!ignore) return false;
  return ignore
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .some((rule) => rel === rule.replace(/\/$/, "") || rel.startsWith(rule));
}

function valueAfter(args: string[], flag: string): string | undefined {
  const inline = args.find((a) => a.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const idx = args.indexOf(flag);
  return idx >= 0 ? args[idx + 1] : undefined;
}

function fakeHash(n: number, msg: string): string {
  let acc = n * 4099;
  for (const ch of msg) acc = (acc * 33 + ch.charCodeAt(0)) % 0xffffff;
  return acc.toString(16).padStart(7, "0").slice(0, 7);
}

function resolvePath(state: ShellState, raw: string): string {
  if (raw === ".") return state.cwd;
  if (raw === "~") return "/";
  if (raw.startsWith("~/")) raw = raw.slice(2);
  const joined = raw.startsWith("/") ? raw : state.cwd === "/" ? `/${raw}` : `${state.cwd}/${raw}`;
  return normalizeAbs(joined);
}

function normalizeAbs(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  const parts = path.split("/").filter(Boolean);
  const stack: string[] = [];
  for (const p of parts) {
    if (p === ".") continue;
    if (p === "..") stack.pop();
    else stack.push(p);
  }
  return `/${stack.join("/")}`;
}

function parentOf(path: string): string {
  if (path === "/") return "/";
  const idx = path.lastIndexOf("/");
  return idx <= 0 ? "/" : path.slice(0, idx);
}

function basename(path: string): string {
  if (path === "/") return "/";
  return path.slice(path.lastIndexOf("/") + 1);
}

function relativeTo(root: string, abs: string): string {
  if (root === "/") return abs.replace(/^\//, "");
  return abs.startsWith(`${root}/`) ? abs.slice(root.length + 1) : basename(abs);
}

function join(root: string, rel: string): string {
  return root === "/" ? `/${rel}` : `${root}/${rel}`;
}
