/**
 * DeployBadge — Vercel 환경별 배포 상태 표시.
 *
 * 환경변수는 Vercel 빌드 시점에 자동 주입됨:
 *  - VERCEL_ENV: 'production' | 'preview' | 'development'
 *  - VERCEL_GIT_COMMIT_SHA: 풀 SHA (40자)
 *  - VERCEL_GIT_COMMIT_REF: 브랜치명
 *
 * 디자인 결정:
 *  - production: 'Powered by Vercel' + 짧은 SHA(7자). 깨끗.
 *  - preview:    'PREVIEW' 강조 + SHA + branch. 명확한 식별.
 *  - 로컬:        'LOCAL' 만 표시.
 *
 * Server component 라서 client bundle에 환경변수 inline 안 됨.
 */
export function DeployBadge() {
  const env = process.env.VERCEL_ENV;
  const sha = process.env.VERCEL_GIT_COMMIT_SHA;
  const shortSha = sha?.slice(0, 7);
  const branch = process.env.VERCEL_GIT_COMMIT_REF;
  const vercelUrl = process.env.VERCEL_URL;

  if (env === "production") {
    return (
      <a
        href="https://vercel.com?utm_source=codequest"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-muted hover:text-foreground transition-colors"
        title={shortSha ? `commit ${shortSha}` : undefined}
      >
        <VercelMark />
        <span>Powered by Vercel</span>
        {shortSha && <span className="font-mono opacity-70">· {shortSha}</span>}
      </a>
    );
  }

  if (env === "preview") {
    return (
      <a
        href={vercelUrl ? `https://${vercelUrl}` : "https://vercel.com"}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2"
      >
        <span className="px-1.5 py-0.5 rounded bg-magic/20 text-magic font-mono text-[10px] uppercase tracking-wider">
          Preview
        </span>
        {shortSha && (
          <span className="font-mono text-muted text-[11px]">{shortSha}</span>
        )}
        {branch && (
          <span className="text-muted text-[11px] hidden sm:inline">
            · {branch}
          </span>
        )}
      </a>
    );
  }

  // 로컬 (vercel dev 또는 npm run dev — VERCEL_ENV 미주입)
  return (
    <span className="px-1.5 py-0.5 rounded bg-surface-strong text-muted font-mono text-[10px] uppercase tracking-wider">
      Local
    </span>
  );
}

function VercelMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3 fill-current"
    >
      <path d="M12 1.5L23.25 21H0.75L12 1.5z" />
    </svg>
  );
}
