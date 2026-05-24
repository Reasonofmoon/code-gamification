import type { Mission, RealmId } from "@/types/mission";
import { WASTELAND_MISSIONS } from "./wasteland";
import { TERMINAL_MISSIONS } from "./terminal";
import { VIM_MISSIONS } from "./vim";
import { LANGUAGE_MISSIONS } from "./language";
import { STORYBOOK_MISSIONS } from "./storybook";
import { ORACLE_MISSIONS } from "./oracle";
import { FORGE_MISSIONS } from "./forge";

export const ALL_MISSIONS: readonly Mission[] = [
  ...WASTELAND_MISSIONS,
  ...TERMINAL_MISSIONS,
  ...VIM_MISSIONS,
  ...LANGUAGE_MISSIONS,
  ...STORYBOOK_MISSIONS,
  ...ORACLE_MISSIONS,
  ...FORGE_MISSIONS,
];

export function getMission(id: string): Mission | undefined {
  return ALL_MISSIONS.find((m) => m.id === id);
}

export function missionsByRealm(realmId: RealmId): readonly Mission[] {
  return ALL_MISSIONS.filter((m) => m.realmId === realmId).slice().sort(
    (a, b) => a.order - b.order
  );
}

export function nextMissionInRealm(
  realmId: RealmId,
  currentOrder: number
): Mission | undefined {
  return missionsByRealm(realmId).find((m) => m.order > currentOrder);
}
