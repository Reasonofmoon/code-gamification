import type { BadgeId } from "@/types/player";

export type BadgeDef = {
  id: BadgeId;
  name: string;
  description: string;
  emoji: string;
};

export const BADGES: Record<BadgeId, BadgeDef> = {
  "first-spell": {
    id: "first-spell",
    name: "첫 주문",
    description: "첫 번째 미션을 클리어했다.",
    emoji: "✨",
  },
  "vim-novice": {
    id: "vim-novice",
    name: "빔 견습검사",
    description: "빔킵에서 첫 검술을 익혔다.",
    emoji: "🗡️",
  },
  "vim-sage": {
    id: "vim-sage",
    name: "빔 현자",
    description: "빔킵의 모든 챕터를 마쳤다.",
    emoji: "🧙",
  },
  "rune-reader": {
    id: "rune-reader",
    name: "룬 독해자",
    description: "처음으로 고대 룬어를 해독했다.",
    emoji: "🔯",
  },
  "no-death-run": {
    id: "no-death-run",
    name: "무패의 길",
    description: "한 미션을 한 번도 실패 없이 클리어했다.",
    emoji: "🛡️",
  },
  speedrunner: {
    id: "speedrunner",
    name: "질풍의 검",
    description: "3성 평가로 미션을 클리어했다.",
    emoji: "⚡",
  },
  "streak-7": {
    id: "streak-7",
    name: "일주일의 수련",
    description: "7일 연속 학습 달성.",
    emoji: "🔥",
  },
  "streak-30": {
    id: "streak-30",
    name: "한 달의 정진",
    description: "30일 연속 학습 달성.",
    emoji: "🌋",
  },
  "shellholm-champion": {
    id: "shellholm-champion",
    name: "셸홀름의 챔피언",
    description: "셸홀름의 모든 미션을 클리어했다.",
    emoji: "🏆",
  },
  "vimkeep-champion": {
    id: "vimkeep-champion",
    name: "빔킵의 챔피언",
    description: "빔킵의 모든 미션을 클리어했다.",
    emoji: "🏆",
  },
  "runescar-champion": {
    id: "runescar-champion",
    name: "룬스카의 챔피언",
    description: "룬스카의 모든 미션을 클리어했다.",
    emoji: "🏆",
  },
  "the-cursor-emperor": {
    id: "the-cursor-emperor",
    name: "커서의 황제",
    description: "세 대륙을 모두 정복했다.",
    emoji: "👑",
  },
};

export const BADGE_LIST: readonly BadgeDef[] = Object.values(BADGES);
