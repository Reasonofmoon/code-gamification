# Screenshots

> README에 노출되는 스크린샷·GIF를 보관합니다. 모든 파일은 **PNG / GIF / WebP** 형식을 권장합니다.

## 📋 필요한 캡처 목록 (Capture Checklist)

아래 9개를 차례로 캡처해 이 폴더에 저장하면 한국어·영문 README에 그대로 임베드 가능합니다.
파일명은 정확히 맞춰 주세요 (README 임베드 경로가 고정되어 있어).

| # | 파일명 | 무엇을 캡처 | 권장 사이즈 |
|---|---|---|---|
| 1 | `worldmap.png` | 월드맵 (세 Realm 카드, Lv.0 상태에서 빔킵·룬스카는 잠금) | 1440×900 |
| 2 | `shellholm-list.png` | 셸홀름 대륙 진입 — 미션 8개 카드 (1번만 해제) | 1440×900 |
| 3 | `mission-terminal.png` | 셸홀름 미션 1 화면 — XTerm 가상 셸 + 브리핑 카드 | 1440×900 |
| 4 | `result-modal.png` | 미션 클리어 결과 모달 (★3 + XP + `First Spell` 뱃지) | 1440×900 |
| 5 | `mission-vim.gif` | 빔킵 미션 — Monaco 에디터 + `--NORMAL--` 모드 + 키 입력 애니메이션 | 1200×700, ≤8MB |
| 6 | `mission-code.png` | 룬스카 미션 — Monaco 코드 에디터 + Judge0 실행 결과 | 1440×900 |
| 7 | `hud.png` | 상단 HUD 클로즈업 — 레벨·XP 바·스트릭·뱃지 스트립 | 1440×120 |
| 8 | `ending-credits.png` | `The Cursor Emperor` 획득 후 엔딩 크레딧 모달 (시 일부) | 1440×900 |
| 9 | `mobile.png` | 모바일 뷰포트 (375×812) — 월드맵 | 750×1624 (Retina) |

## 🎬 캡처 방법

### 정지 이미지 (PNG)

**Windows**:
- 단축키 `Win + Shift + S` → 영역 캡처 → `screenshots/<파일명>.png` 로 저장
- 또는 ShareX / Greenshot 등 사용

**macOS**:
- `Cmd + Shift + 4` → 영역 드래그 → 자동 저장

### 애니메이션 GIF (vim 미션 키 입력 등)

- [LICEcap](https://www.cockos.com/licecap/) — 무료, 가벼움, GIF 출력
- [ScreenToGif](https://www.screentogif.com/) — Windows 전용, 프레임 편집 가능
- [Gifski](https://gif.ski/) — 고품질 GIF 변환 (mp4 → gif)
- macOS: `Cmd + Shift + 5` 동영상 캡처 → ffmpeg/Gifski 변환

**GIF 파일 크기 가이드**: GitHub README는 10MB 이하 권장. 8MB 이내가 안전.
- 해상도 1200×700 이하
- 프레임레이트 15fps
- 색상 팔레트 128~256

## 🖼️ README에 임베드하기

캡처를 다 모으면 `README.md` 와 `README.en.md` 의 상단 (헤더 아래) 또는 Highlights 섹션에 다음과 같이 추가:

```md
## 📸 미리보기

| 월드맵 | 미션 화면 (터미널) | 엔딩 크레딧 |
|---|---|---|
| ![](screenshots/worldmap.png) | ![](screenshots/mission-terminal.png) | ![](screenshots/ending-credits.png) |

### Vim 미션 (실시간 키 입력)
![](screenshots/mission-vim.gif)
```

## 🎨 스크린샷 캡처 시 팁

- **클린 상태**: 새 incognito 창에서 진행도 초기화 후 캡처 (월드맵·잠금 상태 자연스러움)
- **다크 모드**: 우리 테마는 다크 전제 — 시스템 다크 모드 활성화 후 캡처
- **DevTools 닫기**: F12 닫혀 있는지 확인
- **브라우저 chrome 제거**: 가능하면 전체화면 (F11) 또는 영역만 정확히
- **고해상도 디스플레이**: Retina 사용 시 GitHub 가 자동 처리, 별도 작업 불필요

## 🤝 PR 시 권장

스크린샷이 비어 있는 상태로도 README는 정상 동작합니다. 캡처가 준비되면 한 번에 add → commit:

```bash
git add screenshots/
git commit -m "docs: add demo screenshots"
git push
```
