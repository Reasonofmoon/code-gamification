"use client";

import Image from "next/image";
import { AlertTriangle, Lightbulb, ShieldCheck } from "lucide-react";
import type { Mission, MissionStep } from "@/types/mission";
import { npcImageFor } from "@/lib/npc-images";

type CoachNote = {
  speaker: string;
  command: string;
  useful: string;
  caution: string;
};

type Props = {
  mission: Mission;
  step: MissionStep;
};

const FALLBACK_BY_REALM: Record<string, string> = {
  "forge-of-origin": "대장장이 에버",
  "oracle-tower": "기계 신탁 사서 메모리아",
  storybook: "사서장 세렌",
  runescar: "글자드래곤 알파베타스",
  vimkeep: "검사부 카엘",
  shellholm: "늙은 항해사 모르간",
  wasteland: "견습생 카이",
};

const COMMAND_NOTES: {
  match: RegExp;
  speaker?: string;
  command: string;
  useful: string;
  caution: string;
}[] = [
  {
    match: /^pwd$/,
    command: "pwd",
    useful: "지금 터미널이 어느 폴더를 기준으로 움직이는지 확인할 때 쓴다. 파일 생성, 삭제, Git 명령 전의 위치 확인 습관이다.",
    caution: "명령은 맞아도 위치가 틀리면 전혀 다른 폴더에 작업할 수 있다.",
  },
  {
    match: /^mkdir\b/,
    command: "mkdir",
    useful: "새 프로젝트 폴더나 작업 공간을 만들 때 쓴다. 실습에서는 안전한 작업터를 분리하는 첫 단계다.",
    caution: "이미 같은 이름의 폴더가 있으면 실패할 수 있으니 폴더 이름을 확인하라.",
  },
  {
    match: /^cd\b/,
    command: "cd",
    useful: "작업할 폴더로 이동할 때 쓴다. Git은 현재 폴더를 기준으로 저장소를 찾는다.",
    caution: "`cd ~`처럼 큰 범위로 이동한 뒤 `git init`을 하면 엉뚱한 곳이 저장소가 될 수 있다.",
  },
  {
    match: /^git\s+(-v|--version|version)$/,
    command: "git -v",
    useful: "Git이 설치되어 있고 터미널에서 실행 가능한지 확인한다.",
    caution: "버전 확인은 설치 확인일 뿐, 저장소가 준비됐다는 뜻은 아니다.",
  },
  {
    match: /^gh\s+auth\s+status$/,
    speaker: "전령 까치 코리",
    command: "gh auth status",
    useful: "GitHub CLI가 어떤 계정과 권한으로 로그인되어 있는지 확인한다.",
    caution: "`repo` 같은 scope가 없으면 저장소 생성, push, PR 작업에서 막힐 수 있다.",
  },
  {
    match: /^git\s+init\b/,
    command: "git init -b main",
    useful: "현재 폴더를 Git 저장소로 만들고 변경 이력을 기록할 준비를 한다.",
    caution: "반드시 프로젝트 폴더 안에서 실행하라. 홈 폴더에서 실행하면 개인 파일 전체가 Git 상태에 잡힐 수 있다.",
  },
  {
    match: /^echo\b/,
    command: "echo ... > file",
    useful: "짧은 파일을 만들거나 내용을 덮어써서 실습 상태를 빠르게 준비할 때 쓴다.",
    caution: "`>`는 기존 내용을 덮어쓴다. 실제 프로젝트에서는 중요한 파일에 쓰기 전에 내용을 확인하라.",
  },
  {
    match: /^git\s+status$/,
    command: "git status",
    useful: "수정됨, 새 파일, staged 상태를 확인하는 Git의 안전 점검 명령이다.",
    caution: "빨간 파일은 아직 커밋 후보가 아니고, 초록 파일만 다음 커밋에 들어간다.",
  },
  {
    match: /^git\s+add\b/,
    command: "git add",
    useful: "이번 커밋에 넣을 파일을 stage에 올린다. 작업한 것 중 일부만 골라 커밋할 수 있다.",
    caution: "`git add .`는 많은 파일을 한꺼번에 올린다. 비밀키, 빌드 산출물, 큰 파일이 섞였는지 먼저 보라.",
  },
  {
    match: /^git\s+commit\b/,
    command: "git commit -m",
    useful: "stage에 올라간 변경을 되돌아갈 수 있는 기록으로 남긴다.",
    caution: "커밋 전에 `git status`로 들어갈 파일을 확인하고, 메시지는 나중에 읽어도 의도를 알 수 있게 적어라.",
  },
  {
    match: /^git\s+log$/,
    command: "git log",
    useful: "저장소의 시간 기록을 읽고 어떤 커밋으로 돌아갈 수 있는지 확인한다.",
    caution: "아직 커밋이 없으면 로그도 없다. 먼저 add와 commit이 필요하다.",
  },
  {
    match: /^gh\s+auth\s+refresh\b/,
    speaker: "전령 까치 코리",
    command: "gh auth refresh",
    useful: "GitHub CLI 토큰에 필요한 권한을 추가로 부여할 때 쓴다.",
    caution: "권한은 필요한 범위만 추가하라. 실제 계정에서는 토큰 권한이 곧 접근 권한이다.",
  },
  {
    match: /^gh\s+repo\s+create\b/,
    speaker: "전령 까치 코리",
    command: "gh repo create",
    useful: "로컬 프로젝트를 올릴 GitHub 저장소를 만들고 origin 연결까지 준비할 수 있다.",
    caution: "public/private 설정과 저장소 이름을 확인하라. 공개 저장소에는 민감한 파일을 올리면 안 된다.",
  },
  {
    match: /^git\s+remote\s+-v$/,
    speaker: "전령 까치 코리",
    command: "git remote -v",
    useful: "내 로컬 저장소가 어느 GitHub 주소와 연결되어 있는지 확인한다.",
    caution: "origin 주소가 틀리면 다른 저장소로 push할 수 있다.",
  },
  {
    match: /^git\s+push\b/,
    speaker: "전령 까치 코리",
    command: "git push -u origin main",
    useful: "로컬 커밋을 GitHub의 origin/main으로 올려 백업하고 협업자가 볼 수 있게 만든다. `-u`는 다음 push부터 기본 목적지를 기억하게 한다.",
    caution: "push 전에는 `git status`와 `git log`로 무엇을 올리는지 확인하라. 민감 정보가 커밋되면 push 후 삭제가 까다롭다.",
  },
  {
    match: /^git\s+switch\s+-c\b/,
    command: "git switch -c",
    useful: "새 기능이나 실험을 main과 분리된 브랜치에서 시작할 때 쓴다.",
    caution: "브랜치 이름은 작업 목적이 보이게 짓고, 아직 커밋하지 않은 변경이 섞이지 않았는지 확인하라.",
  },
  {
    match: /^git\s+switch\b/,
    command: "git switch",
    useful: "다른 브랜치로 이동해 작업 맥락을 바꾼다.",
    caution: "커밋하지 않은 변경이 있으면 브랜치 이동 중 충돌하거나 변경이 따라갈 수 있다.",
  },
  {
    match: /^git\s+merge\b/,
    command: "git merge",
    useful: "다른 브랜치의 작업을 현재 브랜치에 합칠 때 쓴다.",
    caution: "충돌이 나면 파일 내용을 사람이 판단해야 한다. 자동으로 고치려고 서두르지 말고 `status`부터 보라.",
  },
  {
    match: /^rm\s+-rf\s+\.git$/,
    speaker: "사고의 망령 그렘",
    command: "rm -rf .git",
    useful: "잘못된 위치에 만든 Git 저장소 표시만 제거할 때 쓰는 위험한 복구 명령이다.",
    caution: "실제 터미널에서 `rm -rf`는 매우 위험하다. 경로가 `.git`인지, 현재 위치가 맞는지 반드시 확인하라.",
  },
  {
    match: /^gh\s+pr\s+create\b/,
    speaker: "전령 까치 코리",
    command: "gh pr create",
    useful: "브랜치 작업을 리뷰 가능한 Pull Request로 열 때 쓴다.",
    caution: "제목과 본문에는 무엇을 바꿨는지, 어떻게 확인했는지 적어야 리뷰가 빨라진다.",
  },
  {
    match: /^gh\s+pr\s+merge\b/,
    speaker: "전령 까치 코리",
    command: "gh pr merge",
    useful: "리뷰된 Pull Request를 main에 반영할 때 쓴다.",
    caution: "머지 전 테스트, 리뷰 승인, 충돌 여부를 확인하라. main은 팀의 기준선이다.",
  },
];

