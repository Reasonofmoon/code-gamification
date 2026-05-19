import Link from "next/link";
import { ArrowLeft, WandSparkles } from "lucide-react";
import {
  CODING_STORY_META_PROMPT,
  PROMPT_FORGE_REQUIRED_SECTIONS,
} from "@/content/prompt-forge";

export default function PromptForgePage() {
  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> 월드맵
      </Link>

      <section className="parchment p-6">
        <div className="flex items-start gap-4">
          <div className="grid size-12 place-items-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
            <WandSparkles className="size-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Prompt Forge
            </p>
            <h1 className="fantasy-title text-3xl text-accent">
              코딩 동화 메타 프롬프트
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-muted">
              오리지널 블록 히어로 세계관으로 프로젝트형 코딩 동화를 생성하는
              안전한 메타 프롬프트입니다. 숨은 사고 태그 대신 공개 가능한
              설계도인 <span className="font-mono text-foreground">story_blueprint</span> 를
              사용합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-7">
        {PROMPT_FORGE_REQUIRED_SECTIONS.map((section) => (
          <div key={section} className="parchment p-3">
            <div className="font-mono text-xs text-accent">{section}</div>
          </div>
        ))}
      </section>

      <section className="parchment overflow-hidden">
        <div className="border-b border-border px-5 py-3">
          <h2 className="fantasy-title text-xl text-accent">완성 템플릿</h2>
          <p className="mt-1 text-xs text-muted">
            {`{concept}`}, {`{service_model}`}, {`{episode_request}`} 같은
            자리표시자를 바꿔 에피소드를 생성합니다.
          </p>
        </div>
        <pre className="max-h-[680px] overflow-auto p-5 text-xs leading-relaxed text-foreground/90">
          <code>{CODING_STORY_META_PROMPT}</code>
        </pre>
      </section>
    </div>
  );
}
