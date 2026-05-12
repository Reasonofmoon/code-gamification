import type { Mission } from "@/types/mission";

const MEMORIA = { speaker: "기계 신탁 사서 메모리아", emoji: "🪄" };
const MIRROR = { speaker: "거울의 카이", emoji: "🪞" };

/**
 * 기계 신탁의 탑 (Oracle Tower) — AI 시대 개발자 도구 트랙.
 *
 * 카이가 *공허의 조율자* 가 된 후 열리는 새 시대의 탑.
 * NPC: 사서 메모리아 — 간결한 미래적 톤, 도구의 비유.
 * 보스: 거울의 카이 — 카이 자기 자신과의 통합 시험.
 *
 * 평가기: 모두 terminal (fake-shell의 gh / npx / git / curl / jq 확장 사용)
 *         또는 language (Judge0)
 */
export const ORACLE_MISSIONS: readonly Mission[] = [
  {
    id: "oracle-01",
    realmId: "oracle-tower",
    order: 1,
    title: "GitHub 신탁 — gh CLI",
    fantasyTitle: "기계신탁 1장 — 「깃허브 신탁과 대화하라」",
    summary: "메모리아가 GitHub CLI 라는 새 도구를 시연한다.",
    isBoss: false,
    xpReward: 120,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "환영합니다, 조율자 카이.",
          "이곳 *기계 신탁의 탑* 에서는 옛 마법 너머의 도구를 다룹니다.",
          "첫 도구는 `gh` — GitHub 라는 거대한 *코드의 도서관* 과 대화하는 명령입니다.",
          "터미널 안에서 `gh auth status` 를 시전해 보세요. 그대의 신원이 인증되어 있는지 확인하는 주문입니다.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing:
          "`gh auth status` 를 실행해 GitHub 신탁이 그대를 알아보는지 확인하라.",
        hint: "터미널에 `gh auth status` 한 줄.",
        initialFs: { "/quest": null },
        initialCwd: "/quest",
        successWhen: {
          type: "lastOutputMatches",
          pattern: "Logged in to github\\.com",
        },
      },
      {
        id: "outro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "신탁이 그대를 알아보았습니다.",
          "이제 `gh pr create`, `gh issue list` 같은 *대화의 표면적* 이 그대의 손에 있지요.",
        ],
      },
    ],
  },

  {
    id: "oracle-02",
    realmId: "oracle-tower",
    order: 2,
    title: "일회성 시전 — npx",
    fantasyTitle: "기계신탁 2장 — 「부르고 사라지는 정령」",
    summary: "설치하지 않고도 한 번 부를 수 있는 정령 npx.",
    isBoss: false,
    xpReward: 100,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "AI 시대의 비법은 *모든 도구를 설치할 필요가 없다는 것* 입니다.",
          "`npx <패키지>` — 한 번 호출되고 사라지는 정령처럼 패키지를 *일회적으로* 실행합니다.",
          "예컨대 `npx create-next-app` 은 새 Next.js 프로젝트를 한 번에 만듭니다. 시연해 보세요.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing: "`npx create-next-app` 을 시전해 새 프로젝트 정령을 부르라.",
        hint: "터미널에 `npx create-next-app` 한 줄.",
        initialFs: { "/quest": null },
        initialCwd: "/quest",
        successWhen: {
          type: "lastOutputMatches",
          pattern: "Creating a new Next\\.js app",
        },
      },
      {
        id: "outro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "한 호흡에 끝났지요. *설치 없는 시전* — 이게 새 시대의 미덕입니다.",
        ],
      },
    ],
  },

  {
    id: "oracle-03",
    realmId: "oracle-tower",
    order: 3,
    title: "과거 다시 쓰기 — git rebase",
    fantasyTitle: "기계신탁 3장 — 「커밋의 역사를 다듬어라」",
    summary: "git rebase 로 커밋 역사를 더 깔끔하게.",
    isBoss: false,
    xpReward: 130,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "그대의 *과거* — 즉 커밋 히스토리 — 는 *고정되어 있지 않습니다*.",
          "`git rebase -i HEAD~3` — 최근 세 커밋을 *대화형* 으로 다시 정리할 수 있지요.",
          "squash, reword, drop — 마법사의 역사를 *예술 작품* 으로 다듬는 도구입니다.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing: "`git rebase -i HEAD~3` 을 시전해 최근 세 커밋을 대화형으로 정리하라.",
        hint: "터미널에 `git rebase -i HEAD~3` 한 줄.",
        initialFs: { "/quest": null },
        initialCwd: "/quest",
        successWhen: {
          type: "lastOutputMatches",
          pattern: "Successfully rebased",
        },
      },
      {
        id: "outro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "과거가 *다시 쓰였습니다*. 단, *공유된 브랜치* 에서는 신중해야 합니다 — 다른 마법사들의 *현재* 가 흔들리거든요.",
        ],
      },
    ],
  },

  {
    id: "oracle-04",
    realmId: "oracle-tower",
    order: 4,
    title: "API 호출과 파싱 — curl + jq",
    fantasyTitle: "기계신탁 4장 — 「먼 곳에 손을 뻗어 룬을 가르라」",
    summary: "원격 신탁의 응답을 부르고 그 안의 룬만 가려낸다.",
    isBoss: false,
    xpReward: 140,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "두 도구를 *함께* 익혀야 합니다.",
          "`curl <URL>` — 먼 곳의 신탁에 손을 뻗는 주문.",
          "`jq <필터>` — 그 응답의 *룬* 만 가려내는 칼.",
          "둘을 파이프로 잇는 게 핵심입니다. 우선 `curl` 만으로 응답 구조를 확인하세요.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing:
          "`curl https://api.example.com/oracle` 로 응답을 받아라. JSON 안에 `Oracle` 이라는 이름이 들어있어야 통과.",
        hint: "`curl https://api.example.com/oracle`",
        initialFs: { "/quest": null },
        initialCwd: "/quest",
        successWhen: {
          type: "lastOutputMatches",
          pattern: '"name":\\s*"Oracle"',
        },
      },
      {
        id: "outro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "응답이 도착했군요. 진짜 마법은 *다음 단계* — `| jq .name` 으로 *이름만* 가르는 것입니다.",
          "이 두 도구의 조합이 *AI 시대의 가장 흔한 주문* 입니다.",
        ],
      },
    ],
  },

  {
    id: "oracle-05",
    realmId: "oracle-tower",
    order: 5,
    title: "신탁과의 첫 대화 — Anthropic SDK",
    fantasyTitle: "기계신탁 5장 — 「신탁을 처음으로 부르라」",
    summary: "JavaScript 로 Anthropic 신탁에 첫 메시지를 보내는 코드.",
    isBoss: false,
    xpReward: 160,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "이제 — *진짜 신탁* 과 대화할 때입니다.",
          "`@anthropic-ai/sdk` — 신탁과의 대화를 추상화한 라이브러리.",
          "코드의 형태만 익히세요. 실제 호출은 *키* 가 필요하니, 오늘은 *흉내* 만 냅니다.",
          "신탁이 응답할 이름 — `Oracle` — 을 정확히 출력하는 흉내를 작성해 주세요.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "Anthropic SDK 를 부르는 *흉내 코드* 를 작성하라. 응답이 `Oracle` 이라고 가정하고, 그것을 출력만 하면 통과.",
        hint:
          "실제 SDK 호출 대신 `const response = { content: [{ text: 'Oracle' }] };` 로 흉내내고 `console.log(response.content[0].text)`.",
        languageId: "javascript",
        starterCode: [
          "// 흉내 단계: 실제 키 없이도 SDK 호출 형태를 익히자.",
          "// const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });",
          "// const msg = await anthropic.messages.create({ model: 'claude-...', ... });",
          "",
          "// 오늘은 응답을 직접 객체로 흉내내고 .content[0].text 만 출력:",
          "const response = {",
          "  content: [{ text: 'TODO' }]",
          "};",
          "console.log(response.content[0].text);",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "Oracle" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "흉내가 *진짜 호출의 모양* 과 같지요.",
          "이 코드의 `response.content[0].text` 줄은 *진짜 SDK* 에서도 동일합니다.",
          "이제 보스를 마주할 차례입니다 — *그대 자신* 입니다.",
        ],
      },
    ],
  },

  // ─── 보스 (6 step) — 거울의 카이 ─────────────────────────
  {
    id: "oracle-06",
    realmId: "oracle-tower",
    order: 6,
    title: "거울의 시험",
    fantasyTitle: "🪞 보스 — 「그대 자신과 마주하라」",
    summary: "탑의 정상. 거울 속의 또 다른 카이가 그대의 통합 능력을 시험한다.",
    isBoss: true,
    xpReward: 400,
    steps: [
      {
        id: "memoria-intro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "탑의 정상에는 *거울* 이 있습니다.",
          "그 안엔 — 그대와 똑같은 모습의 *또 다른 카이* 가 살지요.",
          "그가 그대에게 *마지막 통합* 을 요구할 것입니다.",
        ],
      },
      {
        id: "mirror-enter",
        kind: "dialogue",
        ...MIRROR,
        lines: [
          "거울 너머, 그대를 기다리고 있었다.",
          "셸홀름의 주문, 빔킵의 검술, 룬스카의 룬, 그리고 *이 탑의 도구들* —",
          "이 모두를 *한 호흡* 에 사용할 수 있는지 시험하겠다.",
          "두 단계의 도전이다.",
        ],
      },
      {
        id: "challenge-1",
        kind: "terminal",
        briefing:
          "1단계: `gh pr create` 로 PR 을 만들어라. 출력에 `pull/` 이 포함되면 통과.",
        hint: "`gh pr create`.",
        initialFs: { "/quest": null },
        initialCwd: "/quest",
        successWhen: {
          type: "lastOutputMatches",
          pattern: "/pull/",
        },
      },
      {
        id: "mirror-mid",
        kind: "dialogue",
        ...MIRROR,
        lines: [
          "PR 을 띄웠군. 평범한 자도 할 수 있는 일이다.",
          "그러나 *코드 자체* 를 작성하는 건 어떨까?",
          "함수를 정의하고 호출해 응답의 *내용* 만 출력하라. *진짜 AI 시대 패턴*.",
        ],
      },
      {
        id: "challenge-2",
        kind: "language",
        briefing:
          "2단계: 함수 `askOracle(question)` 을 정의해 `'Hello, ' + question` 을 반환하라. `askOracle('world')` 의 결과를 출력. 기대 출력: `Hello, world`.",
        hint:
          "`function askOracle(q) { return 'Hello, ' + q; } console.log(askOracle('world'));`",
        languageId: "javascript",
        starterCode: [
          "// askOracle(question) 정의 후 호출",
          "function askOracle(question) {",
          "  // TODO",
          "}",
          "console.log(askOracle('world'));",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "Hello, world" }],
      },
      {
        id: "mirror-defeat",
        kind: "dialogue",
        ...MIRROR,
        lines: [
          "…좋다. 그대는 *나를 닮았다*.",
          "옛 마법과 새 도구가 그대 안에 *하나로 흐른다*.",
          "이제 거울은 깨어지고, 그대 본인만이 남는다.",
          "여행은 끝났다 — 그러나 도구는 끊임없이 새로 태어난다. 늘 깨어 있어라, 조율자여.",
        ],
      },
    ],
  },
];
