"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BadgeId, PlayerState } from "@/types/player";
import { playerStateSchema, xpToLevel } from "@/types/player";
import { daysBetween, todayIso } from "@/lib/utils";

const STORAGE_KEY = "code-gamification:player:v1";

export type GameStore = PlayerState & {
  /** Apply a successful mission clear. Returns newly earned badges. */
  applyMissionClear: (input: {
    missionId: string;
    stars: number;
    xp: number;
    attempts: number;
    keystrokes?: number;
    earnedBadges?: BadgeId[];
  }) => { newBadges: BadgeId[]; leveledUp: boolean; newLevel: number };
  /** Record a session today, updating streak. */
  registerSession: () => void;
  /** Wipe all progress. */
  reset: () => void;
  /** Serialize state to JSON for export. */
  exportJson: () => string;
  /** Replace state from imported JSON. Returns false on validation failure. */
  importJson: (json: string) => boolean;
  /** True once localStorage has been read into the store. */
  _hasHydrated: boolean;
  _setHasHydrated: (v: boolean) => void;
};

const initialState: PlayerState = {
  level: 1,
  xp: 0,
  streakDays: 0,
  lastPlayedDate: null,
  badges: [],
  missionResults: {},
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      _hasHydrated: false,
      _setHasHydrated: (v) => set({ _hasHydrated: v }),

      applyMissionClear: ({
        missionId,
        stars,
        xp,
        attempts,
        keystrokes,
        earnedBadges = [],
      }) => {
        const prev = get();
        const prevResult = prev.missionResults[missionId];
        const bestKeystrokes =
          typeof keystrokes === "number"
            ? Math.min(prevResult?.bestKeystrokes ?? Infinity, keystrokes)
            : prevResult?.bestKeystrokes;
        const nextResult = {
          missionId,
          stars: Math.max(stars, prevResult?.stars ?? 0),
          attempts: (prevResult?.attempts ?? 0) + attempts,
          bestKeystrokes:
            bestKeystrokes === Infinity ? undefined : bestKeystrokes,
          clearedAt: Date.now(),
        };
        const xpGain = prevResult ? 0 : xp; // 첫 클리어만 XP 지급
        const newXp = prev.xp + xpGain;
        const newLevel = xpToLevel(newXp);
        const leveledUp = newLevel > prev.level;
        const knownBadges = new Set(prev.badges);
        const newBadges: BadgeId[] = [];
        for (const b of earnedBadges) {
          if (!knownBadges.has(b)) {
            knownBadges.add(b);
            newBadges.push(b);
          }
        }
        set({
          xp: newXp,
          level: newLevel,
          badges: [...knownBadges],
          missionResults: { ...prev.missionResults, [missionId]: nextResult },
        });
        return { newBadges, leveledUp, newLevel };
      },

      registerSession: () => {
        const today = todayIso();
        const prev = get();
        if (prev.lastPlayedDate === today) return;
        let nextStreak = 1;
        if (prev.lastPlayedDate) {
          const gap = daysBetween(prev.lastPlayedDate, today);
          if (gap === 1) nextStreak = prev.streakDays + 1;
          else if (gap === 0) nextStreak = prev.streakDays;
        }
        set({ lastPlayedDate: today, streakDays: nextStreak });
      },

      reset: () => set({ ...initialState }),

      exportJson: () => {
        const s = get();
        const snapshot: PlayerState = {
          level: s.level,
          xp: s.xp,
          streakDays: s.streakDays,
          lastPlayedDate: s.lastPlayedDate,
          badges: s.badges,
          missionResults: s.missionResults,
        };
        return JSON.stringify(snapshot, null, 2);
      },

      importJson: (json) => {
        try {
          const parsed = playerStateSchema.parse(JSON.parse(json));
          set({ ...parsed });
          return true;
        } catch {
          return false;
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        level: state.level,
        xp: state.xp,
        streakDays: state.streakDays,
        lastPlayedDate: state.lastPlayedDate,
        badges: state.badges,
        missionResults: state.missionResults,
      }),
      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true);
      },
    }
  )
);

export function isMissionCleared(
  results: PlayerState["missionResults"],
  missionId: string
): boolean {
  return Boolean(results[missionId]);
}
