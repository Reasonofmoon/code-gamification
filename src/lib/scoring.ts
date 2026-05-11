import type { Mission } from "@/types/mission";

export type ScoreInput = {
  mission: Mission;
  attempts: number;
  keystrokes?: number;
};

export function computeStars({
  mission,
  attempts,
  keystrokes,
}: ScoreInput): number {
  if (mission.evaluator.kind === "vim" && typeof keystrokes === "number") {
    const { parThreeStars, parTwoStars } = mission.evaluator;
    if (keystrokes <= parThreeStars) return 3;
    if (keystrokes <= parTwoStars) return 2;
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
