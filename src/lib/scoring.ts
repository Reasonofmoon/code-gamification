import type { Mission, VimStep } from "@/types/mission";

export type ScoreInput = {
  mission: Mission;
  attempts: number;
  /** mission 내 모든 vim step 의 키스트로크 합계. */
  totalKeystrokes?: number;
};

/**
 * 별점 계산.
 *
 * vim step 이 하나라도 있는 미션 → 모든 vim step 의 par 합산 vs 총 키스트로크.
 * 그 외 미션 → attempts 기반 (1회=★3, 2~3=★2, 4+=★1).
 */
export function computeStars({
  mission,
  attempts,
  totalKeystrokes,
}: ScoreInput): number {
  const vimSteps = mission.steps.filter(
    (s): s is VimStep => s.kind === "vim"
  );
  if (vimSteps.length > 0 && typeof totalKeystrokes === "number") {
    const parThree = vimSteps.reduce((acc, s) => acc + s.parThreeStars, 0);
    const parTwo = vimSteps.reduce((acc, s) => acc + s.parTwoStars, 0);
    if (totalKeystrokes <= parThree) return 3;
    if (totalKeystrokes <= parTwo) return 2;
    return 1;
  }
  if (attempts <= 1) return 3;
  if (attempts <= 3) return 2;
  return 1;
}

export function xpForStars(stars: number, baseReward: number): number {
  const multiplier = stars === 3 ? 1.5 : stars === 2 ? 1.2 : 1;
  return Math.round(baseReward * multiplier);
}
