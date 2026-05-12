import type { Mission } from "@/types/mission";

const ELLA = { speaker: "엘라 할머니", emoji: "🧓" };
const LIONEL = { speaker: "감찰관 리오넬", emoji: "🪖" };
const KAI = { speaker: "견습생 카이", emoji: "🧑" };

/**
 * 잿빛 황무지 (Greywhell) — 튜토리얼 prologue.
 *
 * 카이가 마을을 도망쳐 절벽 끝에 다다르는 도입부.
 * 3 미션: 엘라의 가르침 + 리오넬의 추격 + 절벽 끝 결단.
 *
 * NPC: 엘라 (멘토), 리오넬 (적대자), 카이 본인 (서사적 자아).
 * 평가기는 모두 terminal — 가장 기초적인 명령으로 *학습 부담 0* 의 도입.
 */
export const WASTELAND_MISSIONS: readonly Mission[] = [
  {
    id: "wasteland-01",
    realmId: "wasteland",
    order: 1,
    title: "마지막 가르침 — pwd",
    fantasyTitle: "프롤로그 1장 — 「자신의 자리를 노래하라」",
    summary: "엘라 할머니가 마지막 가르침을 남긴다.",
    isBoss: false,
    xpReward: 30,
    steps: [
      {
        id: "ella-intro",
        kind: "dialogue",
        ...ELLA,
        lines: [
          "카이야, 잘 들으렴.",
          "오늘이 *선별의 날* 이다. 감찰관들이 도착하기 전에 — 그대를 보내야 한다.",
          "이 잿빛 황무지에서 살아남은 자만이 *멀리 갈 자격* 이 있다.",
          "첫 가르침은 가장 단순한 것 — *자신이 어디 서 있는지* 를 아는 주문 `pwd` 다.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing: "엘라가 가르쳐준 첫 주문 `pwd` 를 시전하라.",
        hint: "`pwd` 한 글자.",
        initialFs: {
          "/wasteland": null,
          "/wasteland/hut": null,
          "/wasteland/hut/ella-notes.txt": "아카식의 지도",
        },
        initialCwd: "/wasteland/hut",
        successWhen: { type: "commandUsed", command: "pwd" },
      },
      {
        id: "ella-outro",
        kind: "dialogue",
        ...ELLA,
        lines: [
          "잘 했다. 그대는 *자신의 자리* 를 안다.",
          "이제 — 들어라. 발걸음 소리가 가까워진다.",
        ],
      },
    ],
  },

  {
    id: "wasteland-02",
    realmId: "wasteland",
    order: 2,
    title: "지도를 찾아라 — ls -a",
    fantasyTitle: "프롤로그 2장 — 「숨겨진 룬을 비추어라」",
    summary: "엘라가 숨겨둔 아카식의 지도를 찾아내라.",
    isBoss: false,
    xpReward: 40,
    steps: [
      {
        id: "ella-mid",
        kind: "dialogue",
        ...ELLA,
        lines: [
          "내 오두막 어딘가에 — *아카식의 지도* 가 숨겨져 있다.",
          "보이는 것만 비추는 자에겐 보이지 않지.",
          "`ls -a` 로 *숨겨진 것까지* 비추어라. 출력에 `.akashic-map` 이 나타나면 됐다.",
        ],
      },
      {
        id: "challenge",
        kind: "terminal",
        briefing:
          "`ls -a` 로 숨김 파일까지 모두 비추어라. 출력에 `.akashic-map` 이 보이면 통과.",
        hint: "`ls -a` 한 줄.",
        initialFs: {
          "/wasteland/hut": null,
          "/wasteland/hut/ella-notes.txt": "엘라의 메모",
          "/wasteland/hut/.akashic-map": "셸홀름 → 빔킵 → 룬스카 → 기계 신탁의 탑",
        },
        initialCwd: "/wasteland/hut",
        successWhen: { type: "lastOutputMatches", pattern: "\\.akashic-map" },
      },
      {
        id: "ella-final",
        kind: "dialogue",
        ...ELLA,
        lines: [
          "찾았다. 이 지도가 그대의 길잡이가 될 것이다.",
          "이제 — 도망쳐야 한다.",
        ],
      },
    ],
  },

  {
    id: "wasteland-03",
    realmId: "wasteland",
    order: 3,
    title: "절벽 끝의 선택",
    fantasyTitle: "프롤로그 3장 — 「뛰어내려라, 견습생이여」",
    summary: "감찰관 리오넬의 추격 — 절벽 끝에서의 결단.",
    isBoss: true,
    xpReward: 80,
    steps: [
      {
        id: "lionel-enter",
        kind: "dialogue",
        ...LIONEL,
        lines: [
          "거기 멈춰라, *낙인 찍힌 놈*!",
          "그 가슴의 자색 룬 — *공허의 낙인* 이다. 아에토리아의 수치다.",
          "도망쳐도 소용없다. 절벽 끝이 곧이다.",
        ],
      },
      {
        id: "kai-resolve",
        kind: "dialogue",
        ...KAI,
        lines: [
          "(엘라 할머니의 마지막 빛이 등 뒤에서 터졌다.)",
          "아카식의 지도가 — 가슴팍의 룬과 *공명* 한다.",
          "이대로 잡힐 순 없다. 절벽 너머 — *잊혀진 신전* 으로 가는 길이 있다.",
        ],
      },
      {
        id: "escape",
        kind: "terminal",
        briefing:
          "엘라의 두루마리 `.akashic-map` 을 안전한 `/escape` 디렉토리로 옮겨라. (mkdir → mv 의 두 단계 가능)",
        hint: "`mkdir /escape` → `mv /wasteland/hut/.akashic-map /escape/.akashic-map`.",
        initialFs: {
          "/wasteland/hut": null,
          "/wasteland/hut/.akashic-map":
            "셸홀름 → 빔킵 → 룬스카 → 기계 신탁의 탑",
        },
        initialCwd: "/wasteland/hut",
        successWhen: {
          type: "all",
          checks: [
            { type: "fsHasFile", path: "/escape/.akashic-map" },
            { type: "fsMissingPath", path: "/wasteland/hut/.akashic-map" },
          ],
        },
      },
      {
        id: "lionel-defeat",
        kind: "dialogue",
        ...LIONEL,
        lines: [
          "…놓쳤다고?",
          "절벽 아래로… 떨어진 것 같지만, 시체가 없다.",
          "그 낙인이 — 살아남은 것이다. 추격은 끝나지 않았다.",
        ],
      },
      {
        id: "system-awaken",
        kind: "dialogue",
        speaker: "공허 조율 시스템",
        speakerEmoji: "✨",
        lines: [
          "*띠리리링!*",
          "[ 특수 조건 '벼랑 끝의 각성' 이 달성되었습니다. ]",
          "[ '공허 조율 시스템' 이 활성화되었습니다. ]",
          "[ 첫 번째 대륙 — 셸홀름 항구 — 가 그대 앞에 열립니다. ]",
        ],
      },
    ],
  },
];
