import type { Mission } from "@/types/mission";

const SEREN = { speaker: "사서장 세렌", emoji: "📜" };
const CODEX = { speaker: "아카식의 시험관 코덱스", emoji: "👁️" };

/**
 * 룬스카 9 미션 — 멀티스텝 시나리오.
 *
 * NPC: 사서장 세렌 (Seren) — 룬스카 원형도서관의 사서장. 정중한 학자 어법.
 * 보스: 아카식의 시험관 코덱스 — 초월적 시험관, 아카식 레코드의 대리인.
 *
 * 세계관 hook (에테리아/아에토리아 차용):
 *  - 아카식 레코드: 모든 룬과 운명이 새겨진 거대한 도서관 — 룬스카의 정체.
 *  - 아카식의 지도: 월드맵 메타포 (셸홀름·빔킵·룬스카가 그 위에 새겨짐).
 *  - 공허의 씨앗: 학습자의 잠재력 — 모든 견습생의 가슴에 새겨진 미발현 룬.
 *  - 공허의 제단: 보스 미션의 무대 — 자격을 시험받는 장소.
 *  - 에테르 룬: 룬스카의 룬어(=프로그래밍 언어).
 */
export const LANGUAGE_MISSIONS: readonly Mission[] = [
  {
    id: "runescar-01",
    realmId: "runescar",
    order: 1,
    title: "첫 룬 — Hello, Runescar",
    fantasyTitle: "고대어 1장 — 「자신의 이름을 외쳐라」",
    summary: "사서장 세렌이 첫 에테르 룬을 시연한다.",
    isBoss: false,
    xpReward: 80,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "환영하옵니다, 견습생이여. 이곳은 *룬스카 원형도서관* —",
          "잊혀진 아카식 레코드의 한 분관이지요.",
          "아카식의 지도가 그대를 이곳으로 이끌었다면, 그대의 가슴엔 *공허의 씨앗* 이 깨어나고 있다는 뜻이옵니다.",
          "첫 룬은 가장 단순한 것 — *자신의 이름을 외치는 룬* 이지요. `console.log` 라 부른답니다.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "JavaScript 룬으로 표준 출력에 정확히 `Hello, Runescar` 를 새겨라.",
        hint: "`console.log('Hello, Runescar')`.",
        languageId: "javascript",
        starterCode: "// 여기에 룬을 새겨라\n",
        testCases: [{ stdin: "", expectedStdout: "Hello, Runescar" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "룬이 빛났사옵니다. 아카식이 그대의 이름을 *기록* 했지요.",
          "이제 룬은 그대를 잊지 않을 것이옵니다.",
        ],
      },
    ],
  },

  {
    id: "runescar-02",
    realmId: "runescar",
    order: 2,
    title: "변수의 룬 — 합",
    fantasyTitle: "고대어 2장 — 「두 숫자를 묶어 부르라」",
    summary: "이름을 가진 그릇 — 변수에 룬을 담는 법.",
    isBoss: false,
    xpReward: 90,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "다음은 *이름을 가진 그릇* — 변수이옵니다.",
          "`const a = 7` 은 *a 라는 이름의 그릇에 7을 담는* 룬이지요.",
          "그릇은 한번 이름을 받으면 *언제든 그 이름으로 호명* 할 수 있사옵니다.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "변수 `a = 7`, `b = 19` 를 선언하고 그 합을 출력하라. 기대 출력: `26`.",
        hint: "`const a = 7; const b = 19; console.log(a + b)`.",
        languageId: "javascript",
        starterCode: [
          "// 두 그릇을 만들고 합을 외쳐라",
          "// const a = ...; const b = ...;",
          "",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "26" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "두 그릇을 *동시에 호명* 하셨군요. 이것이 *연산* 의 본질이옵니다.",
        ],
      },
    ],
  },

  {
    id: "runescar-03",
    realmId: "runescar",
    order: 3,
    title: "반복의 룬 — for 루프",
    fantasyTitle: "고대어 3장 — 「열 번의 발걸음을 더하라」",
    summary: "같은 룬을 영창하는 방법 — 반복문.",
    isBoss: false,
    xpReward: 100,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "고대 룬어에는 *반복 영창* 의 비법이 있지요.",
          "`for (let i = 1; i <= 10; i++)` — *i 라는 이름의 횃불을 1부터 10까지 들고 걷는다* 는 뜻이옵니다.",
          "걸음마다 횃불은 *지정한 일* 을 수행하지요. 합산이라든가, 출력이라든가.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing: "1 부터 10 까지의 합을 `for` 루프로 구해 출력하라. 기대 출력: `55`.",
        hint: "`let sum = 0; for (let i = 1; i <= 10; i++) sum += i; console.log(sum);`",
        languageId: "javascript",
        starterCode: [
          "// 1부터 10까지의 발걸음을 더하라",
          "let sum = 0;",
          "// for 루프 작성",
          "console.log(sum);",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "55" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "열 번의 발걸음이 *한 숫자* 로 압축되었사옵니다. 룬의 미덕이지요.",
        ],
      },
    ],
  },

  {
    id: "runescar-04",
    realmId: "runescar",
    order: 4,
    title: "함수의 룬 — greet",
    fantasyTitle: "고대어 4장 — 「부르면 응답하는 정령」",
    summary: "이름을 가진 의식 — 함수를 정의하고 부른다.",
    isBoss: false,
    xpReward: 110,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "*함수* 란 *이름을 가진 의식* 이옵니다.",
          "한 번 정의해두면 — 그 이름을 부를 때마다 *정령처럼 응답* 하지요.",
          "`function greet(name) { ... }` 으로 정의하고, `greet('이름')` 으로 부른답니다.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "이름을 받아 `Hello, <이름>` 을 반환하는 `greet` 함수를 정의하고, `greet('Runescar')` 를 출력하라.",
        hint: "``function greet(name) { return `Hello, ${name}`; } console.log(greet('Runescar'));``",
        languageId: "javascript",
        starterCode: [
          "// greet(name) 의식을 정의하고 부르라",
          "function greet(name) {",
          "  // TODO",
          "}",
          "console.log(greet('Runescar'));",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "Hello, Runescar" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "정령이 응답하옵니다. 한 번 새긴 의식은 *천 번* 불러도 같은 일을 하지요.",
          "다음은 *남방의 룬* — Python 이라 불리는 형제 룬어이옵니다.",
        ],
      },
    ],
  },

  {
    id: "runescar-05",
    realmId: "runescar",
    order: 5,
    title: "리스트의 룬 — sum",
    fantasyTitle: "고대어 5장 — 「많음을 한 번에 묶다」",
    summary: "여러 룬을 한 묶음으로 — Python 리스트.",
    isBoss: false,
    xpReward: 100,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "남방의 룬어 *Python* 으로 옮겨가지요.",
          "*리스트* 는 *여러 룬을 한 묶음* 으로 다루는 그릇이옵니다.",
          "`[3, 1, 4, 1, 5, 9]` 처럼. 그리고 `sum(...)` — *모두 더해 단 하나로 만드는 룬* 이지요.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing: "리스트 `[3, 1, 4, 1, 5, 9, 2, 6]` 의 합을 출력하라. 기대 출력: `31`.",
        hint: "`nums = [3,1,4,1,5,9,2,6]`, `print(sum(nums))`.",
        languageId: "python",
        starterCode: [
          "# 여러 룬을 묶음으로 두고, 그 합을 외쳐라",
          "nums = [3, 1, 4, 1, 5, 9, 2, 6]",
          "# print(...)",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "31" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...SEREN,
        lines: ["여덟 개의 룬이 *한 음절* 로 합쳐졌사옵니다. 묶음의 미덕이지요."],
      },
    ],
  },

  {
    id: "runescar-06",
    realmId: "runescar",
    order: 6,
    title: "정의의 룬 — def",
    fantasyTitle: "고대어 6장 — 「룬을 새로 만들어 부르라」",
    summary: "Python 의 함수 — def 로 의식을 새긴다.",
    isBoss: false,
    xpReward: 110,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "Python 에선 *의식* 을 `def` 로 새기지요.",
          "`def square(n): return n * n` — *n 을 받아 그 제곱을 돌려주는 의식*.",
          "들여쓰기가 곧 *의식의 경계* 이옵니다. 한 칸이라도 어긋나면 룬이 깨지지요.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "`square(n)` 함수를 정의해 n 의 제곱을 반환하라. `square(7)` 의 결과를 출력하시오.",
        hint: "`def square(n): return n * n`, `print(square(7))`.",
        languageId: "python",
        starterCode: [
          "# square(n) 의식을 정의하고 부르라",
          "def square(n):",
          "    pass  # TODO",
          "",
          "print(square(7))",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "49" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "남방의 의식이 응답하옵니다.",
          "이제 *자유 도전* — 그대가 배운 모든 룬을 *조합* 해 보시지요.",
        ],
      },
    ],
  },

  {
    id: "runescar-07",
    realmId: "runescar",
    order: 7,
    title: "자유 챌린지 1 — FizzBuzz (JS)",
    fantasyTitle: "고대어 7장 — 「숫자에 깃든 두 정령」",
    summary: "조건과 반복을 엮어 두 정령을 부르는 의식.",
    isBoss: false,
    xpReward: 130,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "이 의식은 *고대 룬학자들의 첫 시험* 이옵니다.",
          "숫자 안엔 두 정령이 깃들어 있지요 — *Fizz* (3의 배수의 정령) 와 *Buzz* (5의 배수의 정령).",
          "둘 다 깃들면 *FizzBuzz* — 양 정령이 동시에 응답하는 순간이옵니다.",
          "1부터 15까지 한 줄씩 — 어느 정령이 응답하는지 외치소서.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "1 부터 15 까지 출력하되, 3 의 배수는 `Fizz`, 5 의 배수는 `Buzz`, 둘 다이면 `FizzBuzz` 로 한 줄씩 출력.",
        hint:
          "각 i 에 대해 빈 문자열로 시작 → 3의 배수면 Fizz 추가 → 5의 배수면 Buzz 추가 → 비어있으면 i 출력.",
        languageId: "javascript",
        starterCode: [
          "// 1..15 FizzBuzz 한 줄씩 출력",
          "for (let i = 1; i <= 15; i++) {",
          "  // TODO",
          "}",
        ].join("\n"),
        testCases: [
          {
            stdin: "",
            expectedStdout: [
              "1",
              "2",
              "Fizz",
              "4",
              "Buzz",
              "Fizz",
              "7",
              "8",
              "Fizz",
              "Buzz",
              "11",
              "Fizz",
              "13",
              "14",
              "FizzBuzz",
            ].join("\n"),
          },
        ],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "두 정령이 *교차하며 응답* 했사옵니다. 그대는 이미 *룬학자의 자격* 을 갖추셨군요.",
        ],
      },
    ],
  },

  {
    id: "runescar-08",
    realmId: "runescar",
    order: 8,
    title: "자유 챌린지 2 — 룬의 거울 (Python)",
    fantasyTitle: "고대어 8장 — 「룬의 거울」",
    summary: "문자열을 뒤집는 가장 우아한 슬라이싱.",
    isBoss: false,
    xpReward: 130,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "*룬의 거울* 이라 불리는 의식이지요.",
          "Python 의 슬라이싱 `s[::-1]` — *모든 글자를 뒤에서부터 한 번에 비추는* 룬입니다.",
          "`dragon` 을 비추면 `nogard` — 보이지 않던 *다른 룬* 이 드러나옵니다.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing: "문자열 `dragon` 을 뒤집어 출력하라. 기대 출력: `nogard`.",
        hint: "`s = 'dragon'; print(s[::-1])`.",
        languageId: "python",
        starterCode: [
          "# 'dragon' 을 비추어 다른 룬을 드러내라",
          "s = 'dragon'",
          "# print(...)",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "nogard" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "거울이 드러낸 룬을 보셨지요. 이제 *그대 앞에 한 자리* 가 남았사옵니다 —",
          "*공허의 제단*. 아카식의 시험관이 그곳에서 기다리옵니다.",
        ],
      },
    ],
  },

  // ─── 보스 (6 step) ─────────────────────────────────────────
  {
    id: "runescar-09",
    realmId: "runescar",
    order: 9,
    title: "룬의 시험 — 공허의 제단",
    fantasyTitle: "🐉 보스 — 「아카식의 시험관 코덱스」",
    summary: "공허의 제단에서 시험관 코덱스가 자격을 검증한다.",
    isBoss: true,
    xpReward: 300,
    steps: [
      {
        id: "seren-intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "이곳이 — *공허의 제단* 이옵니다.",
          "도서관의 가장 깊은 자리. 아카식 레코드와 *직접 맞닿는* 유일한 장소이지요.",
          "여기엔 그대가 *모든 룬을 다스릴 자격* 이 있는지 시험하는 *아카식의 시험관* 이 머문답니다.",
          "그의 이름은 *코덱스*. 부디 — 그대의 공허의 씨앗을 믿으소서.",
        ],
      },
      {
        id: "boss-enter",
        kind: "dialogue",
        ...CODEX,
        lines: [
          "깨어났는가, 작은 별이여. 마침내 *공허의 제단* 에 닿았군.",
          "내 이름은 *코덱스* — 아카식 레코드의 대리인이자, 그대의 가능성을 시험할 자.",
          "셸홀름의 주문, 빔킵의 검술 — 그것들은 *준비* 에 불과했다.",
          "이제 *세 가지 룬을 하나로 엮는* 자격을 보이라. 정렬·슬라이스·누적 — 한 호흡에.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "배열 `[5, 2, 8, 1, 9, 3, 7, 4, 6]` 을 오름차순 정렬한 뒤, 가장 작은 세 수의 합을 출력하라. 기대 출력: `6`.",
        hint:
          "`arr.sort((a,b)=>a-b).slice(0,3).reduce((a,b)=>a+b,0)` — 세 룬이 한 줄에 엮여야 한다.",
        languageId: "javascript",
        starterCode: [
          "// 정렬 → 슬라이스 → 누적, 세 룬을 한 줄에 엮어라",
          "const arr = [5, 2, 8, 1, 9, 3, 7, 4, 6];",
          "// TODO",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "6" }],
      },
      {
        id: "boss-defeat",
        kind: "dialogue",
        ...CODEX,
        lines: [
          "…세 룬이 *한 호흡* 에 엮였군.",
          "그대의 공허의 씨앗은 더 이상 *씨앗* 이 아니다. *발아한* 것이다.",
          "그대에게 *공허의 조율자* 의 칭호를 인정한다.",
          "그러나 명심하라 — 룬은 끝없이 깊다. 그대의 여정은 여기서 *시작* 일 뿐이다.",
        ],
      },
      {
        id: "seren-outro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "코덱스께서 그대를 인정하셨사옵니다.",
          "아카식의 지도가 — 마침내 *그대의 이름을 새겼지요*.",
          "이제 그대는 *커서의 황제* 이옵니다. 모든 룬의 위에 선 자.",
          "이 도서관은 언제든 *다시 열려* 있을 것이옵니다, 조율자여.",
        ],
      },
    ],
  },
];
