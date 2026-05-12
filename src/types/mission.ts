import { z } from "zod";

export const realmIdSchema = z.enum([
  "wasteland",
  "shellholm",
  "vimkeep",
  "runescar",
  "oracle-tower",
]);
export type RealmId = z.infer<typeof realmIdSchema>;

export const realmSchema = z.object({
  id: realmIdSchema,
  order: z.number().int().positive(),
  name: z.string(),
  subtitle: z.string(),
  emoji: z.string(),
  flavor: z.string(),
  requiredLevel: z.number().int().nonnegative(),
  /**
   * `prologue` = 잿빛 황무지 (튜토리얼, 기본 명령 도입).
   * `oracle` = AI 시대 도구 (gh, git, npx, AI SDK 등).
   * 평가기는 terminal/language 재사용.
   */
  trackKind: z.enum(["prologue", "terminal", "vim", "language", "oracle"]),
});
export type Realm = z.infer<typeof realmSchema>;

// ──────────────────────────────────────────────────────────
// Terminal success-check schema (한 단계 평면화로 self-reference 회피)
// ──────────────────────────────────────────────────────────
const baseTerminalCheckSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("lastOutputMatches"), pattern: z.string() }),
  z.object({ type: z.literal("cwdEquals"), path: z.string() }),
  z.object({ type: z.literal("fsHasFile"), path: z.string() }),
  z.object({ type: z.literal("fsHasDir"), path: z.string() }),
  z.object({ type: z.literal("fsMissingPath"), path: z.string() }),
  z.object({ type: z.literal("commandUsed"), command: z.string() }),
]);

const terminalCheckSchema = z.union([
  baseTerminalCheckSchema,
  z.object({
    type: z.literal("all"),
    checks: z.array(baseTerminalCheckSchema),
  }),
]);
export type TerminalCheck = z.infer<typeof terminalCheckSchema>;
export type BaseTerminalCheck = z.infer<typeof baseTerminalCheckSchema>;

// ──────────────────────────────────────────────────────────
// Mission steps (multi-step scenarios)
// ──────────────────────────────────────────────────────────
const dialogueStepSchema = z.object({
  id: z.string(),
  kind: z.literal("dialogue"),
  speaker: z.string(),
  speakerEmoji: z.string().optional(),
  /** 한 줄씩 표시될 대화. 사용자 클릭으로 다음 step. */
  lines: z.array(z.string()).min(1),
});

const terminalStepSchema = z.object({
  id: z.string(),
  kind: z.literal("terminal"),
  briefing: z.string(),
  hint: z.string().optional(),
  initialFs: z.record(z.string(), z.union([z.string(), z.null()])),
  initialCwd: z.string().default("/"),
  successWhen: terminalCheckSchema,
});

const vimStepSchema = z.object({
  id: z.string(),
  kind: z.literal("vim"),
  briefing: z.string(),
  hint: z.string().optional(),
  initialText: z.string(),
  targetText: z.string(),
  parThreeStars: z.number().int().positive(),
  parTwoStars: z.number().int().positive(),
});

const languageStepSchema = z.object({
  id: z.string(),
  kind: z.literal("language"),
  briefing: z.string(),
  hint: z.string().optional(),
  languageId: z.enum(["javascript", "python"]),
  starterCode: z.string(),
  testCases: z
    .array(
      z.object({
        stdin: z.string().default(""),
        expectedStdout: z.string(),
      })
    )
    .min(1),
});

export const missionStepSchema = z.discriminatedUnion("kind", [
  dialogueStepSchema,
  terminalStepSchema,
  vimStepSchema,
  languageStepSchema,
]);
export type MissionStep = z.infer<typeof missionStepSchema>;
export type DialogueStep = z.infer<typeof dialogueStepSchema>;
export type TerminalStep = z.infer<typeof terminalStepSchema>;
export type VimStep = z.infer<typeof vimStepSchema>;
export type LanguageStep = z.infer<typeof languageStepSchema>;

// ──────────────────────────────────────────────────────────
// Mission
// ──────────────────────────────────────────────────────────
export const missionSchema = z.object({
  id: z.string(),
  realmId: realmIdSchema,
  order: z.number().int().positive(),
  title: z.string(),
  fantasyTitle: z.string(),
  /** 카드 목록 등에 보이는 한 줄 요약 */
  summary: z.string(),
  isBoss: z.boolean().default(false),
  xpReward: z.number().int().positive(),
  steps: z.array(missionStepSchema).min(1),
});
export type Mission = z.infer<typeof missionSchema>;
export type MissionId = Mission["id"];

/** 미션이 어떤 트랙(검증 종류)인지 — 첫 challenge step 기준 */
export function detectMissionTrackKind(
  mission: Mission
): "terminal" | "vim" | "language" | "story" {
  for (const s of mission.steps) {
    if (s.kind !== "dialogue") return s.kind;
  }
  return "story";
}
