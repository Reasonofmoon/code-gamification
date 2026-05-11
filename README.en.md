<div align="right">

[**English**](README.en.md) · [한국어](README.md)

</div>

# 👑 CodeQuest

> Learn **terminal · vim · programming languages** as a **classical fantasy RPG**.
> Three realms. Thirty-five missions. Twelve badges. One cursor to rule them all.

[![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Monaco Editor](https://img.shields.io/badge/Monaco-Editor-007ACC?style=flat&logo=visualstudiocode&logoColor=white)](https://microsoft.github.io/monaco-editor/)
[![XTerm.js](https://img.shields.io/badge/XTerm.js-Terminal-1A1A1A?style=flat&logo=gnubash&logoColor=white)](https://xtermjs.org/)
[![Judge0 API](https://img.shields.io/badge/Judge0-Code%20Execution-9333EA?style=flat)](https://judge0.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-FFCE58?style=flat)](LICENSE)

<!-- Optional dynamic badges (uncomment after pushing public):
[![Vercel Deploy](https://vercelbadge.vercel.app/api/Reasonofmoon/code-gamification)](https://code-gamification.vercel.app)
[![GitHub last commit](https://img.shields.io/github/last-commit/Reasonofmoon/code-gamification)](https://github.com/Reasonofmoon/code-gamification/commits/main)
[![GitHub stars](https://img.shields.io/github/stars/Reasonofmoon/code-gamification?style=social)](https://github.com/Reasonofmoon/code-gamification/stargazers)
-->

Inspired by [terminal-playground.netlify.app](https://terminal-playground.netlify.app/),
expanded into a full **fantasy-RPG learning journey**: terminal commands as
*apprentice spells*, vim motions as *sword forms*, and programming languages as
*ancient runes*.

> 🖼️ Screenshots: see [`screenshots/`](screenshots/) (capture guide included).

<!-- Uncomment after capturing screenshots/*.png — see screenshots/README.md
## 📸 Preview

| World Map | Terminal Mission | Ending Credits |
|---|---|---|
| ![](screenshots/worldmap.png) | ![](screenshots/mission-terminal.png) | ![](screenshots/ending-credits.png) |

### Vim Mission (live keystrokes)
![](screenshots/mission-vim.gif)
-->


---

## ✨ Highlights

- **Three realms, one quest**
  - 🔮 **Shellholm Harbor** — terminal commands on a virtual filesystem
  - ⚔️ **Vimkeep, City of Blades** — Monaco + monaco-vim (5 chapters, real vim modes)
  - 📜 **Runescar Grand Archive** — JS / Python executed via Judge0
- **35 missions, 12 badges, 3 dragon bosses**
- **Gamification stack** — XP, levels (1‑20), 1‑3 star rating, daily streak,
  badge cascade, ending credits poem on completion
- **No login** — progress lives in `localStorage`, exportable / importable as JSON
- **Zero graphic assets** — pure Tailwind cards + fantasy text + CSS animations

## 🏗️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | **Next.js 16** (App Router · TypeScript strict · Turbopack) |
| Styling | **Tailwind CSS 4** + custom fantasy theme (`globals.css`) |
| Vim simulator | **Monaco Editor** + **monaco-vim** (covers ~80‑90% of real vim) |
| Pseudo terminal | **XTerm.js** + custom `fake-shell.ts` (in‑memory VFS, whitelisted commands) |
| Code execution | **Judge0 RapidAPI** proxied through a Vercel Function (`/api/run-code`) |
| State | **Zustand** + `persist` middleware → `localStorage` |
| Schemas | **Zod** for missions, player state, API contracts |
| Hosting | **Vercel** (Fluid Compute, Node.js 24 LTS, Analytics, Speed Insights) |

## 🚀 Quick Start

```bash
git clone https://github.com/Reasonofmoon/code-gamification.git
cd code-gamification
npm install
cp .env.local.example .env.local   # paste Judge0 RapidAPI key (optional)
npm run dev
# open http://localhost:3000
```

The terminal and vim tracks work **without any keys**. The language track
(Runescar) needs a Judge0 RapidAPI key — free tier covers 50 runs / day.

## 🌐 Deploy

See [`DEPLOY.md`](DEPLOY.md) for the full Vercel deployment checklist
(7 sections: prerequisites · linking · env vars · first deploy · monitoring ·
troubleshooting · custom domain).

TL;DR:

```bash
npm i -g vercel
vercel link
vercel env add JUDGE0_RAPIDAPI_KEY
vercel env add JUDGE0_RAPIDAPI_HOST
vercel --prod
```

## 🗂️ Project Structure

```
src/
├─ app/
│  ├─ page.tsx                     # World map (3 realm cards)
│  ├─ realm/[realmId]/page.tsx     # Dungeon list (missions)
│  ├─ mission/[missionId]/page.tsx # Mission runner + lock guard
│  └─ api/run-code/route.ts        # Judge0 proxy (maxDuration=10)
├─ components/
│  ├─ game/    # Hud, XPBar, RealmCard, MissionCard, ResultModal,
│  │           # EndingCredits, BadgeStrip, StreakIndicator,
│  │           # ExportImportControls, DeployBadge
│  └─ mission/ # TerminalPanel (XTerm), VimEditor (monaco-vim), CodeEditor (Judge0)
├─ content/
│  ├─ realms.ts                    # Three Realm definitions
│  └─ missions/                    # 35 missions split by track
├─ lib/
│  ├─ store/game-store.ts          # Zustand + persist + hydration flag
│  ├─ terminal/                    # fake-shell.ts + check.ts
│  ├─ scoring.ts · badges.ts · utils.ts
└─ types/                          # Zod schemas (mission, player)
```

## 🎯 Design Decisions

1. **Fake shell over real OS access** — Whitelisted commands run against an
   in‑memory VFS. Zero security surface, zero infra cost, full pedagogical value.
2. **`monaco-vim` over a custom vim engine** — Battle‑tested. We accept the
   ~10‑20% gap (some macros / obscure ex commands) as a v2 stretch goal.
3. **Server‑side Judge0 proxy** — The API key never reaches the browser.
   Vercel Functions wrap the call with Zod input validation and a 10‑second
   `maxDuration` cap.
4. **TS objects as content store** — At 35 missions, a database is overkill.
   Mission definitions live in `src/content/missions/*.ts`, fully typed and
   greppable.
5. **Level‑up = realm unlock** — Not just a number. Progression is a gate that
   enforces the learning order: terminal → vim → languages.
6. **Hydration flag on the store** — Prevents the brief "I'm locked!" flash
   when localStorage is still rehydrating.

## 🧪 Smoke Test

1. `npm run dev` → http://localhost:3000 → three realm cards (Vimkeep & Runescar locked).
2. Enter **Shellholm Mission 1** → type `pwd` → first ★ + `First Spell` badge.
3. **URL guard**: navigate directly to `/mission/shellholm-05` while earlier
   missions are uncleared → automatic redirect to `/realm/shellholm`.
4. Refresh → progress survives (localStorage).
5. Clear all of Shellholm → level rises → Vimkeep unlocks at Lv.4.
6. Finish Vimkeep 18 → `Vimkeep Champion` + `Vim Sage` simultaneously.
7. Add Judge0 key → Runescar 1: `console.log('Hello, Runescar')` → PASS.
8. Clear Runescar 9 (boss) → `The Cursor Emperor` → **ending credits** modal.
9. World map footer → "Export" → JSON → another browser → "Import" → restored.

## 📜 The Twelve Badges

| Type | Badge | Trigger |
|---|---|---|
| Onboarding | ✨ First Spell | First mission cleared |
| Onboarding | 🗡️ Vim Novice | First Vimkeep mission |
| Onboarding | 🔯 Rune Reader | First Runescar mission |
| Skill | ⚡ Speedrunner | Three‑star clear |
| Skill | 🛡️ No‑Death Run | Cleared on first attempt |
| Streak | 🔥 Streak 7 | 7 consecutive learning days |
| Streak | 🌋 Streak 30 | 30 consecutive learning days |
| Champion | 🏆 Shellholm Champion | All Shellholm missions cleared |
| Champion | 🏆 Vimkeep Champion | All Vimkeep missions cleared |
| Champion | 🏆 Runescar Champion | All Runescar missions cleared |
| Mastery | 🧙 Vim Sage | All Vimkeep chapters mastered |
| Finale | 👑 The Cursor Emperor | All 35 missions cleared → ending credits |

## 🚧 Trade‑offs (acknowledged)

- **`localStorage` only** → progress is per‑device. Mitigated by JSON
  export / import. Cloud sync planned for v2.
- **Judge0 free tier: 50 runs / day** → fine for demo, paid plan or self‑host
  for production.
- **Fake shell** → limited real‑OS transfer. Good for confidence, not for
  shell scripting depth.
- **monaco‑vim** → ~80‑90% of real vim. Advanced macros and ex commands
  excluded for now.

## 🛣️ Roadmap (v2)

- Supabase Auth + cloud sync + global leaderboard
- Gold currency + shop (hints, terminal themes)
- Full skill tree visualization
- Additional language tracks (Go, Rust, TypeScript‑only)
- Mobile‑optimized layout
- LLM tutor (Vercel AI Gateway) for stuck players

## 🤝 Contributing

Issues and PRs welcome once the repo is public. Please run before opening a PR:

```bash
npx tsc --noEmit
npm run build
```

## 📄 License

[MIT](LICENSE) © 2026 Reasonofmoon

---

<sub>Inspired by [terminal-playground.netlify.app](https://terminal-playground.netlify.app/) and the long tradition of `vim-adventures`, `NetHack`, and Duolingo. Built solo by an EdTech developer who wanted to learn vim properly.</sub>
