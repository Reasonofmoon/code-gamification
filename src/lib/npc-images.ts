/**
 * NPC 이름 ↔ 초상화 파일 매핑.
 *
 * 자산 파일이 public/npc/<id>.png 에 있으면 그 경로를 반환,
 * 없으면 null (DialoguePanel 이 이모지로 fallback).
 *
 * 자산이 점진적으로 추가될 때 코드 변경 없이 즉시 활성화됩니다.
 */
const NPC_NAME_TO_ID: Record<string, string> = {
  "늙은 항해사 모르간": "morgan",
  "부두 도적 카르고스": "cargos",
  "검사부 카엘": "kael",
  "글자드래곤 알파베타스": "alphabetas",
  "사서장 세렌": "seren",
  "아카식의 시험관 코덱스": "codex",
  // Wave 2 — 스토리 확장 (잿빛 황무지 + 도입 인물)
  "견습생 카이": "kai",
  "엘라 할머니": "ella",
  "감찰관 리오넬": "lionel",
  // Wave 3 — Oracle Tower (AI 시대 트랙)
  "기계 신탁 사서 메모리아": "memoria",
  "거울의 카이": "mirror-kai",
  // Wave 4 — Storybook Grove (아카식 시간책)
  "어린 엘라 아리아": "young-ella-aria",
  "어린 리오넬 녹스": "young-lionel-nox",
  "어린 카엘 볼트": "young-kael-bolt",
  "어린 세렌 루미": "young-seren-lumi",
  "어린 카이 픽스": "young-kai-pix",
  "시간 낙서꾼 글리치": "glitch",
};

export function npcImageFor(speaker: string): string | null {
  const id = NPC_NAME_TO_ID[speaker];
  return id ? `/npc/${id}.png` : null;
}

/** Realm id → 배경 일러스트 파일. 동일하게 fallback nullable. */
export function realmImageFor(realmId: string): string {
  return `/realm/${realmId}.png`;
}

export const WORLDMAP_IMAGE = "/worldmap/akashic-map.png";

/** Wave 2 — 풍경 자산. 부재해도 안전 (onError fallback 패턴). */
export const WASTELAND_IMAGE = "/realm/wasteland.png";
export const VOID_ALTAR_IMAGE = "/realm/void-altar.png";
