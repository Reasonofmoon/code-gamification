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
