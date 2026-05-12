# CodeQuest — Design Asset Specification

> 이 문서는 codex CLI(또는 다른 이미지 생성 도구)로 자산을 만들 때 사용하는 *프롬프트 명세서*입니다.
> 각 자산은 `public/` 하위 정해진 경로에 PNG로 저장되며, Next.js `<Image>` 또는 `<img>` 로 참조됩니다.

## 0. 글로벌 스타일 가이드

모든 자산은 동일한 스타일에 합치되어야 합니다 — 한 그림과 다른 그림이 *같은 화가의 손* 으로 보여야 합니다.

- **스타일**: 다크 판타지 일러스트, 약한 인쇄 텍스처. 부드러운 유화 느낌이지만 윤곽선은 또렷.
- **컬러 팔레트** (앱 테마 변수와 일치):
  - 배경 어둠: `#0b0a14` ~ `#14132099`
  - 액센트 황금: `#f7b955` ~ `#ffd479` (amber)
  - 마법 보라: `#8b5cf6` (violet)
  - 검 주황: `#f97316` (blade)
  - 룬 청록: `#22d3ee` (cyan, rune)
- **분위기**: 양피지·황혼·안개·흑요석·푸른 룬광. 사실적이지 않고 *전설 회화* 같은.
- **금지**: 셀카·만화풍·픽셀아트·현대 의상·풀-컬러 사실 사진.
- **해상도**: NPC 1024×1024 (정사각), Realm 1536×1024, Worldmap 2048×1280.
- **포맷**: PNG (투명 배경은 NPC만, Realm·Worldmap은 풀 배경).

---

## 1. NPC 초상화 (6장)

대화 패널의 좌측 원형 슬롯(64px)에 표시됨. 가슴 위 *반신*. 카메라 시선 정면 또는 약간 측면.

저장 경로: `public/npc/<id>.png`

### 1.1 `morgan.png` — 늙은 항해사 모르간 (셸홀름 멘토)

**프롬프트**:
> Oil painting portrait of an elderly seafarer named Morgan, head and shoulders, dark fantasy style. White-grey weathered beard, deep crow's feet around kind eyes, a faded blue captain's cap pulled low. He wears a salt-stained navy coat with tarnished brass buttons. Soft amber lantern light glows from his left side, behind him faint silhouettes of mast and rope ladders disappear into harbor mist. Mood: gentle mentor, calm wisdom. Color palette: deep navy, amber highlights, fog grey. No text. 1024x1024.

### 1.2 `cargos.png` — 부두 도적 카르고스 (셸홀름 보스)

**프롬프트**:
> Oil painting portrait of a dock thief named Cargos, head and shoulders, dark fantasy style. Scarred cheek, smug crooked grin, hooded leather jerkin with red sash. One golden tooth catches torchlight. A throwing dagger hangs at his collar. Background: crates and rope coils in stormy harbor at night, blade-orange torch glow. Mood: dangerous trickster, mocking. Color palette: oxidized brass, blade orange, deep teal shadows. No text. 1024x1024.

### 1.3 `kael.png` — 검사부 카엘 (빔킵 멘토)

**프롬프트**:
> Oil painting portrait of a stoic swordmaster named Kael, head and shoulders, dark fantasy style. Lean angular face, sharp dark eyes, hair tied in a tight topknot. Wears a charcoal grey kenjutsu robe with violet trim, the hilt of an over-shoulder katana visible behind. Behind him, faint geometric kata diagrams float in candle smoke. Mood: disciplined, restrained, watchful. Color palette: charcoal, ember violet, blade orange edge light. No text. 1024x1024.

### 1.4 `alphabetas.png` — 글자드래곤 알파베타스 (빔킵 보스)

**프롬프트**:
> Oil painting portrait of an ancient lettered dragon called Alphabetas. Long serpentine head and neck filling the frame, scales etched with glowing rune letters (latin & korean glyphs visible as faint embers). One amber slit-pupil eye dominates, second eye hidden behind torn scroll-like veil membranes. Mouth slightly open, breath like ink mist. Background: collapsed library shelves, burning manuscript pages floating up. Mood: arrogant, learned predator. Color palette: bronze scales, ember orange runes, deep violet smoke. No text. 1024x1024.

### 1.5 `seren.png` — 사서장 세렌 (룬스카 멘토)

