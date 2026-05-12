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
