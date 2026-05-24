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
  // Wave 5 — Forge of Origin (Git/GitHub beginner track)
  "대장장이 에버": "/forge-cards/npc/ever.png",
  "전령 까치 코리": "/forge-cards/npc/cory.png",
  "사고의 망령 그렘": "/forge-cards/npc/glitch.png",
};

export function npcImageFor(speaker: string): string | null {
  const id = NPC_NAME_TO_ID[speaker];
  if (!id) return null;
  return id.startsWith("/") ? id : `/npc/${id}.png`;
}

/** Realm id → 배경 일러스트 파일. 동일하게 fallback nullable. */
export function realmImageFor(realmId: string): string {
  if (realmId === "forge-of-origin") return "/forge-cards/realm/forge-of-origin.png";
  return `/realm/${realmId}.png`;
}

const FORGE_MISSION_IMAGES: Record<string, string> = {
  "forge-01": "/forge-cards/mission/forge-01-pwd.png",
  "forge-02": "/forge-cards/mission/forge-02-mkdir-cd.png",
  "forge-03": "/forge-cards/mission/forge-03-version-auth.png",
  "forge-04": "/forge-cards/mission/forge-04-init.png",
  "forge-05": "/forge-cards/mission/forge-05-echo.png",
  "forge-06": "/forge-cards/mission/forge-06-status-add.png",
  "forge-07": "/forge-cards/mission/forge-07-commit-log.png",
  "forge-boss-1": "/forge-cards/mission/forge-boss-1-forgotten-add.png",
  "forge-08": "/forge-cards/mission/forge-08-gh-auth-scope.png",
  "forge-09": "/forge-cards/mission/forge-09-gh-repo-create.png",
  "forge-10": "/forge-cards/mission/forge-10-push.png",
  "forge-11": "/forge-cards/mission/forge-11-branch-switch.png",
  "forge-12": "/forge-cards/mission/forge-12-merge.png",
  "forge-boss-2": "/forge-cards/mission/forge-boss-2-conflict.png",
  "forge-13": "/forge-cards/mission/forge-13-gitignore.png",
  "forge-14": "/forge-cards/mission/forge-14-pr-create.png",
  "forge-15": "/forge-cards/mission/forge-15-pr-merge.png",
  "forge-boss-3": "/forge-cards/mission/forge-boss-3-wrong-forge.png",
};

export function missionImageFor(missionId: string): string | null {
  return FORGE_MISSION_IMAGES[missionId] ?? null;
}

export const WORLDMAP_IMAGE = "/worldmap/akashic-map.png";

/** Wave 2 — 풍경 자산. 부재해도 안전 (onError fallback 패턴). */
export const WASTELAND_IMAGE = "/realm/wasteland.png";
export const VOID_ALTAR_IMAGE = "/realm/void-altar.png";
