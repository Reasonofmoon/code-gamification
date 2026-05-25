import type { RealmId } from "@/types/mission";

export type StoryArcNode = {
  realmId: RealmId;
  chapter: string;
  title: string;
  role: string;
  bridgeFrom: string;
  bridgeTo: string;
};

export const WORLD_STORY_ARC: readonly StoryArcNode[] = [
  {
    realmId: "wasteland",
    chapter: "Prologue",
    title: "지도를 받은 견습생",
    role: "카이가 잿빛 황무지에서 살아남으며 명령의 기본 감각을 얻는다.",
    bridgeFrom: "아무것도 모르는 도망자",
    bridgeTo: "이름과 기억을 되찾기 위해 코딩동화숲으로 향한다.",
  },
  {
    realmId: "storybook",
    chapter: "Memory",
    title: "어린 동료들의 시간책",
    role: "변수, 조건, 반복, 리스트, 함수가 훗날 동료들의 성격과 연결된다.",
    bridgeFrom: "잃어버린 이름과 어린 시절의 단서",
    bridgeTo: "기록을 저장하고 되돌리는 힘을 찾아 기원의 대장간으로 향한다.",
  },
  {
    realmId: "forge-of-origin",
    chapter: "Record",
    title: "시간을 단조하는 Git",
    role: "커밋, 브랜치, 원격 저장소로 실수와 복구를 다루는 법을 배운다.",
    bridgeFrom: "흩어진 기억을 순서 있는 기록으로 묶는 법",
    bridgeTo: "기록을 협업 가능한 도구로 확장하기 위해 신탁의 탑으로 향한다.",
  },
  {
    realmId: "shellholm",
    chapter: "Shell",
    title: "주문을 정확히 말하는 항구",
    role: "터미널 명령과 파일 조작을 반복해 손에 익힌다.",
    bridgeFrom: "대장간에서 배운 작업터 감각",
    bridgeTo: "정확한 입력 습관을 빔킵의 모션 수련으로 가져간다.",
  },
  {
    realmId: "vimkeep",
    chapter: "Motion",
    title: "움직임을 줄이는 검술",
    role: "편집 동작을 짧고 정확하게 반복하며 숙련도를 쌓는다.",
    bridgeFrom: "터미널에서 얻은 명령 감각",
    bridgeTo: "코드 구조를 읽고 고치는 룬스카의 훈련으로 이어진다.",
  },
  {
    realmId: "runescar",
    chapter: "Language",
    title: "룬으로 로직을 쓰는 도서관",
    role: "문법과 자료 구조를 실제 문제 해결의 언어로 연결한다.",
    bridgeFrom: "동화숲과 빔킵에서 익힌 표현과 반복",
    bridgeTo: "AI 시대 도구를 판단하는 기계 신탁의 탑으로 향한다.",
  },
  {
    realmId: "oracle-tower",
    chapter: "Oracle",
    title: "도구를 다루는 조율자",
    role: "AI, CLI, API 도구를 승인과 검증이 있는 작업 흐름으로 묶는다.",
    bridgeFrom: "Git 기록과 코드 언어를 함께 다루는 힘",
    bridgeTo: "거울의 카이와 마주하며 전체 여정을 하나의 습관으로 완성한다.",
  },
] as const;

export function getStoryArcNode(realmId: RealmId): StoryArcNode {
  const node = WORLD_STORY_ARC.find((item) => item.realmId === realmId);
  if (!node) throw new Error(`Missing story arc node: ${realmId}`);
  return node;
}
