export type FsSnapshot = Record<string, string | null>;

export type ShellState = {
  files: Map<string, string>;
  dirs: Set<string>;
  cwd: string;
  history: { command: string; output: string; ok: boolean }[];
};

export function createShell(
  initialFs: FsSnapshot,
  initialCwd: string = "/"
): ShellState {
  const files = new Map<string, string>();
  const dirs = new Set<string>(["/"]);
  for (const [rawPath, value] of Object.entries(initialFs)) {
    const path = normalizeAbs(rawPath);
    if (value === null) {
      ensureDirChain(dirs, path);
    } else {
      ensureDirChain(dirs, parentOf(path));
      files.set(path, value);
    }
  }
  return {
    files,
    dirs,
    cwd: normalizeAbs(initialCwd),
    history: [],
  };
}

function ensureDirChain(dirs: Set<string>, path: string) {
  if (!path || path === "/") {
    dirs.add("/");
    return;
  }
  const parts = path.split("/").filter(Boolean);
  let cur = "";
  dirs.add("/");
  for (const p of parts) {
    cur += "/" + p;
    dirs.add(cur);
  }
}

function parentOf(path: string): string {
  if (path === "/") return "/";
  const idx = path.lastIndexOf("/");
  if (idx <= 0) return "/";
  return path.slice(0, idx);
}

function basename(path: string): string {
  if (path === "/") return "/";
  const idx = path.lastIndexOf("/");
  return path.slice(idx + 1);
}

function normalizeAbs(path: string): string {
  if (!path.startsWith("/")) path = "/" + path;
  const parts = path.split("/").filter(Boolean);
  const stack: string[] = [];
  for (const p of parts) {
    if (p === ".") continue;
    if (p === "..") {
      stack.pop();
      continue;
    }
    stack.push(p);
  }
  return "/" + stack.join("/");
}

function resolvePath(state: ShellState, raw: string): string {
  const isAbsolute = raw.startsWith("/");
  if (raw === "~") return "/";
  if (raw.startsWith("~/")) raw = raw.slice(2);
  const joined = isAbsolute ? raw : state.cwd === "/" ? "/" + raw : state.cwd + "/" + raw;
  return normalizeAbs(joined);
}

function tokenize(line: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < line.length) {
    const c = line[i];
    if (c === " " || c === "\t") {
      i++;
      continue;
    }
    if (c === '"' || c === "'") {
      const quote = c;
      i++;
      let buf = "";
      while (i < line.length && line[i] !== quote) {
        buf += line[i++];
      }
      i++;
      tokens.push(buf);
      continue;
    }
    let buf = "";
    while (i < line.length && line[i] !== " " && line[i] !== "\t") {
      buf += line[i++];
    }
    tokens.push(buf);
  }
  return tokens;
}

type CommandResult = { output: string; ok: boolean };

const COMMANDS: Record<
  string,
  (state: ShellState, args: string[]) => CommandResult