**프롬프트**:
> Oil painting portrait of a young female head librarian named Seren, head and shoulders, dark fantasy style. Slender, refined posture, silver-blonde hair pinned with a small rune-shaped ornament. Soft eyes the color of cyan ink. Wears a high-collared scholar's robe — midnight blue with cyan rune embroidery at the chest. Holds a closed leather codex against her sternum. Background: tall arched bookshelves dissolving into blue void mist, glowing rune motes float. Mood: gentle erudition, quiet awe. Color palette: ink black, rune cyan, soft moonlight. No text. 1024x1024.

### 1.6 `codex.png` — 아카식의 시험관 코덱스 (룬스카 보스)

**프롬프트**:
> Oil painting portrait of a transcendental examiner named Codex, the Akashic. Not human — a tall figure made of overlapping translucent paper layers, each layer covered with shifting runes. Where a face should be, a single glowing cyan eye-rune floats inside a blank parchment void. Tattered cloak edges drift like loose pages. Behind: an infinite ring of orbiting tomes around a void-altar. Mood: cold transcendence, judgment without malice. Color palette: parchment white, void black, rune cyan, faint amber. No text. 1024x1024.

---

## 2. Realm 카드 일러스트 (3장)

월드맵 카드 *배경*으로 사용 (현재 단색 그라데이션 위치). 카드 크기 약 360×220.

저장 경로: `public/realm/<id>.png`

### 2.1 `shellholm.png` — 셸홀름 항구

**프롬프트**:
> Wide landscape illustration of a misty harbor town named Shellholm at dawn, dark fantasy style. Crooked wooden piers stretch into pale fog, sailing ships with tattered sails half-visible. Lanterns line the boardwalk like floating fireflies. In the distance, jagged cliffs disappear into purple-grey clouds. No people. Mood: melancholy beginning, hopeful first breath. Color palette: foggy navy, amber lantern, slate cliff grey. No text. 1536x1024.

### 2.2 `vimkeep.png` — 빔킵 검의 도시

**프롬프트**:
> Wide landscape illustration of a mountain-side city of swordsmiths named Vimkeep at sunset, dark fantasy style. Towering granite walls carved with kanji-like glyphs, training courtyards visible through narrow archways, banners with brushstroke characters. A lone silhouetted swordsman stands on a high tier looking outward. Sky burns ember-orange behind violet peaks. Mood: disciplined, austere grandeur. Color palette: granite charcoal, ember violet sky, blade orange edge. No text. 1536x1024.

### 2.3 `runescar.png` — 룬스카 원형도서관

**프롬프트**:
> Wide landscape illustration of a vast circular library called Runescar, dark fantasy style. Concentric rings of impossibly tall bookshelves descend into a glowing cyan void at center. Floating rune scrolls drift between the shelves like jellyfish. A narrow stone bridge spans the void toward a distant altar of obsidian. No people visible. Mood: cosmic erudition, sacred quiet. Color palette: ink black, rune cyan glow, parchment white motes. No text. 1536x1024.

---

## 3. 월드맵 (1장)

홈 페이지(`/`) 상단에 *아카식의 지도* 부제 아래 띠 배경으로 사용. 가로로 긴 일러스트.

저장 경로: `public/worldmap/akashic-map.png`

**프롬프트**:
> Wide horizontal aged-parchment fantasy map called 'The Akashic Map'. From left to right: a misty harbor labeled in glyphs (Shellholm), a granite mountain city (Vimkeep), a circular abyss-library (Runescar). Connected by a hand-drawn route line. Faint glowing rune annotations float above. The far-left edge shows a faded grey wasteland (Greyhwell — origin). The far-right edge shows an obsidian altar within the abyss. Mood: ancient and sacred chart, mysterious. Color palette: yellowed parchment, ink brown, faint rune cyan glow. No modern lettering — only stylized rune-like marks. 2048x1280.

---

## 4. 사용 위치 (Wiring)

| 자산 | 사용 위치 | 컴포넌트 |
|---|---|---|
| `public/npc/<id>.png` | 대화 패널 좌측 원형 슬롯 | `DialoguePanel.tsx` |
| `public/realm/<id>.png` | Realm 카드 배경 (반투명 오버레이) | `RealmCard.tsx` |
| `public/worldmap/akashic-map.png` | 홈 페이지 부제 아래 배경 띠 | `app/page.tsx` |

자산이 부재하면 기존 이모지/그라데이션 fallback 유지. 점진적 도입 OK.

---

## 5. 검증 체크리스트

생성된 PNG를 폴더에 넣고:

