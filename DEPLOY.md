# Vercel 배포 가이드 — CodeQuest

> Next.js 16 App Router · Fluid Compute · 환경변수 1쌍만 등록하면 끝.

---

## 0. 사전 준비

```bash
# Vercel CLI 설치 (글로벌)
npm i -g vercel

# 로그인
vercel login
```

또는 글로벌 설치를 피하고 싶다면 모든 명령에 `npx`:

```bash
npx vercel login
```

## 1. 프로젝트 링크

레포 루트(`code-gamification/`)에서:

```bash
vercel link
```

- 처음이면 새 프로젝트 생성 흐름. 팀/이름/디렉터리 묻는다 → 기본값 OK.
- `.vercel/` 폴더가 생기며 프로젝트 메타데이터를 보관. **이 폴더는 `.gitignore`에 이미 포함**.

## 2. 환경변수 등록

Judge0 RapidAPI 키가 **있어야 룬스카(언어) 트랙이 동작**합니다.
키 발급: https://rapidapi.com/judge0-official/api/judge0-ce  (Free tier: 50 requests/day)

### 방법 A — CLI

각 환경(Production · Preview · Development)에 별도 등록:

```bash
vercel env add JUDGE0_RAPIDAPI_KEY
# > Production 선택 후 키 붙여넣기
# > Preview 도 동일하게 한 번 더
# > Development 는 선택 — 로컬은 .env.local 권장

vercel env add JUDGE0_RAPIDAPI_HOST
# 모든 환경에 'judge0-ce.p.rapidapi.com' 입력
```

### 방법 B — 대시보드

vercel.com → 프로젝트 → Settings → Environment Variables → Add:

| Key | Value | 환경 |
|---|---|---|
| `JUDGE0_RAPIDAPI_KEY` | `xxx...` (RapidAPI 발급) | Production, Preview |
| `JUDGE0_RAPIDAPI_HOST` | `judge0-ce.p.rapidapi.com` | Production, Preview |

### 로컬 개발 환경

```bash
cp .env.local.example .env.local
# .env.local 을 열고 키 붙여넣기
```

`.env.local` 은 git ignore 됨 (커밋되지 않음).

## 3. 첫 배포

### 미리보기(Preview) 배포

브랜치 push 또는 수동:

```bash
vercel
```

미리보기 URL이 출력되면 브라우저에서 검증.

### 프로덕션 배포

```bash
vercel --prod
```

→ `https://<project>.vercel.app` 에 배포.

## 4. 첫 배포 체크리스트

배포 전:

- [ ] `npm run build` 로컬에서 통과
- [ ] `npx tsc --noEmit` 통과 (현재 ✅)
- [ ] `.env.local.example` 에 신규 키 누락 없는지
- [ ] `.gitignore` 에 `.env*` + `!*.example` 패턴 확인 (현재 ✅)
- [ ] `vercel.ts` 의 framework 가 `'nextjs'`

배포 후:

- [ ] 월드맵 페이지 (`/`) 로딩 — 세 Realm 카드 표시
- [ ] 셸홀름 미션 1 (`/mission/shellholm-01`) 진입 → `pwd` 입력 → 클리어
- [ ] 새로고침 → 진행도 유지 (localStorage)
- [ ] URL 잠금: 미클리어 상태에서 `/mission/runescar-09` 직접 접근 → 리다이렉트
- [ ] 룬스카 미션에서 `console.log('Hello, Runescar')` → 실행 → PASS
- [ ] Vercel 대시보드 → Functions → `/api/run-code` 호출 로그 확인
- [ ] 모바일 뷰포트(375px) 깨짐 없는지

## 5. 모니터링·다음 단계

- **Vercel Analytics**: 무료 Tier 활성화 가능. `<Analytics />` 컴포넌트 추가.
- **Vercel Speed Insights**: Core Web Vitals 자동 수집.
- **Rolling Releases**: 점진적 출시. 사용자 증가 시 활용.
- **AI Gateway**: v2에서 LLM 힌트/튜터 기능 도입 시 활용.

## 6. 자주 만나는 문제

**"Judge0 응답 오류: 401"**
→ 환경변수 `JUDGE0_RAPIDAPI_KEY` 가 등록되지 않았거나 만료. `vercel env ls` 로 확인.

**"Module not found: @vercel/config"**
→ `vercel.ts` 가 빌드 시점에 `@vercel/config` 를 require. dev dep 으로 설치되어 있어야 함:
```bash
npm install --save-dev @vercel/config
```

**`/api/run-code` 가 10초 만에 타임아웃**
→ 무료 플랜 Cold start 가 오래 걸리는 경우. `src/app/api/run-code/route.ts` 의 `maxDuration` 을 30으로 올리기. (Hobby plan 한도 60초)

**localStorage 가 비어 보이는데 진행도가 있다고 표시**
→ Incognito · Brave · Safari ITP 등에서 발생 가능. 사용자에게 일반 브라우저 사용 안내.

## 7. 도메인 연결 (선택)

```bash
vercel domains add codequest.your-domain.com
```

대시보드에서도 가능. CNAME 또는 A 레코드 안내가 함께 표시됨.