function codeFromHint(hint?: string): string | null {
  if (!hint) return null;
  return hint.match(/`([^`]+)`/)?.[1] ?? null;
}

function commandsForStep(step: MissionStep): string[] {
  if (step.kind === "terminal-chain") {
    return step.objectives
      .map((objective) => codeFromHint(objective.hint))
      .filter((command): command is string => Boolean(command));
  }
  if (step.kind === "terminal") {
    return [codeFromHint(step.hint)].filter((command): command is string => Boolean(command));
  }
  return [];
}

function noteForCommand(command: string, fallbackSpeaker: string): CoachNote {
  const note = COMMAND_NOTES.find((entry) => entry.match.test(command));
  if (note) {
    return {
      speaker: note.speaker ?? fallbackSpeaker,
      command: note.command,
      useful: note.useful,
      caution: note.caution,
    };
  }
  return {
    speaker: fallbackSpeaker,
    command,
    useful: "이 주문은 현재 미션의 목표 상태를 만들기 위한 핵심 동작이다. 입력하기 전에는 지금 위치와 대상 파일을 먼저 확인하라.",
    caution: "힌트를 그대로 따라가되, 실제 터미널에서는 명령이 어느 폴더와 파일에 적용되는지 확인해야 한다.",
  };
}

function notesForStep(mission: Mission, step: MissionStep): CoachNote[] {
  const fallbackSpeaker = FALLBACK_BY_REALM[mission.realmId] ?? "기계 신탁 사서 메모리아";
  if (step.kind === "terminal" || step.kind === "terminal-chain") {
    const seen = new Set<string>();
    return commandsForStep(step)
      .map((command) => noteForCommand(command, fallbackSpeaker))
      .filter((note) => {
        const key = `${note.speaker}:${note.command}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 4);
  }

  if (step.kind === "language") {
    return [
      {
        speaker: mission.realmId === "storybook" ? "사서장 세렌" : "글자드래곤 알파베타스",
        command: step.languageId === "javascript" ? "JavaScript 연습" : "Python 연습",
        useful: "문법을 외우는 단계가 아니라 데이터를 읽고, 바꾸고, 검증하는 작은 문제 해결 단위를 익히는 단계다.",
        caution: "정답 출력만 맞추기보다 변수 이름, 조건, 반복의 흐름을 말로 설명할 수 있어야 다음 미션이 쉬워진다.",
      },
    ];
  }

  if (step.kind === "vim") {
    return [
      {
        speaker: "검사부 카엘",
        command: "Vim 조작",
        useful: "서버, Git 커밋 메시지, 설정 파일처럼 마우스가 불편한 환경에서 빠르게 텍스트를 고칠 때 쓰인다.",
        caution: "명령 모드와 입력 모드를 구분하라. 막히면 `Esc`로 명령 모드로 돌아오는 습관이 중요하다.",
      },
    ];
  }

  if (step.kind === "react-lab") {
    return [
      {
        speaker: "글자드래곤 알파베타스",
        command: "React 실습",
        useful: "컴포넌트, props, state를 이용해 화면이 데이터와 이벤트에 반응하는 방식을 익힌다.",
        caution: "화면만 맞추지 말고 상태가 어디서 시작해 어떤 이벤트로 바뀌는지 추적하라.",
      },
    ];
  }

  return [];
}

