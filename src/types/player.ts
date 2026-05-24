import { z } from "zod";

export const missionResultSchema = z.object({
  missionId: z.string(),
  stars: z.number().int().min(0).max(3),
  attempts: z.number().int().nonnegative(),
  bestKeystrokes: z.number().int().nonnegative().optional(),
  clearedAt: z.number().int().nonnegative(),
});
export type MissionResult = z.infer<typeof missionResultSchema>;

export const badgeIdSchema = z.enum([
  "first-spell",
  "vim-novice",
  "vim-sage",
  "rune-reader",
  "no-death-run",
  "speedrunner",
  "streak-7",
  "streak-30",
  "shellholm-champion",
  "vimkeep-champion",
  "runescar-champion",
  "storybook-novice",
  "storybook-champion",
  "the-cursor-emperor",
  // 잿빛 황무지 (튜토리얼)
  "wasteland-survivor",
  // Oracle Tower (AI 시대 트랙)
  "oracle-novice",
  "oracle-tower-champion",
  "mirror-vanquished",
  // Forge of Origin (Git/GitHub beginner track)
  "first-repo",
  "reset-survivor",
  "branch-weaver",
  "pr-master",
  "origin-keeper",
  // 보스 전부 격파
  "dragon-slayer",
]);
export type BadgeId = z.infer<typeof badgeIdSchema>;

export const playerStateSchema = z.object({
  level: z.number().int().min(1).default(1),
  xp: z.number().int().nonnegative().default(0),
  streakDays: z.number().int().nonnegative().default(0),
  lastPlayedDate: z.string().nullable().default(null),
  badges: z.array(badgeIdSchema).default([]),
  missionResults: z.record(z.string(), missionResultSchema).default({}),
});
export type PlayerState = z.infer<typeof playerStateSchema>;

export const XP_PER_LEVEL = 100;

export function xpToLevel(xp: number): number {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

export function xpProgressInLevel(xp: number): {
  current: number;
  needed: number;
  ratio: number;
} {
  const inLevel = xp % XP_PER_LEVEL;
  return {
    current: inLevel,
    needed: XP_PER_LEVEL,
    ratio: inLevel / XP_PER_LEVEL,
  };
}
