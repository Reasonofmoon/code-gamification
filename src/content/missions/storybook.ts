import type { Mission } from "@/types/mission";

const ARIA = { speaker: "어린 엘라 아리아", emoji: "🛡️" };
const NOX = { speaker: "어린 리오넬 녹스", emoji: "🌙" };
const BOLT = { speaker: "어린 카엘 볼트", emoji: "⚡" };
const LUMI = { speaker: "어린 세렌 루미", emoji: "✨" };
const PIX = { speaker: "어린 카이 픽스", emoji: "🧭" };
const GLITCH = { speaker: "시간 낙서꾼 글리치", emoji: "🃏" };

export const STORYBOOK_MISSIONS: readonly Mission[] = [
  {
    id: "storybook-01",
    realmId: "storybook",
    order: 1,
    title: "어린 엘라의 이름표 공방",
    fantasyTitle: "코딩동화 1장 — 「변수에 이름을 붙이면 길이 열린다」",
    summary:
      "훗날 잿빛 황무지의 길잡이가 될 어린 엘라가 변수와 출력으로 시간책의 이름표를 복구한다.",
    isBoss: false,
    xpReward: 70,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...ARIA,
        lines: [
          "어? 넌 미래에서 온 조율자구나. 여기는 아카식 지도가 숨겨 둔 *코딩동화숲* 이야.",
          "나는 아직 할머니가 아니야. 모두가 나를 *아리아* 라고 부르던 어린 엘라지.",
          "숲의 시간문은 방문자의 이름을 기억해야 열리는데, 글리치가 이름표 상자를 전부 뒤섞어 버렸어.",
          "걱정 마. 파이썬에서는 값을 담는 작은 상자를 *변수* 라고 불러.",
          "`hero_name = '아리아'` 처럼 이름을 붙이면, 숲도 그 이름을 다시 기억할 수 있어.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "변수 `hero_name` 에 `아리아` 를 담고 `안녕, 아리아!` 를 출력하라.",
        hint: "`hero_name = '아리아'` 를 만든 뒤 f-string 으로 출력해 보세요.",
        languageId: "python",
        starterCode: [
          "# 이름표 상자를 고쳐라",
          "hero_name = \"\"",
          "print(f\"안녕, {hero_name}!\")",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "안녕, 아리아!" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...ARIA,
        lines: [
          "좋아! 숲의 문이 네 이름을 또렷하게 읽었어.",
          "훗날 내가 카이에게 마지막 지도를 건넬 수 있었던 것도, 이렇게 이름을 기억하는 법을 배웠기 때문이야.",
          "변수는 단순한 상자가 아니야. 이야기가 시간 속에서 길을 잃지 않게 붙잡아 주는 표식이지.",
        ],
      },
    ],
  },
  {
    id: "storybook-02",
    realmId: "storybook",
    order: 2,
    title: "어린 리오넬의 비밀문 판별",
    fantasyTitle: "코딩동화 2장 — 「조건문은 갈림길의 등불」",
    summary:
      "훗날 감찰관이 될 어린 리오넬이 조건문으로 진짜 비밀문과 함정을 구분한다.",
    isBoss: false,
    xpReward: 80,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...NOX,
        lines: [
          "쉿. 지금의 나는 무서운 감찰관이 아니야. 친구들이 부르는 이름은 *녹스*.",
          "동화숲 아래에는 세 개의 문이 있어.",
          "왼쪽 문은 과자 냄새, 가운데 문은 바람 소리, 오른쪽 문은 이상하게도 아무 소리도 안 나.",
          "글리치는 조용한 문이 안전하다고 속삭였지만, 나는 반대로 생각해. 너무 조용한 곳은 함정일 때가 많거든.",
          "파이썬의 `if`, `elif`, `else` 는 이런 갈림길에서 판단을 내려 주는 등불이야.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "`door_sound` 가 `바람` 이면 `진짜 문` 을, 아니면 `다시 조사` 를 출력하라.",
        hint: "`if door_sound == '바람':` 조건을 사용하세요.",
        languageId: "python",
        starterCode: [
          "# 녹스가 들은 문소리",
          "door_sound = \"바람\"",
          "",
          "# TODO: 조건문으로 진짜 문을 판별하라",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "진짜 문" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...NOX,
        lines: [
          "정답이야. 바람이 지나가는 문만 숲의 중심으로 이어져.",
          "나중에 내가 엄격한 감찰관이 된 이유도 이것 때문일지 몰라. 규칙은 겁주기 위한 게 아니라, 위험한 문을 피하기 위한 지도니까.",
          "조건문은 정답을 외우는 주문이 아니라, 상황을 보고 선택하는 힘이야.",
        ],
      },
    ],
  },
  {
    id: "storybook-03",
    realmId: "storybook",
    order: 3,
    title: "어린 카엘의 반짝별 수집기",
    fantasyTitle: "코딩동화 3장 — 「반복문은 작은 발걸음을 모은다」",
    summary:
      "훗날 빔킵 검술을 가르칠 어린 카엘이 반복문으로 흩어진 반짝별을 빠르게 모은다.",
    isBoss: false,
    xpReward: 90,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...BOLT,
        lines: [
          "나는 아직 검사부 카엘이 아니야. 수련장 친구들은 나를 *볼트* 라고 불러.",
          "하늘에서 반짝별이 우수수 떨어졌어! 하나씩 줍다간 밤이 끝나 버릴 거야.",
          "이럴 때는 반복문이 필요하지.",
          "`for star in stars` 는 별 주머니를 하나씩 살펴보는 번개 발걸음이야.",
          "그런데 반전이 있어. 글리치가 가짜 별 `0` 을 섞어 놨어. 진짜 별만 더해야 해!",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "리스트 `[3, 0, 5, 0, 2]` 에서 0을 제외한 별의 합 `10` 을 출력하라.",
        hint: "`for star in stars:` 로 순회하고, `if star > 0:` 일 때만 더하세요.",
        languageId: "python",
        starterCode: [
          "stars = [3, 0, 5, 0, 2]",
          "total = 0",
          "",
          "# TODO: 진짜 별만 total 에 더하라",
          "",
          "print(total)",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "10" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...BOLT,
        lines: [
          "번쩍! 진짜 별만 모였어.",
          "훗날 빔킵에서 검술 동작을 반복해서 익히게 되는 것도, 사실 이 별 줍기와 닮았어.",
          "반복문과 조건문이 만나면, 많은 데이터 속에서도 필요한 것만 고를 수 있어.",
        ],
      },
    ],
  },
  {
    id: "storybook-04",
    realmId: "storybook",
    order: 4,
    title: "어린 세렌의 간식 추천 주문",
    fantasyTitle: "코딩동화 4장 — 「딕셔너리는 이름으로 보물을 찾는다」",
    summary:
      "훗날 룬스카의 사서장이 될 어린 세렌이 딕셔너리로 맞춤 간식 추천기를 만든다.",
    isBoss: false,
    xpReward: 110,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...LUMI,
        lines: [
          "어서 와요. 저는 아직 사서장 세렌이 아니옵니다. 친구들이 붙여 준 이름은 *루미* 이지요.",
          "숲 축제가 시작됐는데, 히어로마다 좋아하는 간식이 달라서 줄이 엉망이 됐어.",
          "아리아는 꿀쿠키, 볼트는 번개젤리, 녹스는 달빛푸딩을 좋아하지.",
          "이럴 때 딕셔너리를 쓰면 이름이라는 *열쇠* 로 간식이라는 *보물* 을 바로 찾을 수 있어.",
          "하지만 글리치가 모르는 손님 이름을 넣어도 주문이 깨지면 안 돼. 기본값도 필요해.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "딕셔너리에서 `볼트` 의 간식을 찾아 `볼트에게 번개젤리 추천!` 을 출력하라.",
        hint: "`snacks['볼트']` 또는 `snacks.get('볼트')` 를 사용하세요.",
        languageId: "python",
        starterCode: [
          "snacks = {",
          "    \"아리아\": \"꿀쿠키\",",
          "    \"볼트\": \"번개젤리\",",
          "    \"녹스\": \"달빛푸딩\",",
          "}",
          "hero = \"볼트\"",
          "",
          "# TODO: hero 의 간식을 찾아 추천 문장을 출력하라",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "볼트에게 번개젤리 추천!" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...LUMI,
        lines: [
          "축제 줄이 순식간에 정리됐어.",
          "언젠가 저는 룬스카에서 수많은 룬을 정리하게 되겠지요. 그 첫 연습이 바로 이 간식표였사옵니다.",
          "딕셔너리는 실제 서비스의 사용자 설정, 상품 정보, 게임 아이템표처럼 이름으로 빠르게 찾는 곳에서 자주 쓰여.",
        ],
      },
    ],
  },
  {
    id: "storybook-05",
    realmId: "storybook",
    order: 5,
    title: "어린 카이와 자동 응답 우체국",
    fantasyTitle: "코딩동화 5장 — 「함수는 다시 부를 수 있는 약속」",
    summary:
      "어린 카이가 함수로 숲 우체국의 자동 응답기를 완성하며 미래의 조율자 자질을 드러낸다.",
    isBoss: true,
    xpReward: 180,
    steps: [
      {
        id: "pix-intro",
        kind: "dialogue",
        ...PIX,
        lines: [
          "이상하다. 너를 보면 오래전의 나를 보는 것 같아.",
          "나는 아직 조율자가 아니야. 동화숲 친구들은 나를 *픽스* 라고 불러.",
          "큰일이야! 동화숲 우체국에 편지가 천 통이나 쌓였어.",
          "모든 편지에 직접 답장을 쓰면 축제가 끝나 버릴 거야.",
          "그래서 나는 같은 일을 다시 부를 수 있는 *함수* 를 만들 거야.",
          "함수는 작은 약속이야. 이름을 부르면, 정해 둔 일을 또 해 주지.",
        ],
      },
      {
        id: "glitch-enter",
        kind: "dialogue",
        ...GLITCH,
        lines: [
          "후후, 자동 응답기라니 재미없잖아?",
          "나는 시간책 가장자리의 낙서. 미래의 거울이 되기 전, 카이가 버린 장난기일지도 모르지.",
          "내가 편지 내용을 전부 뒤섞어 버렸어. 손님 이름만 바뀌어도 답장이 자연스럽게 나와야 할걸?",
          "자, 작은 탐험가. 진짜 함수의 힘을 보여줘 봐!",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "함수 `make_reply(name)` 을 만들어 `고마워, <name>!` 을 반환하고, `픽스` 에 대한 답장을 출력하라.",
        hint: "`def make_reply(name): return f'고마워, {name}!'`",
        languageId: "python",
        starterCode: [
          "def make_reply(name):",
          "    # TODO: 이름이 들어간 답장 문장을 반환하라",
          "    pass",
          "",
          "print(make_reply(\"픽스\"))",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "고마워, 픽스!" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...PIX,
        lines: [
          "우체국 자동 응답기가 반짝이며 깨어났어!",
          "변수, 조건문, 반복문, 딕셔너리, 함수가 모두 숲의 일을 도왔지.",
          "글리치도 결국 웃으며 말했어. “미래의 네가 거울을 마주할 때, 이 장난을 기억할까?”",
          "코딩동화숲의 첫 장은 끝났지만, 카이의 파이썬 모험은 여기서 과거와 미래를 잇기 시작했어.",
        ],
      },
    ],
  },
  {
    id: "storybook-06",
    realmId: "storybook",
    order: 6,
    title: "시간 로그를 고르는 한 줄 주문",
    fantasyTitle: "심화 1장 — 「리스트 컴프리헨션은 시간책의 체」",
    summary:
      "어린 세렌 루미가 리스트 컴프리헨션으로 복구된 시간 기록만 골라낸다.",
    isBoss: false,
    xpReward: 140,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...LUMI,
        lines: [
          "시간책의 뒷장들이 열렸사옵니다. 이곳부터는 조금 더 깊은 파이썬을 다룹니다.",
          "글리치가 과거 기록 사이에 깨진 장면을 섞어 두었군요.",
          "실제 서비스에서도 로그, 주문 내역, 사용자 기록 중 필요한 것만 빠르게 골라야 할 때가 많지요.",
          "리스트 컴프리헨션은 그런 순간에 쓰는 *한 줄짜리 체* 이옵니다.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "`fixed` 가 `True` 인 기록의 `name` 만 골라 `엘라,세렌,카이` 를 출력하라.",
        hint:
          "`names = [record['name'] for record in records if record['fixed']]`",
        languageId: "python",
        starterCode: [
          "records = [",
          "    {\"name\": \"엘라\", \"fixed\": True},",
          "    {\"name\": \"글리치\", \"fixed\": False},",
          "    {\"name\": \"세렌\", \"fixed\": True},",
          "    {\"name\": \"카이\", \"fixed\": True},",
          "]",
          "",
          "# TODO: fixed 가 True 인 name 만 골라 names 리스트를 만들라",
          "names = []",
          "print(\",\".join(names))",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "엘라,세렌,카이" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...LUMI,
        lines: [
          "깨진 장면이 걸러졌사옵니다.",
          "데이터가 많아질수록 중요한 건 전부 보는 힘이 아니라, *필요한 것을 정확히 고르는 힘* 이지요.",
        ],
      },
    ],
  },
  {
    id: "storybook-07",
    realmId: "storybook",
    order: 7,
    title: "픽스의 흐르는 페이지",
    fantasyTitle: "심화 2장 — 「제너레이터는 한 번에 다 들지 않는다」",
    summary:
      "어린 카이 픽스가 제너레이터로 거대한 시간책을 조금씩 흘려 읽는다.",
    isBoss: false,
    xpReward: 150,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...PIX,
        lines: [
          "시간책이 너무 커서 한 번에 들 수가 없어.",
          "미래의 신탁들이 글자를 조금씩 흘려 보내듯, 파이썬도 값을 하나씩 꺼내는 방법이 있어.",
          "`yield` 로 만드는 *제너레이터* 야.",
          "전부 메모리에 담지 않고 필요한 만큼만 꺼내니까, 큰 데이터나 스트리밍 응답을 다룰 때 힘을 발휘해.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "제너레이터 `read_pages()` 가 `지도`, `씨앗`, `거울` 을 차례로 내보내게 하고 `지도-씨앗-거울` 을 출력하라.",
        hint:
          "함수 안에서 `yield '지도'`, `yield '씨앗'`, `yield '거울'` 을 차례로 쓰세요.",
        languageId: "python",
        starterCode: [
          "def read_pages():",
          "    # TODO: yield 로 세 페이지를 차례로 내보내라",
          "    pass",
          "",
          "print(\"-\".join(read_pages()))",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "지도-씨앗-거울" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...PIX,
        lines: [
          "페이지가 강물처럼 흘렀어!",
          "제너레이터는 큰 이야기를 작은 호흡으로 나눠 읽게 해 주는 약속이야.",
        ],
      },
    ],
  },
  {
    id: "storybook-08",
    realmId: "storybook",
    order: 8,
    title: "녹스의 검사 인장",
    fantasyTitle: "심화 3장 — 「데코레이터는 함수에 망토를 입힌다」",
    summary:
      "어린 리오넬 녹스가 데코레이터로 기존 함수에 검사 통과 인장을 덧씌운다.",
    isBoss: false,
    xpReward: 170,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...NOX,
        lines: [
          "미래의 나는 모든 주문에 검사 인장을 찍게 될 거야.",
          "그런데 기존 함수를 하나하나 고치면 실수하기 쉽지.",
          "파이썬의 *데코레이터* 는 함수에 망토를 입히는 방법이야.",
          "원래 함수는 그대로 두고, 앞뒤에 인증·로그·권한 검사 같은 일을 덧붙일 수 있어.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "데코레이터 `inspected` 를 완성해 `write_letter()` 결과 앞에 `검사 통과: ` 를 붙여 출력하라.",
        hint:
          "`wrapper()` 안에서 `return '검사 통과: ' + func()` 를 반환하세요.",
        languageId: "python",
        starterCode: [
          "def inspected(func):",
          "    def wrapper():",
          "        # TODO: func() 결과 앞에 검사 통과 문구를 붙여 반환하라",
          "        return func()",
          "    return wrapper",
          "",
          "@inspected",
          "def write_letter():",
          "    return \"시간 편지\"",
          "",
          "print(write_letter())",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "검사 통과: 시간 편지" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...NOX,
        lines: [
          "인장이 찍혔어. 함수의 속마음은 바꾸지 않았는데 행동이 더 안전해졌지.",
          "실제 서버에서도 데코레이터는 로그인 확인, 캐시, 로그 기록 같은 곳에서 자주 쓰여.",
        ],
      },
    ],
  },
  {
    id: "storybook-09",
    realmId: "storybook",
    order: 9,
    title: "아리아의 안전한 서고",
    fantasyTitle: "심화 4장 — 「컨텍스트 매니저는 문을 닫아 준다」",
    summary:
      "어린 엘라 아리아가 `with open(...)` 으로 시간 기록을 안전하게 저장하고 닫는다.",
    isBoss: false,
    xpReward: 170,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...ARIA,
        lines: [
          "시간책 서고의 문은 열기보다 닫기가 더 중요해.",
          "파일도 마찬가지야. 열어 놓고 닫지 않으면 기록이 새거나 다른 주문이 막힐 수 있어.",
          "파이썬의 `with` 는 이런 문을 자동으로 닫아 주는 파수꾼이야.",
          "웹 서비스의 로그 파일, 저장된 설정, 업로드된 문서를 다룰 때 아주 중요한 습관이지.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "`with open(...)` 으로 세 줄을 파일에 저장한 뒤 다시 읽어 `기록: 3줄` 을 출력하라.",
        hint:
          "`with open('time.txt', 'w', encoding='utf-8') as f:` 와 `splitlines()` 를 사용하세요.",
        languageId: "python",
        starterCode: [
          "lines = [\"엘라\", \"세렌\", \"카이\"]",
          "",
          "# TODO: with open 으로 time.txt 에 세 줄을 저장하라",
          "",
          "# TODO: with open 으로 다시 읽고 줄 수를 세라",
          "count = 0",
          "",
          "print(f\"기록: {count}줄\")",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "기록: 3줄" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...ARIA,
        lines: [
          "서고 문이 조용히 닫혔어.",
          "좋은 코드는 일을 끝내는 것뿐 아니라, 쓴 도구를 안전하게 정리하는 법까지 알고 있어.",
        ],
      },
    ],
  },
  {
    id: "storybook-10",
    realmId: "storybook",
    order: 10,
    title: "글리치와 미래 추천기",
    fantasyTitle: "🐉 심화 보스 — 「dataclass 로 운명을 정렬하라」",
    summary:
      "시간 낙서꾼 글리치가 뒤섞은 미래 후보를 dataclass 와 정렬로 복구한다.",
    isBoss: true,
    xpReward: 260,
    steps: [
      {
        id: "glitch-return",
        kind: "dialogue",
        ...GLITCH,
        lines: [
          "짜잔. 다시 만났네, 미래의 조율자.",
          "이번엔 카이의 미래 후보를 몽땅 섞어 버렸어.",
          "어떤 길이 가장 먼저 열려야 하는지 알 수 없다면, 기계 신탁의 탑도 도착하지 못하겠지.",
          "객체를 깔끔하게 담는 `dataclass`, 그리고 기준을 정하는 `sorted` 로 운명을 정렬해 봐!",
        ],
      },
      {
        id: "kai-memory",
        kind: "dialogue",
        ...PIX,
        lines: [
          "미래의 내가 왜 도구를 두려워하지 않았는지 알 것 같아.",
          "복잡한 선택도 작은 데이터 구조로 만들면, 비교하고 정렬할 수 있어.",
          "추천 시스템, 할 일 우선순위, 게임 퀘스트 목록도 결국 이런 원리에서 시작해.",
        ],
      },
      {
        id: "challenge",
        kind: "language",
        briefing:
          "`dataclass` 로 후보를 만들고 점수 높은 순으로 정렬해 첫 이름 `기계 신탁의 탑` 을 출력하라.",
        hint:
          "`@dataclass`, `sorted(paths, key=lambda p: p.score, reverse=True)` 를 사용하세요.",
        languageId: "python",
        starterCode: [
          "from dataclasses import dataclass",
          "",
          "@dataclass",
          "class Path:",
          "    name: str",
          "    score: int",
          "",
          "paths = [",
          "    Path(\"잠든 서고\", 30),",
          "    Path(\"기계 신탁의 탑\", 95),",
          "    Path(\"안개 시장\", 60),",
          "]",
          "",
          "# TODO: score 가 높은 순으로 정렬하고 첫 번째 name 을 출력하라",
        ].join("\n"),
        testCases: [{ stdin: "", expectedStdout: "기계 신탁의 탑" }],
      },
      {
        id: "outro",
        kind: "dialogue",
        ...GLITCH,
        lines: [
          "으음, 운명이 다시 정렬됐네.",
          "좋아. 네가 미래에 거울을 마주해도, 적어도 데이터가 뒤섞여서 지는 일은 없겠어.",
          "시간책이 닫힌다. 어린 카이의 길은 이제 신탁의 탑을 향해 이어진다.",
        ],
      },
    ],
  },
];
