import type { Mission } from "@/types/mission";

export const TERMINAL_MISSIONS: readonly Mission[] = [
  {
    id: "shellholm-01",
    realmId: "shellholm",
    order: 1,
    title: "내 위치 알기",
    fantasyTitle: "주문서 1장 — 「현재의 좌표를 노래하라」",
    briefing:
      "안개 속에서 길을 잃었다. 어디에 있는지 알아야 다음 발걸음을 뗄 수 있다. 현재 위치를 외치는 주문 `pwd` 를 시전하라.",
    hint: "터미널에 `pwd` 라고 입력하고 Enter.",
    isBoss: false,
    xpReward: 30,
    evaluator: {
      kind: "terminal",
      initialFs: { "/quest": null, "/quest/notes.txt": "어둠 속 첫 발자국" },
      initialCwd: "/quest",
      successWhen: { type: "commandUsed", command: "pwd" },
    },
  },
  {
    id: "shellholm-02",
    realmId: "shellholm",
    order: 2,
    title: "감지 마법",
    fantasyTitle: "주문서 2장 — 「숨겨진 것까지 비추라」",
    briefing:
      "이 방에는 보이지 않는 물건도 숨겨져 있다. `ls -a` 로 모든 것을 비추어라. 출력에 `.secret` 이 나타나면 성공.",
    hint: "`ls -a` 로 숨김 파일까지 표시.",
    isBoss: false,
    xpReward: 30,
    evaluator: {
      kind: "terminal",
      initialFs: {
        "/quest": null,
        "/quest/sword.txt": "녹슨 검",
        "/quest/.secret": "용의 비늘 조각",
      },
      initialCwd: "/quest",
      successWhen: { type: "lastOutputMatches", pattern: "\\.secret" },
    },
  },
  {
    id: "shellholm-03",
    realmId: "shellholm",
    order: 3,
    title: "텔레포트",
    fantasyTitle: "주문서 3장 — 「뒤뜰의 묘소로」",
    briefing:
      "지도에는 `/quest/yard` 가 있다. `cd` 주문으로 그곳에 닿아라.",
    hint: "`cd /quest/yard` 또는 현재 위치 기준 `cd yard`.",
    isBoss: false,
    xpReward: 40,
    evaluator: {
      kind: "terminal",
      initialFs: {
        "/quest": null,
        "/quest/yard": null,
        "/quest/yard/tombstone.txt": "RIP nano",
      },
      initialCwd: "/quest",
      successWhen: { type: "cwdEquals", path: "/quest/yard" },
    },
  },
  {
    id: "shellholm-04",
    realmId: "shellholm",
    order: 4,
    title: "결계 펼치기",
    fantasyTitle: "주문서 4장 — 「새 방을 짓다」",
    briefing:
      "마법서 보관용 방이 필요하다. `/quest/library` 디렉토리를 만들어라.",
    hint: "`mkdir /quest/library`.",
    isBoss: false,
    xpReward: 40,
    evaluator: {
      kind: "terminal",
      initialFs: { "/quest": null },
      initialCwd: "/quest",
      successWhen: { type: "fsHasDir", path: "/quest/library" },
    },
  },
  {
    id: "shellholm-05",
    realmId: "shellholm",
    order: 5,
    title: "보물 옮기기",
    fantasyTitle: "주문서 5장 — 「올바른 방에 두라」",
    briefing:
      "`/quest/treasure.txt` 를 `/quest/library/treasure.txt` 로 옮겨라. `mv` 주문을 사용한다.",
    hint: "`mv treasure.txt library/treasure.txt`.",
    isBoss: false,
    xpReward: 50,
    evaluator: {
      kind: "terminal",
      initialFs: {
        "/quest": null,
        "/quest/library": null,
        "/quest/treasure.txt": "황금 두루마리",
      },
      initialCwd: "/quest",
      successWhen: {
        type: "all",
        checks: [
          { type: "fsHasFile", path: "/quest/library/treasure.txt" },
          { type: "fsMissingPath", path: "/quest/treasure.txt" },
        ],
      },
    },
  },
  {
    id: "shellholm-06",
    realmId: "shellholm",
    order: 6,
    title: "소멸 주문 (주의)",
    fantasyTitle: "주문서 6장 — 「되돌릴 수 없는 한 음절」",
    briefing:
      "오염된 두루마리 `cursed.txt` 를 없애라. 단 한 번의 `rm`. 신중하게.",
    hint: "`rm cursed.txt`.",
    isBoss: false,
    xpReward: 50,
    evaluator: {
      kind: "terminal",
      initialFs: {
        "/quest": null,
        "/quest/cursed.txt": "어둠의 룬",
        "/quest/important.txt": "용의 봉인 문서 — 절대 삭제 금지",
      },
      initialCwd: "/quest",
      successWhen: {
        type: "all",
        checks: [
          { type: "fsMissingPath", path: "/quest/cursed.txt" },
          { type: "fsHasFile", path: "/quest/important.txt" },
        ],
      },
    },
  },
  {
    id: "shellholm-07",
    realmId: "shellholm",
    order: 7,
    title: "연쇄 주문",
    fantasyTitle: "주문서 7장 — 「에코의 메아리를 새기다」",
    briefing:
      "`echo` 로 \"Dragon awakens\" 를 출력하라. 첫 발걸음이다 — 곧 파이프와 리다이렉트도 익히게 된다.",
    hint: "`echo \"Dragon awakens\"`.",
    isBoss: false,
    xpReward: 50,
    evaluator: {
      kind: "terminal",
      initialFs: { "/quest": null },
      initialCwd: "/quest",
      successWhen: {
        type: "lastOutputMatches",
        pattern: "Dragon awakens",
      },
    },
  },
  {
    id: "shellholm-08",
    realmId: "shellholm",
    order: 8,
    title: "유실된 보물찾기",
    fantasyTitle: "🐉 보스 — 「잃어버린 보물 회수전」",
    briefing:
      "임무: (1) `/vault` 디렉토리를 만들고 (2) `/dungeon/loot.txt` 를 그 안으로 옮기고 (3) `/dungeon/trap.txt` 를 제거하라.",
    hint: "`mkdir /vault` → `mv /dungeon/loot.txt /vault/loot.txt` → `rm /dungeon/trap.txt`.",
    isBoss: true,
    xpReward: 120,
    evaluator: {
      kind: "terminal",
      initialFs: {
        "/dungeon": null,
        "/dungeon/loot.txt": "용의 금화 1만 닢",
        "/dungeon/trap.txt": "함정 — 폭발 룬",
      },
      initialCwd: "/dungeon",
      successWhen: {
        type: "all",
        checks: [
          { type: "fsHasDir", path: "/vault" },
          { type: "fsHasFile", path: "/vault/loot.txt" },
          { type: "fsMissingPath", path: "/dungeon/loot.txt" },
          { type: "fsMissingPath", path: "/dungeon/trap.txt" },
        ],
      },
    },
  },
];