> = {
  pwd: (state) => ({ output: state.cwd, ok: true }),
  ls: (state, args) => {
    const flagAll = args.includes("-a") || args.includes("-la") || args.includes("-al");
    const targets = args.filter((a) => !a.startsWith("-"));
    const path = targets.length > 0 ? resolvePath(state, targets[0]) : state.cwd;
    if (!state.dirs.has(path) && !state.files.has(path)) {
      return { output: `ls: ${path}: 그런 경로가 없습니다`, ok: false };
    }
    if (state.files.has(path)) {
      return { output: basename(path), ok: true };
    }
    const items = new Set<string>();
    const prefix = path === "/" ? "/" : path + "/";
    for (const d of state.dirs) {
      if (d === path) continue;
      if (d.startsWith(prefix)) {
        const rest = d.slice(prefix.length);
        if (!rest.includes("/")) items.add(rest + "/");
      }
    }
    for (const f of state.files.keys()) {
      if (f.startsWith(prefix)) {
        const rest = f.slice(prefix.length);
        if (!rest.includes("/")) items.add(rest);
      }
    }
    const sorted = [...items].sort();
    if (flagAll) sorted.unshift("./", "../");
    return { output: sorted.join("\n"), ok: true };
  },
  cd: (state, args) => {
    if (args.length === 0) {
      state.cwd = "/";
      return { output: "", ok: true };
    }
    const target = resolvePath(state, args[0]);
    if (!state.dirs.has(target)) {
      return { output: `cd: ${target}: 디렉토리가 없습니다`, ok: false };
    }
    state.cwd = target;
    return { output: "", ok: true };
  },
  mkdir: (state, args) => {
    if (args.length === 0) return { output: "mkdir: 경로가 필요합니다", ok: false };
    const flagP = args.includes("-p");
    const targets = args.filter((a) => !a.startsWith("-"));
    for (const t of targets) {
      const path = resolvePath(state, t);
      if (state.files.has(path))
        return { output: `mkdir: ${path}: 파일이 이미 존재합니다`, ok: false };
      if (state.dirs.has(path) && !flagP)
        return { output: `mkdir: ${path}: 디렉토리가 이미 존재합니다`, ok: false };
      if (!flagP) {
        const parent = parentOf(path);
        if (!state.dirs.has(parent))
          return { output: `mkdir: ${parent}: 상위 경로가 없습니다`, ok: false };
      }
      ensureDirChain(state.dirs, path);
    }
    return { output: "", ok: true };
  },
  touch: (state, args) => {
    if (args.length === 0) return { output: "touch: 경로가 필요합니다", ok: false };
    for (const t of args) {
      const path = resolvePath(state, t);
      if (state.dirs.has(path))
        return { output: `touch: ${path}: 디렉토리입니다`, ok: false };
      const parent = parentOf(path);
      if (!state.dirs.has(parent))
        return { output: `touch: ${parent}: 상위 경로가 없습니다`, ok: false };
      if (!state.files.has(path)) state.files.set(path, "");
    }
    return { output: "", ok: true };
  },
  echo: (_state, args) => ({ output: args.join(" "), ok: true }),
  cat: (state, args) => {
    if (args.length === 0) return { output: "cat: 파일이 필요합니다", ok: false };
    const lines: string[] = [];
    for (const t of args) {
      const path = resolvePath(state, t);
      if (state.dirs.has(path))
        return { output: `cat: ${path}: 디렉토리입니다`, ok: false };
      const content = state.files.get(path);
      if (content === undefined)
        return { output: `cat: ${path}: 파일이 없습니다`, ok: false };
      lines.push(content);
    }
    return { output: lines.join("\n"), ok: true };
  },
  mv: (state, args) => {
    if (args.length < 2) return { output: "mv: 사용법: mv <src> <dst>", ok: false };
    const src = resolvePath(state, args[0]);
    const dst = resolvePath(state, args[1]);
    if (state.files.has(src)) {
      const content = state.files.get(src)!;
      state.files.delete(src);
      state.files.set(dst, content);
      return { output: "", ok: true };
    }
    if (state.dirs.has(src)) {
      const prefix = src + "/";
      const movedDirs: string[] = [];
      const movedFiles: [string, string][] = [];
      for (const d of state.dirs) {
        if (d === src || d.startsWith(prefix)) movedDirs.push(d);
      }
      for (const [f, c] of state.files) {
        if (f.startsWith(prefix)) movedFiles.push([f, c]);
      }
      for (const d of movedDirs) {
        state.dirs.delete(d);
        state.dirs.add(dst + d.slice(src.length));
      }
      for (const [f, c] of movedFiles) {
        state.files.delete(f);
        state.files.set(dst + f.slice(src.length), c);
      }
      return { output: "", ok: true };
    }
    return { output: `mv: ${src}: 경로가 없습니다`, ok: false };
  },
  cp: (state, args) => {
    const flagR = args.includes("-r") || args.includes("-R");
    const positional = args.filter((a) => !a.startsWith("-"));
    if (positional.length < 2) return { output: "cp: 사용법: cp <src> <dst>", ok: false };
    const src = resolvePath(state, positional[0]);
    const dst = resolvePath(state, positional[1]);
    if (state.files.has(src)) {
      state.files.set(dst, state.files.get(src)!);
      return { output: "", ok: true };
    }
    if (state.dirs.has(src)) {
      if (!flagR) return { output: `cp: ${src}: 디렉토리. -r 필요`, ok: false };
      const prefix = src + "/";
      for (const d of [...state.dirs]) {
        if (d === src || d.startsWith(prefix)) {
          state.dirs.add(dst + d.slice(src.length));
        }
      }
      for (const [f, c] of [...state.files]) {
        if (f.startsWith(prefix)) state.files.set(dst + f.slice(src.length), c);
      }
      return { output: "", ok: true };
    }
    return { output: `cp: ${src}: 경로가 없습니다`, ok: false };
  },
  rm: (state, args) => {
    const flagR = args.includes("-r") || args.includes("-rf") || args.includes("-fr") || args.includes("-R");
    const flagF = args.includes("-f") || args.includes("-rf") || args.includes("-fr");
    const targets = args.filter((a) => !a.startsWith("-"));
    if (targets.length === 0) return { output: "rm: 경로가 필요합니다", ok: false };
    for (const t of targets) {
      const path = resolvePath(state, t);
      if (state.files.has(path)) {
        state.files.delete(path);
        continue;
      }
      if (state.dirs.has(path)) {
        if (!flagR) return { output: `rm: ${path}: 디렉토리. -r 필요`, ok: false };
        const prefix = path + "/";
        for (const d of [...state.dirs]) {
          if (d === path || d.startsWith(prefix)) state.dirs.delete(d);
        }
        for (const f of [...state.files.keys()]) {
          if (f.startsWith(prefix)) state.files.delete(f);
        }
        continue;
      }
      if (!flagF) return { output: `rm: ${path}: 경로가 없습니다`, ok: false };
    }
    return { output: "", ok: true };
  },
  clear: () => ({ output: "__CLEAR__", ok: true }),

  // ─── AI 시대 도구 (Oracle Tower 미션용 가짜 평가기) ───
  gh: (_state, args) => {
    if (args.length === 0) {
      return { output: "gh: GitHub CLI. 사용법: gh <command> [args]", ok: false };
    }
    const [sub, ...rest] = args;
    if (sub === "auth" && rest[0] === "status") {
      return {
        output: [
          "github.com",
          "  ✓ Logged in to github.com account Reasonofmoon",
          "  - Active account: true",
          "  - Token scopes: repo, workflow",
        ].join("\n"),
        ok: true,
      };
    }
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
        output: [
          "#12  feat: add ai era missions          oracle-tower",
          "#11  feat: vimkeep scenarios            main",
          "Showing 2 of 2 open pull requests",
        ].join("\n"),
        ok: true,
      };
    }
    if (sub === "pr" && rest[0] === "create") {
      return {
        output: "https://github.com/Reasonofmoon/code-gamification/pull/13",
        ok: true,
      };
    }
    if (sub === "issue" && rest[0] === "list") {
      return {
        output: "no open issues",
        ok: true,
      };
    }
    return { output: `gh: 알 수 없는 서브커맨드 '${sub}'`, ok: false };
  },

  npx: (_state, args) => {
    if (args.length === 0) {
      return { output: "npx: 사용법: npx <package> [args]", ok: false };
    }
    const pkg = args[0];
    if (pkg === "create-next-app") {
      return {
        output: [
          "Creating a new Next.js app...",
          "✓ Initialized in current directory.",
          "✓ Installed 359 packages.",
        ].join("\n"),
        ok: true,
      };
    }
    if (pkg === "shadcn@latest" || pkg === "shadcn") {
      return {
        output: "✓ shadcn/ui initialized. components.json created.",
        ok: true,
      };
    }
    if (pkg.startsWith("@anthropic-ai")) {
      return {
        output: "✓ Anthropic SDK installed via npx.",
        ok: true,
      };
    }
    return {
      output: `Running one-time package: ${pkg}\n✓ done.`,
      ok: true,
    };
  },

  git: (_state, args) => {
    if (args.length === 0) {
      return { output: "git: 사용법: git <command> [args]", ok: false };
    }
    const [sub, ...rest] = args;
    if (sub === "status") {
      return {
        output: [
          "On branch main",
          "Your branch is up to date with 'origin/main'.",
          "",
          "nothing to commit, working tree clean",
        ].join("\n"),
        ok: true,
      };
    }
    if (sub === "log") {
      return {
        output: [
          "270bef1 feat(assets): codex generates 9 remaining portraits",
          "e1ff7ab feat(assets): introduce image asset pipeline",
          "36d6719 feat(ui): apply Aethoria visual treatment",
        ].join("\n"),
        ok: true,
      };
    }
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
      return {
        output: `Successfully rebased onto ${rest[0] ?? "main"}.`,
        ok: true,
      };
    }
    if (sub === "cherry-pick") {
      return {
        output: `[main abc1234] cherry-picked: ${rest[0] ?? "commit"}`,
        ok: true,
      };
    }
    if (sub === "bisect" && rest[0] === "start") {
      return { output: "Bisecting started. git bisect good|bad 으로 좁혀가시오.", ok: true };
    }
    if (sub === "switch" || sub === "checkout") {
      return { output: `Switched to branch '${rest[0] ?? "main"}'`, ok: true };
    }
    return { output: `git: 알 수 없는 서브커맨드 '${sub}'`, ok: false };
  },

  curl: (_state, args) => {
    if (args.length === 0) {
      return { output: "curl: URL이 필요합니다", ok: false };
    }
    const url = args.find((a) => a.startsWith("http"));
    if (!url) {
      return { output: "curl: 유효한 URL이 필요합니다", ok: false };
    }
    // 학습용 가짜 JSON 응답
    return {
      output: '{"id":1,"name":"Oracle","message":"Hello from the machine."}',
      ok: true,
    };
  },

  jq: (_state, args) => {
    if (args.length === 0) {
      return { output: "jq: 필터가 필요합니다", ok: false };
    }
    const filter = args.join(" ");
    if (filter.includes(".name")) {
      return { output: '"Oracle"', ok: true };
    }
    if (filter.includes(".id")) {
      return { output: "1", ok: true };
    }
    if (filter === "." || filter === "'.'") {
      return {
        output: '{\n  "id": 1,\n  "name": "Oracle",\n  "message": "Hello from the machine."\n}',
        ok: true,
      };
    }
    return { output: "(jq: 학습용 단순 필터만 지원. 예: .name, .id, .)", ok: false };
  },

  help: () => ({
    output: [
      "사용 가능한 주문:",
      "  pwd  ls  cd  mkdir  touch  echo  cat",
      "  mv  cp  rm  clear  help",
      "  gh  npx  git  curl  jq    (AI 시대 도구)",
    ].join("\n"),
    ok: true,
  }),
};

export function runCommand(state: ShellState, line: string): CommandResult {
  const trimmed = line.trim();
  if (trimmed === "") return { output: "", ok: true };
  const tokens = tokenize(trimmed);
  const [cmd, ...args] = tokens;
  const handler = COMMANDS[cmd];
  let result: CommandResult;
  if (!handler) {
    result = { output: `${cmd}: 알 수 없는 주문입니다. 'help' 입력`, ok: false };
  } else {
    try {
      result = handler(state, args);
    } catch (err) {
      result = {
        output: `${cmd}: 주문 시전 실패 — ${(err as Error).message}`,
        ok: false,
      };
    }
  }
  state.history.push({ command: trimmed, output: result.output, ok: result.ok });
  return result;
}

export function commandsUsed(state: ShellState): string[] {
  return state.history
    .filter((h) => h.ok)
    .map((h) => h.command.split(/\s+/)[0]);
}
