<div align="right">

[English](README.en.md) · [**한국어**](README.md)

</div>

# 👑 CodeQuest

> 터미널 · vim · 프로그래밍 언어를 **고전 판타지 RPG**로 익히는 게이미피케이션 학습 앱.
> Next.js 16 · TypeScript · Tailwind 4 · Monaco · XTerm.js · Zustand.

[![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-FFCE58?style=flat)](LICENSE)

[참고 영감](https://terminal-playground.netlify.app/) 사이트의 컨셉을 **세 대륙의 RPG 모험**으로 발전시켰다.
세 트랙(터미널 8 + vim 18 + 언어 9 = **35 미션 완성**)에 XP·레벨·뱃지·스트릭·엔딩 크레딧이 얹혀 있다.

## 빠르게 시작

```bash
npm install
cp .env.local.example .env.local   # Judge0 키 입력 (옵션)
npm run dev
# http://localhost:3000
```

Judge0 키 없이도 **셸홀름(터미널)** 과 **빔킵(vim)** 미션은 전부 동작한다. **룬스카(언어)** 미션은 키가 필요하다.

## 세 대륙 (Realms)

| 대륙 | 트랙 | 미션 수 | 잠금 해제 |
|---|---|---|---|
| 🔮 셸홀름 항구 | 터미널 명령어 (가상 셸) | 8 (보스 1) | Lv.0 (즉시) |
| ⚔️ 빔킵 검의 도시 | vim 모션·명령 (5개 챕터) | 18 (보스 1) | Lv.4 |
| 📜 룬스카 원형도서관 | JS/Python (Judge0) | 9 (보스 1) | Lv.12 |
| **합계** | — | **35 / 35** | — |

## 게이미피케이션

- **XP & 레벨** (Lv.1~20, 100 XP/level, Realm 해금 조건)
- **별점 평가** (1~3성: 속도·정확도·키스트로크)
- **뱃지 12종** — 진척(`First Spell`, `Vim Novice`, `Rune Reader`), 챔피언(`Shellholm/Vimkeep/Runescar Champion`, `Vim Sage`), 평가(`Speedrunner`, `No-Death Run`), 스트릭(`Streak 7/30`), 최종(`The Cursor Emperor`)
- **일일 스트릭**
- **엔딩 크레딧** — 35 미션 모두 완주 시 등장하는 짧은 판타지 시
- **URL 직접 접근 잠금 검사** — 이전 미션 미클리어 시 Realm 페이지로 자동 리다이렉트
- **JSON export/import** (기기 변경 안전망)
- **로그인 없음** (localStorage 단일 저장)

## 기술 결정

- **TerminalPanel**: XTerm.js 표시 + 자체 `fake-shell.ts` 가상 파일시스템. 실제 OS 명령 실행 ❌ (보안·인프라 비용 0).
- **VimEditor**: Monaco + `monaco-vim` 플러그인. Normal·Insert·Visual 등 80~90% 커버.
- **CodeEditor**: Monaco + `/api/run-code` Judge0 프록시. API 키는 서버 사이드에만 (클라이언트 비노출).
- **상태**: Zustand + `persist` → localStorage.
- **컨텐츠**: 미션 정의를 TS 객체로 (`src/content/missions/*.ts`).

## 디렉터리

```
src/
├─ app/
│  ├─ page.tsx                  월드맵
│  ├─ realm/[realmId]/page.tsx  던전 목록
│  ├─ mission/[missionId]/page.tsx  미션 실행
│  └─ api/run-code/route.ts     Judge0 프록시
├─ components/
│  ├─ game/                     XPBar·RealmCard·MissionCard·ResultModal·Hud·...
│  └─ mission/                  TerminalPanel·VimEditor·CodeEditor
├─ content/
│  ├─ realms.ts                 3 Realm 정의
│  └─ missions/                 트랙별 미션 데이터
├─ lib/
│  ├─ store/game-store.ts       Zustand + persist
│  ├─ terminal/                 fake-shell.ts · check.ts
│  ├─ scoring.ts · badges.ts · utils.ts
└─ types/                       mission.ts · player.ts (Zod)
```

## E2E 스모크 시나리오

1. `npm run dev` → http://localhost:3000 → 세 Realm 카드 표시 (빔킵·룬스카는 잠금).
2. 셸홀름 카드 클릭 → 미션 8개 카드. 1번만 잠금 해제, 나머지는 이전 미션 클리어가 필요.
3. 1번 미션 진입 → 가상 셸에서 `pwd` Enter → 평가 통과 → ResultModal에서 ★·XP·뱃지(`First Spell`).
4. **URL 직접 접근 차단 검증**: `/mission/shellholm-05` 로 직접 이동 → 이전 미션 미클리어 상태면 `/realm/shellholm` 으로 자동 리다이렉트.
5. 새로고침 → 진행도 유지(localStorage).
6. 8개 미션 모두 클리어 → 레벨이 충분히 차면 빔킵 해금 → vim 미션 진입 → Monaco + `--NORMAL--` 인디케이터.
7. 빔킵 18 미션 완주 → `Vimkeep Champion` + `Vim Sage` 동시 발급.
8. 룬스카 첫 미션은 `.env.local` 의 Judge0 키가 필요. `console.log('Hello, Runescar')` 작성 → 실행 → PASS.
9. 룬스카 9 미션(보스 포함) 완주 → `Runescar Champion` + `The Cursor Emperor` → **엔딩 크레딧 모달** 등장 (판타지 시 + 흐릿한 글로우).
10. 월드맵 하단의 "내보내기" → JSON 다운로드 → 다른 브라우저에서 "가져오기" → 진행도 복원.

## v2 예정

- 골드 & 상점 (힌트·터미널 테마)
- 풀 스킬 트리 시각화
- Supabase Auth + 글로벌 리더보드
- 추가 언어 (Go, Rust, TypeScript-only)
- 컨텐츠 백오피스 (DB 또는 MDX)

## 제약 (명시)

- `localStorage`만 사용 → 기기 변경 시 진행도 휘발 (JSON export/import 안전망).
- Judge0 무료 티어 **일 50회** 호출 한도. 실서비스는 유료 플랜 또는 self-host 필요.
- 터미널 트랙은 *가상 셸* — 실제 OS 학습 효과는 제한, 학습 흐름·자신감 형성에 충분.
- `monaco-vim`은 진짜 vim의 80~90% — 일부 매크로·ex 명령 제한.

## 📸 스크린샷

브라우저에서 직접 캡처해 `screenshots/` 폴더에 두면 README 에 자동 노출됩니다.
캡처 가이드는 [`screenshots/README.md`](screenshots/README.md) 를 참조.

## 📄 라이선스

[MIT](LICENSE) © 2026 Reasonofmoon
