import { z } from "zod";

export const realmIdSchema = z.enum(["shellholm", "vimkeep", "runescar"]);
export type RealmId = z.infer<typeof realmIdSchema>;

export const realmSchema = z.object({
  id: realmIdSchema,
  order: z.number().int().positive(),
  name: z.string(),
  subtitle: z.string(),
  emoji: z.string(),
  flavor: z.string(),
  requiredLevel: z.number().int().nonnegative(),
  trackKind: z.enum(["terminal", "vim", "language"]),
});
export type Realm = z.infer<typeof realmSchema>;

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

const terminalEvaluatorSchema = z.object({
  kind: z.literal("terminal"),
  initialFs: z.record(z.string(), z.union([z.string(), z.null()])),
  initialCwd: z.string().default("/"),
  successWhen: terminalCheckSchema,
});

export type TerminalCheck = z.infer<typeof terminalCheckSchema>;
export type BaseTerminalCheck = z.infer<typeof baseTerminalCheckSchema>;

const vimEvaluatorSchema = z.object({
  kind: z.literal("vim"),
  initialText: z.string(),
  targetText: z.string(),
  parThreeStars: z.number().int().positive(),
  parTwoStars: z.number().int().positive(),
});

const languageEvaluatorSchema = z.object({
  kind: z.literal("language"),
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

export const missionEvaluatorSchema = z.discriminatedUnion("kind", [
  terminalEvaluatorSchema,
  vimEvaluatorSchema,
  languageEvaluatorSchema,
]);
export type MissionEvaluator = z.infer<typeof missionEvaluatorSchema>;

export const missionSchema = z.object({
  id: z.string(),
  realmId: realmIdSchema,
  order: z.number().int().positive(),
  title: z.string(),
  fantasyTitle: z.string(),
  briefing: z.string(),
  hint: z.string().optional(),
  isBoss: z.boolean().default(false),
  xpReward: z.number().int().positive(),
  evaluator: missionEvaluatorSchema,
});
export type Mission = z.infer<typeof missionSchema>;

export type MissionId = Mission["id"];
