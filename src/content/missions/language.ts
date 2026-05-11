import type { Mission } from "@/types/mission";

/**
 * 룬스카 9 미션 — 현재는 *단일 step (language challenge 만)* 로 마이그레이션.
 * 다음 라운드에서 dialogue intro/outro + NPC (학자 세렌) 추가 예정.
 */
export const LANGUAGE_MISSIONS: readonly Mission[] = [
  {
    id: "runescar-01",
    realmId: "runescar",
    order: 1,
    title: "첫 룬 — Hello, Runescar",
    fantasyTitle: "고대어 1장 — 「자신의 이름을 외쳐라」",
    summary: "JavaScript 룬으로 Hello, Runescar 출력.",
    isBoss: false,
    xpReward: 80,
    steps: [
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
    ],
  },
  {
    id: "runescar-02",
    realmId: "runescar",
    order: 2,
    title: "변수의 룬 — 합",
    fantasyTitle: "고대어 2장 — 「두 숫자를 묶어 부르라」",
    summary: "변수 a=7, b=19 의 합 26 출력.",
    isBoss: false,
    xpReward: 90,
    steps: [
      {
        id: "challenge",
        kind: "language",
        briefing: "변수 `a = 7`, `b = 19` 를 선언하고 그 합을 출력하라. 기대 출력: `26`.",
        hint: "`const a = 7; const b = 19; console.log(a + b)`.",
        languageId: "javascript",
        starterCode: [
          "// 두 변수를 선언하고 합을 출력하라",
          "// const a = ...; const b = ...;",
          "",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "26" }],
      },
    ],
  },
  {
    id: "runescar-03",
    realmId: "runescar",
    order: 3,
    title: "반복의 룬 — for 루프",
    fantasyTitle: "고대어 3장 — 「열 번의 발걸음을 더하라」",
    summary: "1~10 의 합 55 출력.",
    isBoss: false,
    xpReward: 100,
    steps: [
      {
        id: "challenge",
        kind: "language",
        briefing: "1 부터 10 까지의 합을 `for` 루프로 구해 출력하라. 기대 출력: `55`.",
        hint: "`let sum = 0; for (let i = 1; i <= 10; i++) sum += i; console.log(sum);`",
        languageId: "javascript",
        starterCode: [
          "// 1부터 10까지 더해 출력",
          "let sum = 0;",
          "// for 루프 작성",
          "console.log(sum);",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "55" }],
      },
    ],
  },
  {
    id: "runescar-04",
    realmId: "runescar",
    order: 4,
    title: "함수의 룬 — greet",
    fantasyTitle: "고대어 4장 — 「부르면 응답하는 정령」",
    summary: "greet(name) 함수 정의 후 호출.",
    isBoss: false,
    xpReward: 110,
    steps: [
      {
        id: "challenge",
        kind: "language",
        briefing:
          "이름을 받아 `Hello, <이름>` 을 반환하는 `greet` 함수를 정의하고, `greet('Runescar')` 를 출력하라.",
        hint: "``function greet(name) { return `Hello, ${name}`; } console.log(greet('Runescar'));``",
        languageId: "javascript",
        starterCode: [
          "// greet(name) 함수 정의 후 호출",
          "function greet(name) {",
          "  // TODO",
          "}",
          "console.log(greet('Runescar'));",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "Hello, Runescar" }],
      },
    ],
  },
  {
    id: "runescar-05",
    realmId: "runescar",
    order: 5,
    title: "리스트의 룬 — sum",
    fantasyTitle: "고대어 5장 — 「많음을 한 번에 묶다」",
    summary: "Python 리스트 합 31 출력.",
    isBoss: false,
    xpReward: 100,
    steps: [
      {
        id: "challenge",
        kind: "language",
        briefing: "리스트 `[3, 1, 4, 1, 5, 9, 2, 6]` 의 합을 출력하라. 기대 출력: `31`.",
        hint: "`nums = [3,1,4,1,5,9,2,6]`, `print(sum(nums))`.",
        languageId: "python",
        starterCode: [
          "# 리스트의 합을 출력",
          "nums = [3, 1, 4, 1, 5, 9, 2, 6]",
          "# print(...)",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "31" }],
      },
    ],
  },
  {
    id: "runescar-06",
    realmId: "runescar",
    order: 6,
    title: "정의의 룬 — def",
    fantasyTitle: "고대어 6장 — 「룬을 새로 만들어 부르라」",
    summary: "square(n) 정의 후 7 의 제곱 49 출력.",
    isBoss: false,
    xpReward: 110,
    steps: [
      {
        id: "challenge",
        kind: "language",
        briefing:
          "`square(n)` 함수를 정의해 n 의 제곱을 반환하라. `square(7)` 의 결과를 출력.",
        hint: "`def square(n): return n * n`, `print(square(7))`.",
        languageId: "python",
        starterCode: [
          "# square(n) 정의 후 호출",
          "def square(n):",
          "    pass  # TODO",
          "",
          "print(square(7))",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "49" }],
      },
    ],
  },
  {
    id: "runescar-07",
    realmId: "runescar",
    order: 7,
    title: "자유 챌린지 1 — FizzBuzz (JS)",
    fantasyTitle: "고대어 7장 — 「숫자에 깃든 두 정령」",
    summary: "1~15 FizzBuzz 한 줄씩 출력.",
    isBoss: false,
    xpReward: 130,
    steps: [
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
    ],
  },
  {
    id: "runescar-08",
    realmId: "runescar",
    order: 8,
    title: "자유 챌린지 2 — 문자열 뒤집기 (Python)",
    fantasyTitle: "고대어 8장 — 「룬의 거울」",
    summary: "'dragon' 을 뒤집어 'nogard'.",
    isBoss: false,
    xpReward: 130,
    steps: [
      {
        id: "challenge",
        kind: "language",
        briefing: "문자열 `dragon` 을 뒤집어 출력하라. 기대 출력: `nogard`.",
        hint: "`s = 'dragon'; print(s[::-1])`.",
        languageId: "python",
        starterCode: [
          "# 'dragon' 을 뒤집어 출력",
          "s = 'dragon'",
          "# print(...)",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "nogard" }],
      },
    ],
  },
  {
    id: "runescar-09",
    realmId: "runescar",
    order: 9,
    title: "룬의 시험",
    fantasyTitle: "🐉 보스 — 「세 가지 룬을 하나로 엮어라」",
    summary: "정렬 + 슬라이스 + reduce 로 6 출력.",
    isBoss: true,
    xpReward: 300,
    steps: [
      {
        id: "challenge",
        kind: "language",
        briefing:
          "배열 `[5, 2, 8, 1, 9, 3, 7, 4, 6]` 을 오름차순 정렬한 뒤, 가장 작은 세 수의 합을 출력하라. 기대 출력: `6`.",
        hint:
          "`arr.sort((a,b)=>a-b).slice(0,3).reduce((a,b)=>a+b,0)` 한 줄로 가능.",
        languageId: "javascript",
        starterCode: [
          "// 정렬 → 슬라이스 → 합산",
          "const arr = [5, 2, 8, 1, 9, 3, 7, 4, 6];",
          "// TODO",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "6" }],
      },
    ],
  },
];