- [ ] 6 NPC: 같은 화풍·동일 라이팅 방향·동일 톤 (한 명만 셀카 풍이면 전체 톤 깨짐)
- [ ] 3 Realm: 같은 hour-of-day 라인(셸홀름=새벽, 빔킵=황혼, 룬스카=영원의 밤) 일관성
- [ ] 1 Worldmap: 양피지 톤이 우리 앱 다크 배경에서 잘 보이는지 (대비 충분)
- [ ] 파일 크기: NPC < 400KB, Realm < 800KB, Worldmap < 1.5MB (LCP 보호)
- [ ] 텍스트 없음 — 모든 라벨은 우리 UI에서 처리

---

## 5b. Wave 2 — 스토리 확장 자산 (5장)

Wave 1 (10장) 의 모르간 portrait 톤을 *스타일 앵커* 로 유지. 동일 다크 판타지 유화·
동일 팔레트·동일 라이팅 방향.

### 5b.1 `public/realm/wasteland.png` — 잿빛 황무지 (Greywhell)

게임 *시작 이전 세계* — 도입/엔딩 회상 또는 잠재 튜토리얼 미션 배경.

**프롬프트** (1536×1024):
> Wide landscape illustration of a desolate gray wasteland named Greywhell at twilight, dark fantasy style. Endless cracked dry earth fading into ashen mist. Twisted dead trees lean in the wind. Far in the distance, a sheer cliff drops into a chasm where Shellholm harbor barely glimmers below. Faint violet aurora threads pulse in the sky, hinting at residual ether. No people. Mood: melancholy origin, the world before the journey. Color palette: ash grey, dust beige, faint violet aurora, deep shadow. No text. 1536x1024.

### 5b.2 `public/npc/kai.png` — 주인공 카이 (자아·분신·엔딩용)

플레이어의 *서사적 대리자*. 18세 견습생. 공허의 낙인이 가슴에 빛남.

**프롬프트** (1024×1024):
> Oil painting portrait of a young apprentice named Kai, 18 years old, head and shoulders, dark fantasy style. Wind-tousled black hair, dust-streaked face, alert dark eyes carrying both fear and resolve. Wears a torn travel cloak the color of ash, hood drawn back. On his chest a violet rune-mark glows softly through his tunic — the Void Seed. Behind him: blurred fog and the silhouette of cliffs. Mood: vulnerable but determined, the marked apprentice. Color palette: ash grey, soot black, violet glow, dim amber rim light. No text. 1024x1024.

### 5b.3 `public/npc/ella.png` — 엘라 할머니 (도입 멘토)

카이의 첫 후견인. 잿빛 황무지 마을의 원로. 모르간보다 *더 늙고 더 약함*, 하지만 의지는 강함.

**프롬프트** (1024×1024):
> Oil painting portrait of an elderly village elder named Ella, head and shoulders, dark fantasy style. Deep wrinkles, sparse white hair pulled back, thin shoulders bowed but spine straight. She wears a faded grey shawl over a homespun tunic, clutching a small dim ether crystal close to her heart. Soft tear-trail catches faint light. Behind her: a humble hut interior with sparse herbs hanging from beams. Mood: dignified frailty, fierce protective love. Color palette: dust grey, faded indigo shawl, gentle amber crystal glow. No text. 1024x1024.

### 5b.4 `public/npc/lionel.png` — 감찰관 리오넬 (도입 적대자)

중앙에서 파견된 차가운 감찰관. 카이를 *불결한 존재* 로 멸시.

**프롬프트** (1024×1024):
> Oil painting portrait of a cold imperial inspector named Lionel, head and shoulders, dark fantasy style. Sharp aquiline features, contemptuous half-smile, pale steel-blue eyes. Wears a tall-collared lacquered black uniform with silver epaulettes and a violet-and-gold sash of office. A polished badge at his throat catches harsh light. Behind him: armored cavalry silhouettes blur into ashen sky. Mood: aristocratic cruelty, disdain. Color palette: lacquer black, silver, blood-red sash threads, cold steel highlights. No text. 1024x1024.

### 5b.5 `public/realm/void-altar.png` — 공허의 제단 (룬스카 보스 무대)

룬스카 가장 깊은 자리. 보스 코덱스의 시험이 벌어지는 곳. 풀스크린 보스 컷씬 배경용.

**프롬프트** (1536×1024):
> Wide landscape illustration of an ancient void altar deep within the Runescar archive, dark fantasy style. A circular obsidian platform floats in cyan-lit abyss, ringed by tall pillars of stacked floating books. From the platform's center rises a black stone altar etched with glowing rune circles, behind which an enormous void-eye floats, lid half-closed. Streams of glowing parchment drift like incense. No people. Mood: sacred trial, cosmic stillness before judgment. Color palette: obsidian black, deep void blue, rune cyan, amber motes. No text. 1536x1024.

