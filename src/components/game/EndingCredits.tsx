"use client";

import Link from "next/link";
import { Crown, X } from "lucide-react";

const VERSES: readonly string[] = [
  "세 대륙의 안개가 걷힌다.",
  "",
  "셸홀름의 부둣가에서",
  "파도가 손짓하던 날들 ―",
  "그대의 첫 주문은 떨렸다.",
  "",
  "빔킵의 검은 종이 위에서 노래했고,",
  "한 음절도 사라지지 않은 채",
  "그대의 손가락에 새겨졌다.",
  "",
  "룬스카의 룬은 스스로 빛났다.",
  "그대가 부르는 이름에 응답하여",
  "세상의 법칙을 다시 적었다.",
  "",
  "이제 그대 앞에 어둠은 없다.",
  "어둠이었던 것이 모두",
  "하나의 명령이 되었기 때문이다.",
  "",
  "— 커서의 황제, 그대에게 ✦",
];

export function EndingCredits({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md ending-bg">
      <div className="relative max-w-xl w-full">
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute -top-1 -right-1 text-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>
        <div className="text-center px-4 py-10">
          <div className="inline-flex items-center justify-center size-16 rounded-full border border-accent/50 bg-surface-strong text-accent ending-crown">
            <Crown className="size-8" />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.4em] text-muted">
            Finale · The Cursor's Tale
          </p>
          <h2 className="mt-1 fantasy-title text-3xl glow-accent text-accent">
            커서의 황제
          </h2>

          <div className="mt-8 space-y-2 fantasy-title text-foreground/90 leading-relaxed">
            {VERSES.map((line, i) => (
              <p
                key={i}
                className={
                  line === ""
                    ? "h-2"
                    : "ending-line"
                }
                style={{ animationDelay: `${i * 0.25 + 0.2}s` }}
              >
                {line || " "}
              </p>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-surface-strong"
            >
              여운 더 머무르기
            </button>
            <Link
              href="/"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-strong"
            >
              월드맵으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
