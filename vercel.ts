import { type VercelConfig } from "@vercel/config/v1";

/**
 * CodeQuest — Vercel 프로젝트 설정.
 *
 * 핵심:
 * - 프레임워크: Next.js 16 (App Router, Turbopack 빌드)
 * - 서버리스 함수: `/api/run-code` 만 존재 — Judge0 RapidAPI 프록시.
 *   maxDuration 은 라우트 파일에서 `export const maxDuration = 10` 으로 명시.
 * - 환경변수: JUDGE0_RAPIDAPI_KEY, JUDGE0_RAPIDAPI_HOST (Encrypted)
 *   → 반드시 `vercel env add` 또는 대시보드에서 등록할 것. 클라이언트 노출 ❌.
 *
 * Cron / rewrite / redirect 는 현재 없음. v2(클라우드 동기화·뉴스레터 등)에서 추가 예정.
 */
export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "npm run build",
  installCommand: "npm install",
};

export default config;
