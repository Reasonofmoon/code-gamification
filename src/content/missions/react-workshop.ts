import type { Mission } from "@/types/mission";

const SEREN = { speaker: "사서장 세렌", emoji: "📜" };
const MEMORIA = { speaker: "기계 신탁 사서 메모리아", emoji: "🪄" };

export const REACT_WORKSHOP_MISSIONS: readonly Mission[] = [
  {
    id: "react-workshop-01",
    realmId: "runescar",
    order: 17,
    title: "React 공방 — props",
    fantasyTitle: "웹룬 공방 1장 — 「재료를 받아 화면을 바꾸라」",
    summary: "같은 컴포넌트가 props에 따라 다른 결과를 렌더링하는 감각을 익힌다.",
    isBoss: false,
    xpReward: 130,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "룬스카의 마지막 서가에는 웹룬 공방이 있사옵니다.",
          "여기서는 JavaScript 문법을 실제 화면 조각의 사고방식으로 바꿉니다.",
          "첫 번째 룬은 props. 같은 컴포넌트가 다른 재료를 받아 다른 모습을 그리는 원리이지요.",
        ],
      },
      {
        id: "lab",
        kind: "react-lab",
        labKind: "component-props",
        briefing: "props 값을 조작해 컴포넌트 미리보기를 목표 문자열과 일치시켜라.",
        hint: "title은 `첫 룬`, locked는 꺼진 상태여야 합니다.",
      },
      {
        id: "outro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "이제 카드, 버튼, 미션 목록이 모두 props를 받는 작은 함수처럼 보일 것이옵니다.",
        ],
      },
    ],
  },
  {
    id: "react-workshop-02",
    realmId: "runescar",
    order: 18,
    title: "React 공방 — state와 event",
    fantasyTitle: "웹룬 공방 2장 — 「클릭이 상태를 움직인다」",
    summary: "사용자 이벤트가 상태를 바꾸고 화면이 다시 그려지는 흐름을 체험한다.",
    isBoss: false,
    xpReward: 140,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "화면은 움직입니다. 사용자가 클릭하면 상태가 바뀌고, 상태가 바뀌면 화면이 다시 그려지지요.",
          "이 공방에서는 클릭 이벤트가 상태를 바꾸는 아주 작은 회로를 직접 작동시켜 봅니다.",
        ],
      },
      {
        id: "lab",
        kind: "react-lab",
        labKind: "state-event",
        briefing: "버튼 클릭으로 count 상태를 3까지 올려라.",
        hint: "React 이벤트 핸들러는 `onClick`이고, 상태 변경은 `setCount`로 합니다.",
      },
    ],
  },
  {
    id: "react-workshop-03",
    realmId: "runescar",
    order: 19,
    title: "React 공방 — 조건부 렌더링",
    fantasyTitle: "웹룬 공방 3장 — 「상태가 true일 때만 문이 열린다」",
    summary: "`&&` 조건부 렌더링으로 필요한 UI만 화면에 표시한다.",
    isBoss: false,
    xpReward: 140,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...SEREN,
        lines: [
          "모든 UI를 항상 보여 주면 화면은 금세 소란스러워집니다.",
          "React 에서는 상태가 true일 때만 어떤 조각을 렌더링하는 패턴을 자주 씁니다.",
        ],
      },
      {
        id: "lab",
        kind: "react-lab",
        labKind: "conditional-render",
        briefing: "상태를 바꿔 숨겨진 힌트 문장을 렌더링하라.",
        hint: "`showHint && <p>...</p>` 형태를 떠올리세요.",
      },
    ],
  },
  {
    id: "react-workshop-04",
    realmId: "runescar",
    order: 20,
    title: "React 공방 — import/export",
    fantasyTitle: "웹룬 공방 4장 — 「파일 사이의 문을 맞추라」",
    summary: "named export와 named import가 어떻게 맞물리는지 선택 퍼즐로 익힌다.",
    isBoss: true,
    xpReward: 180,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "이제 파일 하나를 넘어 여러 조각을 연결할 차례입니다.",
          "React 앱은 수많은 컴포넌트를 export하고 import하며 하나의 화면을 만듭니다.",
          "문이 서로 맞지 않으면 빌드는 열리지 않습니다.",
        ],
      },
      {
        id: "lab",
        kind: "react-lab",
        labKind: "import-export",
        briefing: "named export와 named import가 서로 맞는 조합을 고르라.",
        hint: "`export function MissionCard` 는 `import { MissionCard } ...` 와 짝입니다.",
      },
      {
        id: "outro",
        kind: "dialogue",
        ...MEMORIA,
        lines: [
          "파일 사이의 문이 열렸습니다.",
          "이제 Oracle Tower의 SDK, 스트리밍, 도구 호출도 여러 모듈이 협력하는 구조로 볼 수 있을 것입니다.",
        ],
      },
    ],
  },
];