function CoachAvatar({ speaker }: { speaker: string }) {
  const src = npcImageFor(speaker);
  return (
    <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-accent/30 bg-surface-strong ring-1 ring-accent/20">
      {src ? (
        <Image src={src} alt={speaker} fill sizes="56px" className="object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center text-xl">?</div>
      )}
    </div>
  );
}

export function NpcCoachPanel({ mission, step }: Props) {
  const notes = notesForStep(mission, step);
  if (notes.length === 0) return null;
  const lead = notes[0];

  return (
    <section className="parchment p-5">
      <div className="flex items-start gap-4">
        <CoachAvatar speaker={lead.speaker} />
        <div className="min-w-0 flex-1">
          <div className="text-xs uppercase tracking-widest text-muted">NPC 조언</div>
          <div className="mt-1 fantasy-title text-sm text-accent">{lead.speaker}</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {notes.map((note) => (
              <article
                key={`${note.speaker}-${note.command}`}
                className="rounded-lg border border-border/70 bg-surface/40 p-3"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Lightbulb className="size-4 text-accent" />
                  <code className="font-mono text-accent">{note.command}</code>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{note.useful}</p>
                <div className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-amber-100/90">
                  {note.caution.includes("위험") || note.caution.includes("민감") ? (
                    <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-300" />
                  ) : (
                    <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-300" />
                  )}
                  <span>{note.caution}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
