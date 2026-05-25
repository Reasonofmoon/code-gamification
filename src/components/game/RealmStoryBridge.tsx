import type { RealmId } from "@/types/mission";
import { getStoryArcNode } from "@/content/world-story";

export function RealmStoryBridge({ realmId }: { realmId: RealmId }) {
  const story = getStoryArcNode(realmId);

  return (
    <section className="grid gap-3 md:grid-cols-3" aria-label="렐름 서사 연결">
      <StoryBeat label="이전의 흔적" text={story.bridgeFrom} />
      <StoryBeat label="이 대륙의 역할" text={story.role} />
      <StoryBeat label="다음 예고" text={story.bridgeTo} />
    </section>
  );
}

function StoryBeat({ label, text }: { label: string; text: string }) {
  return (
    <article className="rounded-lg border border-border bg-surface/50 p-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
      </div>
      <p className="mt-2 text-sm leading-6 text-foreground/85">{text}</p>
    </article>
  );
}
