import type { Realm, RealmId } from "@/types/mission";

export const REALMS: readonly Realm[] = [
  {
    id: "wasteland",
    order: 0,
    name: "잿빛 황무지",
    subtitle: "Greywhell — The Origin",
    emoji: "🌫️",
    flavor:
      "에테르가 고갈된 죽음의 변경. 엘라 할머니가 그대에게 마지막 지도를 건넨다. — 살아남아야 한다.",
    requiredLevel: 0,
    trackKind: "prologue",
  },
  {
    id: "shellholm",
    order: 1,
    name: "셸홀름 항구",
    subtitle: "Shellholm Harbor",
    emoji: "🔮",
    flavor:
      "안개 자욱한 부둣가, 견습 마법사들이 처음으로 주문서를 펼치는 곳. 기초 주문을 연마하라.",
    requiredLevel: 0,
    trackKind: "terminal",
  },
  {
    id: "vimkeep",
    order: 2,
    name: "빔킵 검의 도시",
    subtitle: "Vimkeep, City of Blades",
    emoji: "⚔️",
    flavor:
      "수백 년 전통의 검술 학파. 모든 모션은 자세이며, 모든 명령은 검술이다.",
    requiredLevel: 4,
    trackKind: "vim",
  },
  {
    id: "runescar",
    order: 3,
    name: "룬스카 원형도서관",
    subtitle: "Runescar Grand Archive",
    emoji: "📜",
    flavor:
      "잊혀진 룬어가 살아 숨 쉬는 도서관. 룬을 다루는 자만이 세계의 법칙을 다시 쓴다.",
    requiredLevel: 12,
    trackKind: "language",
  },
  {
    id: "storybook",
    order: 4,
    name: "코딩동화숲",
    subtitle: "Storybook Grove",
    emoji: "📚",
    flavor:
      "아카식의 지도가 펼쳐 보인 시간책의 숲. 카이와 엘라, 세렌, 리오넬의 어린 날이 파이썬 동화로 다시 빛난다.",
    requiredLevel: 0,
    trackKind: "language",
  },
  {
    id: "oracle-tower",
    order: 5,
    name: "기계 신탁의 탑",
    subtitle: "The Tower of Machine Oracles",
    emoji: "🪄",
    flavor:
      "공허의 조율자가 된 자에게만 열리는 새 시대의 탑. 옛 마법 너머에서 *기계 신탁* 과 대화하는 법을 배운다.",
    requiredLevel: 18,
    trackKind: "oracle",
  },
  {
    id: "forge-of-origin",
    order: 6,
    name: "기원의 대장간",
    subtitle: "Forge of Origin",
    emoji: "🔨",
    flavor:
      "시간을 단조하는 대장장이 에버의 화로. 모든 모험가의 첫 작품(commit)이 이곳에서 벼려진다.",
    requiredLevel: 0,
    trackKind: "forge",
  },
] as const;

export function getRealm(id: RealmId): Realm {
  const realm = REALMS.find((r) => r.id === id);
  if (!realm) throw new Error(`Unknown realm: ${id}`);
  return realm;
}
