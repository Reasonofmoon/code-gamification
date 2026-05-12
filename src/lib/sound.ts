"use client";

/**
 * Web Audio API 기반 SFX 합성 — 라이브러리 0, 자산 파일 0.
 *
 * 모든 사운드는 단순 oscillator + envelope 로 합성됩니다.
 * 자동재생 정책 회피: 첫 호출 시 AudioContext.resume() 자동 처리.
 *
 * 사용:
 *   import { playSound } from '@/lib/sound';
 *   playSound('success');
 *
 * 토글:
 *   localStorage.setItem('codequest:sound', 'on'|'off');
 */

const STORAGE_KEY = "codequest:sound";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      const Cls = (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext ?? window.AudioContext;
      ctx = new Cls();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return ctx;
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "on";
}

export function setSoundEnabled(on: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
}

export function toggleSound(): boolean {
  const next = !isSoundEnabled();
  setSoundEnabled(next);
  return next;
}

/** 단일 톤 — sine/triangle/sawtooth/square + envelope. */
function tone(opts: {
  freq: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  delay?: number;
  attack?: number;
  release?: number;
}) {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  const {
    freq,
    duration,
    type = "sine",
    volume = 0.18,
    delay = 0,
    attack = 0.01,
    release = 0.08,
  } = opts;
  const start = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  // ADSR-like envelope (간략)
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + attack);
  gain.gain.setValueAtTime(volume, start + duration - release);
  gain.gain.linearRampToValueAtTime(0, start + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export type SoundId =
  | "ping"
  | "success"
  | "boss-encounter"
  | "level-up"
  | "chime"
  | "click";

/** 미리 정의된 SFX 프리셋 — 게임 내 의미적 이름으로 호출. */
export function playSound(id: SoundId) {
  if (!isSoundEnabled()) return;
  switch (id) {
    case "ping":
      // *띠링!* — 시스템 메시지
      tone({ freq: 880, duration: 0.12, type: "sine", volume: 0.12 });
      tone({ freq: 1320, duration: 0.18, type: "sine", volume: 0.1, delay: 0.04 });
      break;
    case "success":
      // 미션 클리어 — 메이저 3음 상승 (C-E-G)
      tone({ freq: 523.25, duration: 0.18, type: "triangle", volume: 0.15 });
      tone({ freq: 659.25, duration: 0.18, type: "triangle", volume: 0.15, delay: 0.12 });
      tone({ freq: 783.99, duration: 0.32, type: "triangle", volume: 0.18, delay: 0.24 });
      break;
    case "boss-encounter":
      // 보스 등장 — 깊은 sawtooth + sub bass
      tone({ freq: 80, duration: 0.9, type: "sawtooth", volume: 0.18, attack: 0.05, release: 0.4 });
      tone({ freq: 160, duration: 0.7, type: "sawtooth", volume: 0.1, delay: 0.1, attack: 0.05, release: 0.3 });
      tone({ freq: 55, duration: 1.2, type: "sine", volume: 0.22, attack: 0.1, release: 0.6 });
      break;
    case "level-up":
      // 레벨업 — 빠른 sparkle 5음
      [659.25, 783.99, 987.77, 1318.51, 1567.98].forEach((f, i) =>
        tone({ freq: f, duration: 0.14, type: "sine", volume: 0.13, delay: i * 0.06 })
      );
      break;
    case "chime":
      // 엔딩 — 부드러운 4음 chord
      [523.25, 659.25, 783.99, 1046.5].forEach((f) =>
        tone({ freq: f, duration: 1.2, type: "sine", volume: 0.08, attack: 0.2, release: 0.6 })
      );
      break;
    case "click":
      // 대화 진행 — 매우 짧은 high-freq click
      tone({ freq: 2200, duration: 0.04, type: "square", volume: 0.06, attack: 0.005, release: 0.02 });
      break;
  }
}
