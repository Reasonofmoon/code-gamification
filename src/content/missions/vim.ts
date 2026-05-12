import type { Mission } from "@/types/mission";

const KAEL = { speaker: "검사부 카엘", emoji: "⚔️" };
const ALPHA = { speaker: "글자드래곤 알파베타스", emoji: "🐉" };

/**
 * 빔킵 18 미션 — 멀티스텝 시나리오.
 * NPC: 검사부 카엘 (Kael the swordmaster) — 절제된 단호함, 검의 비유.
 * 보스: 글자드래곤 알파베타스 (Alphabetas) — 학식 있는 거만한 드래곤.
 */
export const VIM_MISSIONS: readonly Mission[] = [
  // ─── Chapter 1: 기본 보법 ──────────────────────────────────────
  {
    id: "vimkeep-01",
    realmId: "vimkeep",
    order: 1,
    title: "기본 보법 — hjkl",
    fantasyTitle: "검술 1식 — 「네 방향의 걸음」",
    summary: "카엘이 검을 들기 전 네 방향의 걸음을 가르친다.",
    isBoss: false,
    xpReward: 60,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "그대가 셸홀름에서 왔다는 견습생인가.",
          "이곳 빔킵에서는 *명령어가 곧 검술* 이다. 명심하라.",
          "검을 들기 전 네 방향의 걸음부터 익혀야 한다. `h` 왼쪽, `j` 아래, `k` 위, `l` 오른쪽.",
          "Normal 모드 — 검사의 *기본 자세* 다. 화살표 키는 잊어라.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing:
          "Normal 모드에서 `h j k l` 로만 커서를 움직여라. 마지막 줄 끝에 `END` 를 입력 모드로 추가하라.",
        hint: "`j` 로 내려가고 `$` 또는 `l` 로 끝까지, `a` 로 입력 모드 진입, 다 쓰면 Esc.",
        initialText: ["첫 줄", "둘째 줄", "셋째 줄: 여기 끝에 END 를 붙여라"].join("\n"),
        targetText: ["첫 줄", "둘째 줄", "셋째 줄: 여기 끝에 END 를 붙여라 END"].join("\n"),
        parThreeStars: 10,
        parTwoStars: 18,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "걸음을 익혔군. 첫 검사로서의 자격이다.",
          "다음엔 *베는 법* 을 배운다.",
        ],
      },
    ],
  },

  {
    id: "vimkeep-02",
    realmId: "vimkeep",
    order: 2,
    title: "베기 — dd",
    fantasyTitle: "검술 2식 — 「한 줄을 베다」",
    summary: "한 음절로 한 줄을 베는 가장 기본의 검술.",
    isBoss: false,
    xpReward: 60,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "이제 *베는* 법이다.",
          "`dd` — 두 음절. 한 줄을 *통째로* 베어낸다.",
          "다만 명심하라 — 무엇을 베어야 할지 *분별하는* 것이 더 어려운 일이다.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing:
          "쓸데없이 끼어든 두 번째 줄을 통째로 베어내라. `dd` 한 번이면 충분하다.",
        hint: "두 번째 줄에 커서를 두고 `dd`.",
        initialText: ["검의 가르침", "이 줄은 사라져야 한다", "현자의 마지막 말"].join("\n"),
        targetText: ["검의 가르침", "현자의 마지막 말"].join("\n"),
        parThreeStars: 4,
        parTwoStars: 8,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "잘 베었다.",
          "허나 `dd` 가 강한 검술이라는 건… *되돌릴 수 있어서* 다. `u` 를 잊지 마라.",
        ],
      },
    ],
  },

  {
    id: "vimkeep-03",
    realmId: "vimkeep",
    order: 3,
    title: "단어 보법 — w · b · e",
    fantasyTitle: "검술 3식 — 「단어를 가르는 걸음」",
    summary: "한 글자씩 걷는 것보다 단어를 가르는 걸음이 빠르다.",
    isBoss: false,
    xpReward: 65,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "한 걸음씩 걷는 자는 늦다.",
          "`w` 는 다음 단어로, `b` 는 이전 단어로, `e` 는 단어의 *끝* 으로.",
          "그리고 — `dw` 는 *단어 단위* 의 베기다.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing:
          "세 번째 단어 `체리` 를 베어내라. `w` 와 `dw` 를 조합.",
        hint: "줄 첫머리에서 `w w d w`. 마지막 `dw` 는 단어 + 뒤 공백을 함께 베어준다.",
        initialText: "사과 바나나 체리 두리안 망고",
        targetText: "사과 바나나 두리안 망고",
        parThreeStars: 4,
        parTwoStars: 8,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "이제 그대는 *단어를 본다*.",
          "다음엔 *줄 전체* 의 양 끝을 보게 될 것이다.",
        ],
      },
    ],
  },

  {
    id: "vimkeep-04",
    realmId: "vimkeep",
    order: 4,
    title: "줄의 양 끝 — 0 · $",
    fantasyTitle: "검술 4식 — 「줄의 시작과 끝을 동시에 베다」",
    summary: "한 줄의 양 끝에 한순간에 닿는 검술.",
    isBoss: false,
    xpReward: 70,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "검의 양 날을 모두 쓰는 자세다.",
          "`0` — 줄의 첫 자리. `$` — 줄의 끝.",
          "Insert 모드와 합치면: `I` 는 줄 처음에서 입력, `A` 는 줄 끝에서 입력.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing:
          "한 줄의 양 끝에 봉인구 `[`, `]` 를 더하라.",
        hint: "`I [` Esc `$ a ]` Esc.",
        initialText: "고요한 새벽",
        targetText: "[고요한 새벽]",
        parThreeStars: 10,
        parTwoStars: 18,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: ["봉인이 양 끝에 새겨졌다. 그대의 줄은 이제 한 문장이 되었다."],
      },
    ],
  },

  {
    id: "vimkeep-05",
    realmId: "vimkeep",
    order: 5,
    title: "파일의 양 끝 — gg · G",
    fantasyTitle: "검술 5식 — 「전장의 두 끝을 동시에 봉인하라」",
    summary: "파일 맨 위와 맨 아래를 한순간에 짚는 비전.",
    isBoss: false,
    xpReward: 70,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "파일 전체가 전장이라면, `gg` 는 진영 앞, `G` 는 진영 뒤.",
          "*어디든 한순간에 닿는* 비전이다.",
          "`O` 는 위에 새 줄, `o` 는 아래에 새 줄을 만들며 Insert 진입.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing:
          "첫 줄 위에 `HEAD`, 마지막 줄 아래에 `FOOT` 줄을 추가하라.",
        hint: "`gg O HEAD` Esc `G o FOOT` Esc.",
        initialText: ["선언", "두 번째", "세 번째", "네 번째", "결의"].join("\n"),
        targetText: ["HEAD", "선언", "두 번째", "세 번째", "네 번째", "결의", "FOOT"].join("\n"),
        parThreeStars: 14,
        parTwoStars: 24,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: ["전장의 두 끝이 그대 손에 있다."],
      },
    ],
  },

  {
    id: "vimkeep-06",
    realmId: "vimkeep",
    order: 6,
    title: "줄 번호로 도약 — :{n}",
    fantasyTitle: "검술 6식 — 「번호를 외치고 그곳으로 날아라」",
    summary: "정확한 좌표를 외쳐 그곳으로 직행하는 비전.",
    isBoss: false,
    xpReward: 65,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "지도가 손에 있다면 *좌표* 만 외쳐도 된다.",
          "`:5` 그리고 Enter — 5번째 줄로 즉시 점프.",
          "콜론으로 시작하는 명령은 *명령 라인 모드* — 검사의 가장 강력한 입.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing: "5번째 줄로 점프 후 그 줄을 베어라.",
        hint: "`:5` Enter 후 `dd`.",
        initialText: [
          "1번 줄",
          "2번 줄",
          "3번 줄",
          "4번 줄",
          "5번 줄 — 베야 한다",
          "6번 줄",
          "7번 줄",
        ].join("\n"),
        targetText: ["1번 줄", "2번 줄", "3번 줄", "4번 줄", "6번 줄", "7번 줄"].join("\n"),
        parThreeStars: 6,
        parTwoStars: 12,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "Chapter 1 을 마쳤다. 그대는 이제 *기본 보법* 의 검사다.",
          "다음 Chapter — *베기와 다듬기* 로 들어간다.",
        ],
      },
    ],
  },

  // ─── Chapter 2: 베기·다듬기 ─────────────────────────────────────
  {
    id: "vimkeep-07",
    realmId: "vimkeep",
    order: 7,
    title: "Insert 진입 — i · a · o",
    fantasyTitle: "검술 7식 — 「입력의 세 문」",
    summary: "베기만이 검술이 아니다. 새로 그어내는 것도 검술.",
    isBoss: false,
    xpReward: 70,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "베는 것만이 검술이 아니다.",
          "`i` — 커서 왼쪽에서 입력. `a` — 오른쪽에서. `o` — 아래에 새 줄.",
          "그대는 이제 *지우는 자* 이자 *그리는 자* 다.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing:
          "두 줄 사이에 `중간 줄` 한 줄을 끼워 넣어라.",
        hint: "첫 줄에서 `o 중간 줄` Esc.",
        initialText: ["위 줄", "아래 줄"].join("\n"),
        targetText: ["위 줄", "중간 줄", "아래 줄"].join("\n"),
        parThreeStars: 8,
        parTwoStars: 16,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: ["새 줄이 두 줄 사이를 꿰뚫었군. 좋은 자세다."],
      },
    ],
  },

  {
    id: "vimkeep-08",
    realmId: "vimkeep",
    order: 8,
    title: "글자·단어 베기 — x · dw",
    fantasyTitle: "검술 8식 — 「작은 베기와 큰 베기」",
    summary: "베기에는 크기가 있다. 글자, 단어, 줄.",
    isBoss: false,
    xpReward: 75,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "베기에도 *크기* 가 있다.",
          "`x` 는 한 글자, `dw` 는 단어 하나, `dd` 는 줄 통째.",
          "필요한 크기를 *정확히* 선택하는 것 — 그것이 검사의 절제다.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing:
          "줄 끝의 오타 `X` 를 떼어내고, 둘째 줄을 통째 베어라.",
        hint: "`$ x` 로 끝의 글자, `j dd` 로 다음 줄 삭제.",
        initialText: ["청검의 기록X", "여기는 함정이다", "마지막 자취"].join("\n"),
        targetText: ["청검의 기록", "마지막 자취"].join("\n"),
        parThreeStars: 6,
        parTwoStars: 12,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: ["세 가지 베기를 자유로이 쓸 수 있군. 진보다."],
      },
    ],
  },

  {
    id: "vimkeep-09",
    realmId: "vimkeep",
    order: 9,
    title: "변경 — cw",
    fantasyTitle: "검술 9식 — 「베고 다시 그어라」",
    summary: "한 호흡에 두 가지 일 — 검의 효율.",
    isBoss: false,
    xpReward: 75,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "베고 다시 그리는 한 호흡의 검술이 있다.",
          "`cw` — 단어를 베며 *즉시* Insert 모드로 들어간다.",
          "한 동작에 두 가지 일 — *검의 효율* 이다.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing: "`old` 를 `new` 로 갈아라.",
        hint: "단어 첫 글자에서 `cw new` Esc.",
        initialText: "this is old word",
        targetText: "this is new word",
        parThreeStars: 7,
        parTwoStars: 14,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: ["베고 *동시에* 그리는 자세. 좋다."],
      },
    ],
  },

  {
    id: "vimkeep-10",
    realmId: "vimkeep",
    order: 10,
    title: "복사·붙여넣기 — yy · p",
    fantasyTitle: "검술 10식 — 「자취를 새기고 다시 그리다」",
    summary: "좋은 동작은 반복할 가치가 있다.",
    isBoss: false,
    xpReward: 75,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "좋은 동작은 *반복할 가치* 가 있다.",
          "`yy` 는 줄을 새기고 (*yank*), `p` 는 새긴 것을 다시 둔다 (*put*).",
          "자취를 남기는 자가 길을 만든다.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing: "첫 줄을 복제해 두 줄로 만들어라.",
        hint: "첫 줄에서 `yy p`.",
        initialText: ["반복할 가치 있는 말", "다른 줄"].join("\n"),
        targetText: ["반복할 가치 있는 말", "반복할 가치 있는 말", "다른 줄"].join("\n"),
        parThreeStars: 3,
        parTwoStars: 6,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: ["자취가 둘이 되었다. 한 자취가 두 곳에 존재한다."],
      },
    ],
  },

  {
    id: "vimkeep-11",
    realmId: "vimkeep",
    order: 11,
    title: "되돌리기·반복 — u · .",
    fantasyTitle: "검술 11식 — 「과거를 지우고 한 동작을 부르다」",
    summary: "실수도 검술의 일부. 직전을 부르는 자만이 빠르다.",
    isBoss: false,
    xpReward: 80,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "실수도 검술의 일부다.",
          "`u` 는 직전 동작을 *되돌린다*. `.` 은 직전 동작을 *다시 부른다*.",
          "직전을 *부르는* 자만이 빠르게 싸운다.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing:
          "한 번 `dd` 후 `.` 두 번으로 위 세 줄을 베어라. 총 4 키.",
        hint: "`dd . .`. 검술이 *반복* 으로 압축된다.",
        initialText: ["삭제1", "삭제2", "삭제3", "유지1", "유지2"].join("\n"),
        targetText: ["유지1", "유지2"].join("\n"),
        parThreeStars: 4,
        parTwoStars: 8,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "Chapter 2 를 마쳤다. 베고 다듬는 자세가 그대의 것이 되었다.",
          "다음 Chapter — *비주얼과 정밀 모션*. 더 큰 범위, 더 정확한 표적.",
        ],
      },
    ],
  },

  // ─── Chapter 3: 비주얼·정밀 모션 ──────────────────────────────
  {
    id: "vimkeep-12",
    realmId: "vimkeep",
    order: 12,
    title: "비주얼 — V · 라인 선택",
    fantasyTitle: "검술 12식 — 「선을 그어 베다」",
    summary: "한 줄이 아니라 선을 그어 베라.",
    isBoss: false,
    xpReward: 85,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "한 줄이 아니라 *선* 을 그어 베라.",
          "`V` — 라인 단위 비주얼 모드. `j` 로 선을 확장한다.",
          "그 다음 `d` — 선이 그어진 모든 줄이 한 호흡에 사라진다.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing:
          "가운데 세 줄을 비주얼 선택해 한 번에 삭제.",
        hint: "둘째 줄에서 `V 2j d`.",
        initialText: ["유지1", "삭제A", "삭제B", "삭제C", "유지2"].join("\n"),
        targetText: ["유지1", "유지2"].join("\n"),
        parThreeStars: 5,
        parTwoStars: 10,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: ["선을 그어 베면 *여러 줄이 한 호흡*에 사라진다. 큰 검술."],
      },
    ],
  },

  {
    id: "vimkeep-13",
    realmId: "vimkeep",
    order: 13,
    title: "문자 점프 — f · t",
    fantasyTitle: "검술 13식 — 「표적을 보고 단숨에」",
    summary: "그대의 눈이 검보다 빠르다.",
    isBoss: false,
    xpReward: 85,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "표적을 *보고* 그곳에 닿는다.",
          "`f{글자}` — 그 글자 위로 날아간다. `t{글자}` — 그 글자 *직전* 까지.",
          "그대의 눈이 검보다 빠르다.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing: "`d` 를 찾아 한 글자만 잘라내라.",
        hint: "줄 시작에서 `f d x`.",
        initialText: "abcdefghij",
        targetText: "abcefghij",
        parThreeStars: 3,
        parTwoStars: 6,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: ["표적을 본 즉시 베었다. 좋은 눈이다."],
      },
    ],
  },

  {
    id: "vimkeep-14",
    realmId: "vimkeep",
    order: 14,
    title: "괄호 매칭 — %",
    fantasyTitle: "검술 14식 — 「쌍을 단숨에 베다」",
    summary: "쌍을 보는 눈은 코드의 구조를 본다.",
    isBoss: false,
    xpReward: 90,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "쌍은 *한 호흡* 으로 베라.",
          "`%` — 짝지어진 괄호 사이를 점프한다. `( )`, `[ ]`, `{ }`.",
          "쌍을 보는 눈은 *코드의 구조* 를 본다.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing: "함수 본문을 통째 베고 `{}` 만 남겨라.",
        hint: "`{` 위에서 `v % d`.",
        initialText: ["function quest() {", "  treasure();", "  fight();", "}"].join("\n"),
        targetText: ["function quest() {", "}"].join("\n"),
        parThreeStars: 6,
        parTwoStars: 14,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: ["그대는 이제 *형식* 을 본다."],
      },
    ],
  },

  {
    id: "vimkeep-15",
    realmId: "vimkeep",
    order: 15,
    title: "들여쓰기 — >> · <<",
    fantasyTitle: "검술 15식 — 「자세를 한 칸 옮겨라」",
    summary: "단정한 자세는 좋은 검사의 첫 조건.",
    isBoss: false,
    xpReward: 80,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "자세를 한 칸 옮기는 검술.",
          "`>>` — 줄 들여쓰기. `<<` — 풀기. 비주얼과 합치면: `V G >`.",
          "*단정한 자세* 는 좋은 검사의 첫 조건.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing: "모든 줄을 한 단계 들여쓰라.",
        hint: "`gg V G >`.",
        initialText: ["heading", "line 1", "line 2"].join("\n"),
        targetText: ["  heading", "  line 1", "  line 2"].join("\n"),
        parThreeStars: 5,
        parTwoStars: 12,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "Chapter 3 가 끝났다.",
          "다음 Chapter — *매크로와 검색치환*. 한 동작이 *수많은 줄* 을 다스리는 비전.",
        ],
      },
    ],
  },

  // ─── Chapter 4: 매크로·검색치환 ──────────────────────────────
  {
    id: "vimkeep-16",
    realmId: "vimkeep",
    order: 16,
    title: "매크로 — q · @",
    fantasyTitle: "검술 16식 — 「한 동작을 사역마로 부리다」",
    summary: "한 동작을 사역마로 부리는 반복의 검술.",
    isBoss: false,
    xpReward: 100,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "한 동작을 *사역마* 로 부리는 검술이 있다.",
          "`qa` — 매크로 `a` 녹화 시작. 동작 수행. `q` — 녹화 종료.",
          "`@a` — 재생. `4@a` — 네 번 반복.",
          "이걸 익히면 *다른 자가 한 시간 걸리는 일을 그대는 한 호흡에 끝낸다*.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing:
          "모든 줄의 `) ` 를 `] ` 로 매크로로 바꿔라.",
        hint: "첫 줄에서 `qa f) r] j0 q` 후 `4@a`.",
        initialText: ["1) one", "2) two", "3) three", "4) four", "5) five"].join("\n"),
        targetText: ["1] one", "2] two", "3] three", "4] four", "5] five"].join("\n"),
        parThreeStars: 22,
        parTwoStars: 45,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: ["사역마가 그대의 명령에 응했다. 큰 검술을 익혔군."],
      },
    ],
  },

  {
    id: "vimkeep-17",
    realmId: "vimkeep",
    order: 17,
    title: "검색치환 — :%s/old/new/g",
    fantasyTitle: "검술 17식 — 「룬을 새 룬으로 바꿔라」",
    summary: "수많은 룬을 동시에 다듬는 비전.",
    isBoss: false,
    xpReward: 100,
    steps: [
      {
        id: "intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "수많은 룬을 *동시에* 다듬는 비전.",
          "`:%s/old/new/g<Enter>` — 파일 전체에서 `old` 를 `new` 로 모두 치환.",
          "이걸 익히면 그대 앞에 한 명의 적이 남는다 — *글자의 드래곤*.",
        ],
      },
      {
        id: "challenge",
        kind: "vim",
        briefing: "텍스트 안의 모든 `검` 을 `룬` 으로 바꿔라.",
        hint: "`:%s/검/룬/g` Enter.",
        initialText: ["검의 길은 멀다", "또 다른 검의 흔적", "검은 침묵한다"].join("\n"),
        targetText: ["룬의 길은 멀다", "또 다른 룬의 흔적", "룬은 침묵한다"].join("\n"),
        parThreeStars: 16,
        parTwoStars: 28,
      },
      {
        id: "outro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "Chapter 4 — 완.",
          "준비하라. 다음은 그대가 마주칠 첫 *드래곤* 이다.",
          "이름은 *알파베타스* — 글자의 처음과 끝을 자처하는 자.",
        ],
      },
    ],
  },

  // ─── Chapter 5: 보스 (6 step) ────────────────────────────────
  {
    id: "vimkeep-18",
    realmId: "vimkeep",
    order: 18,
    title: "드래곤의 글자 미궁",
    fantasyTitle: "🐉 보스 — 「용의 비문을 정화하라」",
    summary: "글자드래곤 알파베타스가 검사부와 대치한다. 두 단계의 도전.",
    isBoss: true,
    xpReward: 250,
    steps: [
      {
        id: "kael-intro",
        kind: "dialogue",
        ...KAEL,
        lines: [
          "저기 — 동굴 입구. 그가 나왔군.",
          "*알파베타스* — 글자의 처음과 끝을 자처하는 드래곤.",
          "그의 비문에는 모든 줄에 *불필요한 접두사* 가 달려 있다.",
          "그대가 배운 모든 검술을 시험하는 자리다.",
        ],
      },
      {
        id: "boss-enter",
        kind: "dialogue",
        ...ALPHA,
        lines: [
          "흠… 검사부 카엘이 또 한 명의 견습생을 데려왔군.",
          "내 이름은 *알파베타스* — 글자의 처음과 끝.",
          "내 비문을 보아라. 모든 줄에 `STATUS:` 라는 접두사가 새겨져 있지.",
          "그대가 이걸 *한 줄이라도 정화* 할 수 있는지 보겠다.",
        ],
      },
      {
        id: "challenge-1",
        kind: "vim",
        briefing:
          "1단계: 첫 줄에서 `STATUS: ` 접두사를 제거하라. (한 줄만 처리)",
        hint:
          "방법은 여럿. `0 d w` 로 단어와 콜론 함께 베고, 남은 공백은 `x`. 또는 검색치환 `:s/^STATUS: //`.",
        initialText: "STATUS: 잠자기",
        targetText: "잠자기",
        parThreeStars: 8,
        parTwoStars: 16,
      },
      {
        id: "boss-mid",
        kind: "dialogue",
        ...ALPHA,
        lines: [
          "한 줄을 정화했다고? 우연이겠지.",
          "그러나 *모든 줄을 한 호흡에* 정화하지는 못할 것이다.",
          "이번엔 네 줄 모두 — 한 명령으로. 자, 시도해보아라.",
        ],
      },
      {
        id: "challenge-2",
        kind: "vim",
        briefing:
          "2단계: 네 줄 모두에서 `STATUS: ` 를 *한 명령으로* 제거하라.",
        hint: "`:%s/^STATUS: //g` Enter.",
        initialText: [
          "STATUS: 잠자기",
          "STATUS: 검술 연마",
          "STATUS: 보스 격파",
          "STATUS: 룬 해독",
        ].join("\n"),
        targetText: ["잠자기", "검술 연마", "보스 격파", "룬 해독"].join("\n"),
        parThreeStars: 20,
        parTwoStars: 40,
      },
      {
        id: "boss-defeat",
        kind: "dialogue",
        ...ALPHA,
        lines: [
          "…내 비문이… 정화되었다.",
          "글자의 처음과 끝 — 그것을 *그대가 다스린다*는 말인가.",
          "좋다, 견습생. 그대의 이름을 기억하겠다.",
          "다음 대륙으로 가라. *룬스카* — *아카식 레코드의 한 분관* 이라 전해지는 도서관으로.",
          "그곳의 *공허의 제단* 에서… 진짜 시험이 그대를 기다린다.",
        ],
      },
    ],
  },
];