---

## 5d. Wave 3 — Oracle Tower (AI 시대 트랙) 자산 (3장)

새 4번째 대륙의 풍경 + NPC + 보스. 동일 스타일 앵커 유지.

### 5d.1 `public/realm/oracle-tower.png` — 기계 신탁의 탑

**프롬프트** (1536×1024):
> Wide landscape illustration of a tall cylindrical tower of polished obsidian called The Tower of Machine Oracles, dark fantasy meets retro-future. Concentric platforms rise into starless sky; each level shows faint cyan holographic glyphs floating in mid-air. At the top a vast eye-shaped lens stares down. Below the tower, ancient cables of woven silver thread snake into the ground. No people. Mood: sacred technology, oracle architecture from a forgotten future. Color palette: obsidian black, neon cyan glyphs, soft amber accent lamps, deep void. No text. 1536x1024.

### 5d.2 `public/npc/memoria.png` — 사서 메모리아 (Oracle Tower 멘토)

**프롬프트** (1024×1024):
> Oil painting portrait of a serene mid-30s scribe named Memoria, head and shoulders, dark fantasy meets retro-future. Short ink-black hair, calm grey-cyan eyes, faint constellation tattoos at her temples. Wears a high-collared midnight-navy robe with cyan circuit embroidery along the shoulders. Holds a small floating prism of light over her open palm. Behind her: holographic glyphs drift through dim air. Mood: precise, gentle, futurist librarian. Color palette: midnight navy, neon cyan circuit lines, parchment skin, ember pin-lights. No text. 1024x1024.

### 5d.3 `public/npc/mirror-kai.png` — 거울의 카이 (Oracle Tower 보스)

Wave 2의 `kai.png` 와 *대칭 변주* — 같은 인물의 *거울 자아*.

**프롬프트** (1024×1024):
> Oil painting portrait of a mirror-image apprentice — visually similar to Kai but with key inversions — head and shoulders, dark fantasy style. Same youthful face but with cyan-glowing eyes instead of dark, a thin cracked-glass texture flickers across the skin. Wears the same torn cloak but with cyan rune-circuit threads woven through where Kai's was plain ash. The Void Seed on his chest shines reversed — cyan instead of violet. Behind him: a fractured mirror frame, shards floating mid-air. Mood: uncanny doppelgänger, neutral judging gaze. Color palette: cold cyan, fractured mirror silver, ash undertone, violet residue. No text. 1024x1024.

---

## 5c. Wave 2 사용 위치 (계획)

| 자산 | 사용처 |
|---|---|
| `realm/wasteland.png` | 엔딩 크레딧 첫 verse 배경 / 메타 스토리 회상 / (선택) 튜토리얼 미션 배경 |
| `npc/kai.png` | 엔딩 크레딧 마지막 verse / 시스템 메시지 자기 자신 대화 |
| `npc/ella.png` | 도입 튜토리얼 미션 NPC (현재 없음, v2 컨텐츠) / 또는 셸홀름 미션 1 인트로 회상 |
| `npc/lionel.png` | 셸홀름 미션 6 (소멸 주문) 또는 보스 시퀀스의 잿빛 황무지 회상 |
| `realm/void-altar.png` | `runescar-09` boss-enter step 풀스크린 배경 |

---

## 6. Codex CLI 호출 예시

```bash
# 1장 시범 (모르간)
codex exec --sandbox workspace-write \
  "Read assets/spec.md section 1.1. Generate the image described as a PNG, \
   save to public/npc/morgan.png at 1024x1024."

# 9장 일괄
codex exec --sandbox workspace-write \
  "Read assets/spec.md. For every prompt in sections 1, 2, 3, generate the \
   image and save to the exact path noted. Use the OpenAI Images API \
   (gpt-image-1 model preferred, fall back to dall-e-3). Keep style consistent \
   across all 10 images by reusing the global style guide prefix."
```

대안 (codex가 이미지 도구를 못 호출하는 경우):
- ChatGPT 웹 UI에 각 프롬프트를 직접 붙여 넣어 한 장씩 생성 후 다운로드
- Vercel AI Gateway 의 `openai/gpt-image-1` 라우트 호출
- 외부 도구: Midjourney, Leonardo, SDXL 로컬
