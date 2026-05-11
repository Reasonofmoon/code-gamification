import type { Mission } from "@/types/mission";

const MORGAN = { speaker: "늙은 항해사 모르간", emoji: "🧔🏻‍♂️" };
const CARGOS = { speaker: "부두 도적 카르고스", emoji: "🦹" };

export const TERMINAL_MISSIONS: readonly Mission[] = [
  {
    id: "shellholm-01",
    realmId: "shellholm",
    order: 1,
    title: "내 위치 알기",
    fantasyTitle: "주문서 1장 — 「현재의 좌표를 노래하라」",
    summary: "모르간이 첫 주문 `pwd` 의 비밀을 알려준다.",
    isBoss: false,
    xpReward: 30,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "젊은 견습생, 셸홀름 항구에 온 것을 환영하네.",
          "이 안개 자욱한 부둣가에서 첫 번째로 배워야 할 건…",
          "*자신이 어디에 서 있는지* 를 아는 것일세.",
          "주문서를 펼치게. 첫 주문은 `pwd` 일세 — '나의 위치를 노래하라'.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing: "터미널에 `pwd` 를 입력하고 Enter. 가상 셸이 현재 위치를 외쳐준다.",
        hint: "그냥 `pwd` 만 입력하면 된다.",
        initialFs: {
          "/quest": null,
          "/quest/notes.txt": "어둠 속 첫 발자국",
        },
        initialCwd: "/quest",
        successWhen: { type: "commandUsed", command: "pwd" },
      },
      {
        id: "outro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "잘 했네. 안개 속에서 *나*를 잃지 않는 자만이 살아남지.",
          "다음엔 *주변*을 둘러보는 법을 배우게나.",
        ],
      },
    ],
  },

  {
    id: "shellholm-02",
    realmId: "shellholm",
    order: 2,
    title: "감지 마법 — ls",
    fantasyTitle: "주문서 2장 — 「숨겨진 것까지 비추라」",
    summary: "보이지 않는 파일도 비추는 `ls -a` 의 비밀.",
    isBoss: false,
    xpReward: 30,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "이 방에는 *보이는* 검도 있지만, 보이지 않는 보물도 숨겨져 있다네.",
          "`ls` 는 보이는 것을 비추고, `ls -a` 는 *숨겨진 것까지* 비추지.",
          "`.` 으로 시작하는 이름은 숨김 파일 — 마법사들이 표지로 쓰는 비밀 부호일세.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing:
          "`ls -a` 로 숨김 파일까지 모두 비추어라. 출력에 `.secret` 이 나타나면 성공.",
        hint: "`ls -a` 한 줄.",
        initialFs: {
          "/quest": null,
          "/quest/sword.txt": "녹슨 검",
          "/quest/.secret": "용의 비늘 조각",
        },
        initialCwd: "/quest",
        successWhen: { type: "lastOutputMatches", pattern: "\\.secret" },
      },
      {
        id: "outro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "용의 비늘 조각이 보이는가? 진짜 보물은 *언제나* 점 하나로 가려져 있다네.",
        ],
      },
    ],
  },

  {
    id: "shellholm-03",
    realmId: "shellholm",
    order: 3,
    title: "텔레포트 — cd",
    fantasyTitle: "주문서 3장 — 「뒤뜰의 묘소로」",
    summary: "공간을 이동하는 가장 빠른 주문.",
    isBoss: false,
    xpReward: 40,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "낡은 지도에는 `/quest/yard` — 안개 묘소 — 가 표시되어 있네.",
          "`cd` 주문으로 그곳에 닿게. *디렉토리를 바꾼다* 는 뜻이지만,",
          "내겐 그저 *텔레포트* 처럼 들리는군.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing: "`/quest/yard` 로 이동하라. 절대 경로 또는 상대 경로 둘 다 가능.",
        hint: "`cd /quest/yard` 또는 `cd yard`.",
        initialFs: {
          "/quest": null,
          "/quest/yard": null,
          "/quest/yard/tombstone.txt": "RIP nano",
        },
        initialCwd: "/quest",
        successWhen: { type: "cwdEquals", path: "/quest/yard" },
      },
      {
        id: "outro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "묘소에 도착했군. 비석에 적힌 `RIP nano` 는… 다른 마법사 학파의 농담일세. 잊게나.",
        ],
      },
    ],
  },

  {
    id: "shellholm-04",
    realmId: "shellholm",
    order: 4,
    title: "결계 펼치기 — mkdir",
    fantasyTitle: "주문서 4장 — 「새 방을 짓다」",
    summary: "비어있는 방, 무엇이든 담을 수 있는 공간을 짓는 주문.",
    isBoss: false,
    xpReward: 40,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "마법서가 점점 늘어나니, 책장 — *디렉토리* — 가 필요하군.",
          "`mkdir <이름>` 으로 새 방을 만들 수 있네.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing: "`/quest/library` 디렉토리를 만들어라.",
        hint: "`mkdir /quest/library` 또는 `/quest` 안에서 `mkdir library`.",
        initialFs: { "/quest": null },
        initialCwd: "/quest",
        successWhen: { type: "fsHasDir", path: "/quest/library" },
      },
      {
        id: "outro",
        kind: "dialogue",
        ...MORGAN,
        lines: ["좋군. 다음엔 그 안에 *무엇*을 둘지 배워야 하네."],
      },
    ],
  },

  {
    id: "shellholm-05",
    realmId: "shellholm",
    order: 5,
    title: "보물 옮기기 — mv",
    fantasyTitle: "주문서 5장 — 「올바른 방에 두라」",
    summary: "두루마리를 올바른 방으로. 떠나는 것이 곧 도착이다.",
    isBoss: false,
    xpReward: 50,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "보물은 *어디에 있느냐* 가 보물의 가치를 결정하지.",
          "`mv <원본> <목적지>` 는 옮기는 동시에 *원본을 없애지*. 한 번에 두 가지 일.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing:
          "`/quest/treasure.txt` 를 `/quest/library/treasure.txt` 로 옮겨라.",
        hint: "`mv treasure.txt library/treasure.txt`.",
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
      {
        id: "outro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "옮겨졌군. 원본이 사라진 것을 기억하게 — `mv` 는 *복제* 가 아니라 *이동* 일세.",
        ],
      },
    ],
  },

  {
    id: "shellholm-06",
    realmId: "shellholm",
    order: 6,
    title: "소멸 주문 — rm (주의)",
    fantasyTitle: "주문서 6장 — 「되돌릴 수 없는 한 음절」",
    summary: "한 번 외치면 돌이킬 수 없는 가장 위험한 주문.",
    isBoss: false,
    xpReward: 50,
    steps: [
      {
        id: "warning",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "잘 듣게나 — 이 주문은 *되돌릴 수 없네*.",
          "휴지통 같은 건 없네. 외친 순간, *사라진다네*.",
          "그러니 *대상을 정확히* 외쳐야 하네. `important.txt` 는 *반드시* 살려두게.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing:
          "오염된 두루마리 `cursed.txt` 만 소멸시켜라. `important.txt` 는 살아남아야 한다.",
        hint: "`rm cursed.txt`. 손이 떨려도 정확히.",
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
      {
        id: "outro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "잘했네. 이 주문은 *한평생* 조심해서 쓰는 게 좋네.",
          "특히 `rm -rf /` — 그건 절대 외치지 말게. *세상이 사라지네*.",
        ],
      },
    ],
  },

  {
    id: "shellholm-07",
    realmId: "shellholm",
    order: 7,
    title: "에코의 메아리 — echo",
    fantasyTitle: "주문서 7장 — 「말을 새기다」",
    summary: "자신의 말을 메아리치게 하는 가장 단순한 주문.",
    isBoss: false,
    xpReward: 50,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "다음 주문은 너무 단순해서 학자들이 자주 잊는 거지.",
          "`echo <말>` — 그저 외친 말을 *메아리치게* 한다네.",
          "허나 *연쇄 주문* 의 첫 발걸음이지. 곧 `|` 와 `>` 도 만나게 될 걸세.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing: "`Dragon awakens` 를 메아리치게 하라.",
        hint: '`echo "Dragon awakens"`.',
        initialFs: { "/quest": null },
        initialCwd: "/quest",
        successWhen: {
          type: "lastOutputMatches",
          pattern: "Dragon awakens",
        },
      },
      {
        id: "outro",
        kind: "dialogue",
        ...MORGAN,
        lines: [
          "메아리가 울리는군. 무엇인가… 다가오고 있어.",
          "다음 미션에선… 직접 보스를 만나게 될 걸세. 마음을 단단히 먹게.",
        ],
      },
    ],
  },

  // ─────────────── BOSS ───────────────
  {
    id: "shellholm-08",
    realmId: "shellholm",
    order: 8,
    title: "유실된 보물찾기",
    fantasyTitle: "🐉 보스 — 「잃어버린 보물 회수전」",
    summary: "부두 도적 카르고스가 보물을 함정과 함께 숨겼다. 세 주문으로 해결하라.",
    isBoss: true,
    xpReward: 120,
    steps: [
      {
        id: "boss-enter",
        kind: "dialogue",
        ...CARGOS,
        lines: [
          "흥… 견습생 따위가 여기까지 왔단 말이지?",
          "이 던전 어딘가에 *황금 두루마리* 가 있다. 가져갈 수 있다면 가져가 봐라.",
          "다만… 함정도 같이 있다는 걸 잊지 마라.",
          "*세 가지 주문* 으로 해결하라. mkdir·mv·rm. 그 이상은 아량을 베풀어 알려주지 않겠다.",
        ],
      },
      {
        id: "make-vault",
        kind: "terminal",
        briefing: "1단계: 보물을 보관할 `/vault` 디렉토리를 만들어라.",
        hint: "`mkdir /vault`.",
        initialFs: {
          "/dungeon": null,
          "/dungeon/loot.txt": "용의 금화 1만 닢",
          "/dungeon/trap.txt": "함정 — 폭발 룬",
        },
        initialCwd: "/dungeon",
        successWhen: { type: "fsHasDir", path: "/vault" },
      },
      {
        id: "mid-taunt",
        kind: "dialogue",
        ...CARGOS,
        lines: [
          "방을 만들었군? 흥미롭다.",
          "이제 *옮기되, 함정은 피해야* 한다. 잘못 만지면 끝이다.",
        ],
      },
      {
        id: "move-loot",
        kind: "terminal",
        briefing: "2단계: `/dungeon/loot.txt` 를 `/vault/loot.txt` 로 옮겨라.",
        hint: "`mv /dungeon/loot.txt /vault/loot.txt`.",
        initialFs: {
          "/dungeon": null,
          "/vault": null,
          "/dungeon/loot.txt": "용의 금화 1만 닢",
          "/dungeon/trap.txt": "함정 — 폭발 룬",
        },
        initialCwd: "/dungeon",
        successWhen: {
          type: "all",
          checks: [
            { type: "fsHasFile", path: "/vault/loot.txt" },
            { type: "fsMissingPath", path: "/dungeon/loot.txt" },
          ],
        },
      },
      {
        id: "remove-trap",
        kind: "terminal",
        briefing: "3단계: 마지막으로 `/dungeon/trap.txt` 를 소멸시켜라.",
        hint: "`rm /dungeon/trap.txt`.",
        initialFs: {
          "/dungeon": null,
          "/vault": null,
          "/vault/loot.txt": "용의 금화 1만 닢",
          "/dungeon/trap.txt": "함정 — 폭발 룬",
        },
        initialCwd: "/dungeon",
        successWhen: { type: "fsMissingPath", path: "/dungeon/trap.txt" },
      },
      {
        id: "boss-defeat",
        kind: "dialogue",
        ...CARGOS,
        lines: [
          "…그럴 리가.",
          "함정을 피하고, 보물을 옮기고, 흔적까지 지웠다고?",
          "셸홀름 항구는 그대를 다음 대륙으로 보낼 것이다. *빔킵* — 검의 도시로.",
          "그곳에선… 명령어가 검술이 된다. 행운을 빈다, 견습생이여.",
        ],
      },
    ],
  },
];
