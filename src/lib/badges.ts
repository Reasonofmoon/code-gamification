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
  "storybook-novice": {
    id: "storybook-novice",
    name: "동화숲 첫 독자",
    description: "코딩동화숲에서 첫 파이썬 이야기를 완주했다.",
    emoji: "📖",
  },
  "storybook-champion": {
    id: "storybook-champion",
    name: "코딩동화 작가",
    description: "코딩동화숲의 모든 파이썬 미션을 클리어했다.",
    emoji: "📚",
  },
  "the-cursor-emperor": {
    id: "the-cursor-emperor",
    name: "커서의 황제",
    description: "모든 대륙을 정복했다.",
    emoji: "👑",
  },
  "wasteland-survivor": {
    id: "wasteland-survivor",
    name: "잿빛의 생존자",
    description: "잿빛 황무지를 살아 도망쳤다.",
    emoji: "🌫️",
  },
  "oracle-novice": {
    id: "oracle-novice",
    name: "신탁 견습",
    description: "기계 신탁의 탑에서 첫 도구를 익혔다.",
    emoji: "🪄",
  },
  "oracle-tower-champion": {
    id: "oracle-tower-champion",
    name: "신탁의 챔피언",
    description: "기계 신탁의 탑의 모든 미션을 클리어했다.",
    emoji: "🏆",
  },
  "mirror-vanquished": {
    id: "mirror-vanquished",
    name: "거울을 깬 자",
    description: "거울 속 또 다른 자신을 마주하고 이겼다.",
    emoji: "🪞",
  },
  "first-repo": {
    id: "first-repo",
    name: "첫 저장소",
    description: "기원의 대장간에서 첫 Git 저장소를 열었다.",
    emoji: "🪙",
  },
  "reset-survivor": {
    id: "reset-survivor",
    name: "복구 생존자",
    description: "잘못 붙인 Git 화로를 안전하게 철거하고 복구했다.",
    emoji: "🔄",
  },
  "branch-weaver": {
    id: "branch-weaver",
    name: "가지 직조자",
    description: "브랜치와 병합의 평행우주를 3성으로 통과했다.",
    emoji: "🌿",
  },
  "pr-master": {
    id: "pr-master",
    name: "PR 장인",
    description: "Pull Request를 만들고 병합까지 완료했다.",
    emoji: "🌉",
  },
  "origin-keeper": {
    id: "origin-keeper",
    name: "기원의 수호자",
    description: "기원의 대장간의 모든 Git/GitHub 미션을 마쳤다.",
    emoji: "👑",
  },
  "dragon-slayer": {
    id: "dragon-slayer",
    name: "용 사냥꾼",
    description: "네 보스를 모두 격파했다.",
    emoji: "🐉",
  },
};

export const BADGE_LIST: readonly BadgeDef[] = Object.values(BADGES);
