import type { Mission } from "@/types/mission";

export const LANGUAGE_MISSIONS: readonly Mission[] = [
  // ─── JS 트리 ──────────────────────────────────────────────
  {
    id: "runescar-01",
    realmId: "runescar",
    order: 1,
    title: "첫 룬 — Hello, Runescar",
    fantasyTitle: "고대어 1장 — 「자신의 이름을 외쳐라」",
    briefing:
      "JavaScript 룬으로 표준 출력에 정확히 `Hello, Runescar` 를 새겨라. (Judge0 실행)",
    hint: "`console.log('Hello, Runescar')`.",
    isBoss: false,
    xpReward: 80,
    evaluator: {
      kind: "language",
      languageId: "javascript",
      starterCode: "// 여기에 룬을 새겨라\n",
      testCases: [{ stdin: "", expectedStdout: "Hello, Runescar" }],
    },
  },
  {
    id: "runescar-02",
    realmId: "runescar",
    order: 2,
    title: "변수의 룬 — 합",
    fantasyTitle: "고대어 2장 — 「두 숫자를 묶어 부르라」",
    briefing:
      "변수 `a = 7`, `b = 19` 를 선언하고 그 합을 출력하라. 기대 출력: `26`.",
    hint: "`const a = 7; const b = 19; console.log(a + b)`.",
    isBoss: false,
    xpReward: 90,
    evaluator: {
      kind: "language",
      languageId: "javascript",
      starterCode: [
        "// 두 변수를 선언하고 합을 출력하라",
        "// const a = ...; const b = ...;",
        "",
      ].join("\n"),
      testCases: [{ stdin: "", expectedStdout: "26" }],
    },
  },
  {
    id: "runescar-03",
    realmId: "runescar",
    order: 3,
    title: "반복의 룬 — for 루프",
    fantasyTitle: "고대어 3장 — 「열 번의 발걸음을 더하라」",
    briefing:
      "1 부터 10 까지의 합을 `for` 루프로 구해 출력하라. 기대 출력: `55`.",
    hint: "`let sum = 0; for (let i = 1; i <= 10; i++) sum += i; console.log(sum);`",
    isBoss: false,
    xpReward: 100,
    evaluator: {
      kind: "language",
      languageId: "javascript",
      starterCode: [
        "// 1부터 10까지 더해 출력",
        "let sum = 0;",
        "// for 루프 작성",
        "console.log(sum);",
      ].join("\n"),
      testCases: [{ stdin: "", expectedStdout: "55" }],
    },
  },
  {
    id: "runescar-04",
    realmId: "runescar",
    order: 4,
    title: "함수의 룬 — greet",
    fantasyTitle: "고대어 4장 — 「부르면 응답하는 정령」",
    briefing:
      "이름을 받아 `Hello, <이름>` 을 반환하는 `greet` 함수를 정의하고, `greet('Runescar')` 를 출력하라.",
    hint: "`function greet(name) { return \\`Hello, ${name}\\`; } console.log(greet('Runescar'));`",
    isBoss: false,
    xpReward: 110,
    evaluator: {
      kind: "language",
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
  },

  // ─── Python 트리 ─────────────────────────────────────────
  {
    id: "runescar-05",
    realmId: "runescar",
    order: 5,
    title: "리스트의 룬 — sum",
    fantasyTitle: "고대어 5장 — 「많음을 한 번에 묶다」",
    briefing:
      "리스트 `[3, 1, 4, 1, 5, 9, 2, 6]` 의 합을 출력하라. 기대 출력: `31`.",
    hint: "`nums = [3,1,4,1,5,9,2,6]`, `print(sum(nums))`.",
    isBoss: false,
    xpReward: 100,
    evaluator: {
      kind: "language",
      languageId: "python",
      starterCode: [
        "# 리스트의 합을 출력",
        "nums = [3, 1, 4, 1, 5, 9, 2, 6]",
        "# print(...)",
      ].join("\n"),
      testCases: [{ stdin: "", expectedStdout: "31" }],
    },
  },
  {
    id: "runescar-06",
    realmId: "runescar",
    order: 6,
    title: "정의의 룬 — def",
    fantasyTitle: "고대어 6장 — 「룬을 새로 만들어 부르라」",
    briefing:
      "`square(n)` 함수를 정의해 `n` 의 제곱을 반환하라. 그리고 `square(7)` 의 결과를 출력하라.",
    hint: "`def square(n): return n * n`, `print(square(7))`.",
    isBoss: false,
    xpReward: 110,
    evaluator: {
      kind: "language",
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
  },

  // ─── 자유 챌린지 ──────────────────────────────────────────
  {
    id: "runescar-07",
    realmId: "runescar",
    order: 7,
    title: "자유 챌린지 1 — FizzBuzz (JS)",
    fantasyTitle: "고대어 7장 — 「숫자에 깃든 두 정령」",
    briefing:
      "1 부터 15 까지 출력하되, 3 의 배수는 `Fizz`, 5 의 배수는 `Buzz`, 둘 다이면 `FizzBuzz` 로 한 줄씩 출력하라.",
    hint:
      "`for (let i = 1; i <= 15; i++) { let s = ''; if (i % 3 === 0) s += 'Fizz'; if (i % 5 === 0) s += 'Buzz'; console.log(s || i); }`",
    isBoss: false,
    xpReward: 130,
    evaluator: {
      kind: "language",
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
  },
  {
    id: "runescar-08",
    realmId: "runescar",
    order: 8,
    title: "자유 챌린지 2 — 문자열 뒤집기 (Python)",
    fantasyTitle: "고대어 8장 — 「룬의 거울」",
    briefing:
      "문자열 `dragon` 을 뒤집어 출력하라. 기대 출력: `nogard`.",
    hint: "`s = 'dragon'; print(s[::-1])`. 슬라이싱은 Python의 가장 우아한 룬이다.",
    isBoss: false,
    xpReward: 130,
    evaluator: {
      kind: "language",
      languageId: "python",
      starterCode: [
        "# 'dragon' 을 뒤집어 출력",
        "s = 'dragon'",
        "# print(...)",
      ].join("\n"),
      testCases: [{ stdin: "", expectedStdout: "nogard" }],
    },
  },

  // ─── 보스 ─────────────────────────────────────────────────
  {
    id: "runescar-09",
    realmId: "runescar",
    order: 9,
    title: "룬의 시험",
    fantasyTitle: "🐉 보스 — 「세 가지 룬을 하나로 엮어라」",
    briefing:
      "배열 `[5, 2, 8, 1, 9, 3, 7, 4, 6]` 을 오름차순 정렬한 뒤, 가장 작은 세 수의 합을 출력하라. (정렬·슬라이싱·누적 — 세 가지 룬을 한 번에 사용한다.) 기대 출력: `6`.",
    hint:
      "`const arr = [5,2,8,1,9,3,7,4,6].sort((a,b)=>a-b); console.log(arr.slice(0,3).reduce((a,b)=>a+b,0));`",
    isBoss: true,
    xpReward: 300,
    evaluator: {
      kind: "language",
      languageId: "javascript",
      starterCode: [
        "// 정렬 → 슬라이스 → 합산",
        "const arr = [5, 2, 8, 1, 9, 3, 7, 4, 6];",
        "// TODO",
      ].join("\n"),
      testCases: [{ stdin: "", expectedStdout: "6" }],
    },
  },
];
