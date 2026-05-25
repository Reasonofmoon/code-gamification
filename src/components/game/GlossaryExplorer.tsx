"use client";

import { useMemo, useState } from "react";
import { BookOpen, Search, ShieldCheck, Tags } from "lucide-react";
import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_ENTRIES,
  GLOSSARY_SOURCE_LABELS,
  GLOSSARY_SOURCE_URLS,
  type GlossaryCategory,
} from "@/content/glossary";

const ALL = "전체";
type ActiveCategory = typeof ALL | GlossaryCategory;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function GlossaryExplorer() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>(ALL);

  const categoryCounts = useMemo(() => {
    return GLOSSARY_CATEGORIES.reduce<Record<GlossaryCategory, number>>((acc, category) => {
      acc[category] = GLOSSARY_ENTRIES.filter((entry) => entry.category === category).length;
      return acc;
    }, {} as Record<GlossaryCategory, number>);
  }, []);

  const filteredEntries = useMemo(() => {
    const q = normalize(query);
    return GLOSSARY_ENTRIES.filter((entry) => {
      const categoryMatch = activeCategory === ALL || entry.category === activeCategory;
      if (!categoryMatch) return false;
      if (!q) return true;
      const haystack = [
        entry.term,
        entry.category,
        entry.short,
        entry.analogy,
        entry.useWhen,
        entry.caution,
        ...entry.aliases,
        ...entry.related,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeCategory, query]);

  return (
    <div className="space-y-5">
      <section className="parchment p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs uppercase tracking-widest text-accent">
              <BookOpen className="size-3.5" />
              Feynman Glossary
            </div>
            <h1 className="mt-3 fantasy-title text-3xl text-accent">CodeQuest 용어 사전</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
              게임에서 만나는 터미널, Git, Vim, JavaScript, Python, React, AI 제품 용어를
              겹치지 않는 카테고리로 정리했습니다. 어려운 말은 비유, 쓰임, 주의점으로 다시 풀었습니다.
            </p>
          </div>
          <div className="grid min-w-44 grid-cols-2 gap-2 text-center text-xs">
            <div className="rounded-lg border border-border bg-surface/40 p-3">
              <div className="font-mono text-lg text-foreground">{GLOSSARY_ENTRIES.length}</div>
              <div className="text-muted">용어</div>
            </div>
            <div className="rounded-lg border border-border bg-surface/40 p-3">
              <div className="font-mono text-lg text-foreground">{GLOSSARY_CATEGORIES.length}</div>
              <div className="text-muted">카테고리</div>
            </div>
          </div>
        </div>
      </section>

      <section className="parchment p-4">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-lg border border-border bg-background/70 py-3 pl-10 pr-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
            placeholder="검색: git add, 변수, props, 접근성, 비동기..."
            type="search"
            aria-label="용어 검색"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(ALL)}
            className={
              activeCategory === ALL
                ? "step-chip step-chip-active"
                : "step-chip hover:border-accent/60 hover:text-foreground"
            }
          >
            전체 {GLOSSARY_ENTRIES.length}
          </button>
          {GLOSSARY_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "step-chip step-chip-active"
                  : "step-chip hover:border-accent/60 hover:text-foreground"
              }
            >
              {category} {categoryCounts[category]}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {filteredEntries.map((entry) => (
          <article key={entry.term} className="parchment p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted">{entry.category}</div>
                <h2 className="mt-1 fantasy-title text-2xl text-accent">{entry.term}</h2>
              </div>
              <div className="flex flex-wrap justify-end gap-1">
                {entry.sources.map((source) => {
                  const url = GLOSSARY_SOURCE_URLS[source];
                  const label = GLOSSARY_SOURCE_LABELS[source];
                  return url ? (
                    <a
                      key={source}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-border bg-surface/60 px-2 py-1 text-[0.65rem] text-muted hover:border-accent/60 hover:text-foreground"
                    >
                      {source}
                    </a>
                  ) : (
                    <span
                      key={source}
                      title={label}
                      className="rounded-full border border-border bg-surface/60 px-2 py-1 text-[0.65rem] text-muted"
                    >
                      {source}
                    </span>
                  );
                })}
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-foreground/90">{entry.short}</p>

            <div className="mt-3 rounded-lg border border-accent/20 bg-accent/10 p-3 text-sm leading-relaxed text-accent-strong">
              {entry.analogy}
            </div>

            <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
              <div className="rounded-lg border border-border/70 bg-surface/40 p-3">
                <div className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
                  <Tags className="size-3.5 text-rune" />
                  언제 쓰나
                </div>
                <p className="text-muted">{entry.useWhen}</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-surface/40 p-3">
                <div className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
                  <ShieldCheck className="size-3.5 text-amber-300" />
                  조심할 점
                </div>
                <p className="text-muted">{entry.caution}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {entry.aliases.map((alias) => (
                <span key={alias} className="rounded-full border border-border bg-background/40 px-2 py-1 text-[0.68rem] text-muted">
                  {alias}
                </span>
              ))}
            </div>

            <div className="mt-3 border-t border-border pt-3 text-xs text-muted">
              연결 용어: {entry.related.join(" · ")}
            </div>
          </article>
        ))}
      </section>

      {filteredEntries.length === 0 && (
        <section className="parchment p-8 text-center">
          <div className="fantasy-title text-xl text-accent">검색 결과가 없습니다</div>
          <p className="mt-2 text-sm text-muted">다른 용어, 명령, 비유, 카테고리 이름으로 다시 검색해 보세요.</p>
        </section>
      )}

      <section className="parchment p-4 text-xs leading-relaxed text-muted">
        <div className="font-semibold text-foreground">참고 기준</div>
        <p className="mt-1">
          용어 구조는 App Factory의 사전 패턴을 참고했고, 정의는 MDN, Git 공식 glossary,
          Python 공식 glossary, React 공식 문서를 CodeQuest 미션 맥락에 맞게 다시 썼습니다.
          원문을 복사하지 않고 학습용 비유와 주의점으로 재구성했습니다.
        </p>
      </section>
    </div>
  );
}
