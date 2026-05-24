import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outRoot = path.join(root, "public/forge-cards");

const cards = [
  ["realm/forge-of-origin.png", "anvil", ["#ff7a3d", "#7ed8e6"], 9],
  ["npc/ever.png", "smith", ["#f0e3c5", "#ff7a3d"], 5],
  ["npc/cory.png", "wings", ["#7ed8e6", "#f0e3c5"], 7],
  ["npc/glitch.png", "wraith", ["#7ed8e6", "#6d5dfc"], 11],
  ["boss/boss-1-forgotten-add.png", "split", ["#ff7a3d", "#7fbf95"], 13],
  ["boss/boss-2-conflict-trap.png", "crack", ["#7ed8e6", "#ff7a3d"], 15],
  ["boss/boss-3-wrong-forge.png", "inferno", ["#ff3d2e", "#ffb347"], 17],
  ["mission/forge-01-pwd.png", "map", ["#f0e3c5", "#7ed8e6"], 19],
  ["mission/forge-02-mkdir-cd.png", "carve", ["#ff7a3d", "#f0e3c5"], 21],
  ["mission/forge-03-version-auth.png", "seals", ["#7ed8e6", "#7fbf95"], 23],
  ["mission/forge-04-init.png", "ignite", ["#ff7a3d", "#ffb347"], 25],
  ["mission/forge-05-echo.png", "ingot", ["#f0e3c5", "#2b3d5c"], 27],
  ["mission/forge-06-status-add.png", "redgreen", ["#ff4b4b", "#7fbf95"], 29],
  ["mission/forge-07-commit-log.png", "scroll", ["#f0e3c5", "#ff7a3d"], 31],
  ["mission/forge-boss-1-forgotten-add.png", "split", ["#ff7a3d", "#7fbf95"], 33],
  ["mission/forge-08-gh-auth-scope.png", "gate", ["#7ed8e6", "#7fbf95"], 35],
  ["mission/forge-09-gh-repo-create.png", "bridge", ["#ffb347", "#7ed8e6"], 37],
  ["mission/forge-10-push.png", "comet", ["#ff7a3d", "#7ed8e6"], 39],
  ["mission/forge-11-branch-switch.png", "branch", ["#7fbf95", "#ff7a3d"], 41],
  ["mission/forge-12-merge.png", "merge", ["#ffb347", "#7fbf95"], 43],
  ["mission/forge-boss-2-conflict.png", "crack", ["#7ed8e6", "#ff7a3d"], 45],
  ["mission/forge-13-gitignore.png", "ward", ["#7fbf95", "#2b3d5c"], 47],
  ["mission/forge-14-pr-create.png", "proposal", ["#f0e3c5", "#ff3d2e"], 49],
  ["mission/forge-15-pr-merge.png", "seal", ["#ffb347", "#7ed8e6"], 51],
  ["mission/forge-boss-3-wrong-forge.png", "inferno", ["#ff3d2e", "#ffb347"], 53],
];

function hashNoise(seed) {
  return Array.from({ length: 44 }, (_, i) => {
    const x = (Math.sin(seed * 91 + i * 17) + 1) * 512;
    const y = (Math.cos(seed * 53 + i * 23) + 1) * 768;
    const r = 1.5 + ((seed + i) % 5);
    const o = 0.08 + ((seed * i) % 9) / 80;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="#f0e3c5" opacity="${o.toFixed(2)}"/>`;
  }).join("");
}

function motif(kind, a, b) {
  const common = `stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"`;
  const stroke = `stroke="${a}" stroke-width="14" fill="none" ${common}`;
  const thin = `stroke="${b}" stroke-width="6" fill="none" ${common}`;
  switch (kind) {
    case "smith":
      return `<circle cx="512" cy="500" r="125" fill="#f0e3c5" opacity=".18"/><path ${stroke} d="M332 895h360M420 750h184l88 145H332l88-145z"/><path ${thin} d="M432 480q80-96 160 0M410 575q102 80 204 0M512 630v145"/>`;
    case "wings":
      return `<path ${stroke} d="M502 740q-220-160-330-18 180 18 276 126M522 740q220-160 330-18-180 18-276 126"/><circle cx="512" cy="655" r="44" fill="${b}" opacity=".8"/><path ${thin} d="M512 705v245M445 925h134"/>`;
    case "wraith":
      return `<path d="M350 515q160-210 324 0l-38 450-88-76-58 110-58-110-88 76z" fill="${a}" opacity=".18" filter="url(#glow)"/><circle cx="456" cy="570" r="18" fill="${b}"/><circle cx="568" cy="570" r="18" fill="${b}"/><path ${thin} d="M345 770h334M378 838h268M418 908h184"/>`;
    case "split":
      return `<path d="M92 0h418v1536H92z" fill="#ff4b4b" opacity=".08"/><path d="M514 0h418v1536H514z" fill="#7fbf95" opacity=".08"/><path ${stroke} d="M252 850h235M537 850h235"/><path ${thin} d="M352 850q44-118 88 0M612 850q44-118 88 0"/><path ${thin} d="M512 260v1040"/>`;
    case "crack":
      return `<path ${stroke} d="M168 300h255l86 210 95-210h252"/><path ${thin} d="M513 120l-44 254 80 170-68 190 58 202-112 450"/><path ${thin} d="M235 888h554M210 1016h600"/>`;
    case "inferno":
      return `<path d="M512 1240C270 1040 380 804 466 688c-18 160 72 206 72 206 0-214 168-304 168-304-18 178 138 280 88 448-37 125-154 202-282 202z" fill="${a}" opacity=".62" filter="url(#glow)"/><path ${thin} d="M250 760h524M300 675h420M365 590h300"/><path ${stroke} d="M362 1110h300"/>`;
    case "map":
      return `<circle cx="512" cy="760" r="265" ${thin}/><circle cx="512" cy="760" r="138" ${thin}/><path ${stroke} d="M512 485v550M237 760h550M350 600l324 324M674 600L350 924"/>`;
    case "carve":
      return `<path ${stroke} d="M260 910h504M340 760h344l80 150H260l80-150z"/><path ${thin} d="M512 260v430M430 350l82-90 82 90"/>`;
    case "seals":
      return `<circle cx="392" cy="735" r="122" ${stroke}/><circle cx="632" cy="735" r="122" ${stroke}/><path ${thin} d="M340 735h104M392 683v104M592 735q55-70 110 0q-55 70-110 0"/>`;
    case "ignite":
      return `<circle cx="512" cy="850" r="230" fill="${a}" opacity=".16"/><path ${stroke} d="M312 1010h400M512 510c-90 132 24 176 0 284 110-86 150 30 114 116-36 84-172 96-228 0-42-72-8-150 44-214"/>`;
    case "ingot":
      return `<path d="M318 778h388l86 158H232z" fill="${a}" opacity=".32" filter="url(#glow)"/><path ${thin} d="M318 778h388l86 158H232zM396 778l-44 158M626 778l44 158"/>`;
    case "redgreen":
      return `<path ${stroke} d="M250 820h220M554 820h220"/><circle cx="360" cy="720" r="70" fill="#ff4b4b" opacity=".45"/><circle cx="664" cy="720" r="70" fill="#7fbf95" opacity=".45"/><path ${thin} d="M468 720h88m0 0-36-36m36 36-36 36"/>`;
    case "scroll":
      return `<path d="M320 430h384v650q-96-64-192 0-96-64-192 0z" fill="#f0e3c5" opacity=".2"/><path ${thin} d="M360 560h304M360 680h304M360 800h230M416 1010q96-60 192 0"/>`;
    case "gate":
      return `<path ${stroke} d="M512 360l262 150v300l-262 150-262-150V510z"/><path ${thin} d="M512 520v300M392 670h240M512 520l84 150-84 150-84-150z"/>`;
    case "bridge":
      return `<path ${stroke} d="M142 1020q370-520 740 0"/><path ${thin} d="M245 912h534M318 812h388M406 710h212"/><circle cx="830" cy="430" r="96" fill="${b}" opacity=".18"/>`;
    case "comet":
      return `<path ${stroke} d="M218 1025q196-260 570-516"/><path d="M736 462l120 28-84 90z" fill="${a}" filter="url(#glow)"/><path ${thin} d="M308 1020l-94 34M418 875l-110 48M548 730l-122 68"/>`;
    case "branch":
      return `<path ${stroke} d="M512 1120V430M512 710q-180-80-248-260M512 760q190-54 265-230"/><circle cx="512" cy="430" r="44" fill="${a}"/><circle cx="264" cy="450" r="44" fill="${b}"/><circle cx="777" cy="530" r="44" fill="${b}"/>`;
    case "merge":
      return `<path ${stroke} d="M292 420q0 330 220 420 220-90 220-420"/><path ${thin} d="M512 840v290M402 1018h220"/><circle cx="292" cy="420" r="44" fill="${a}"/><circle cx="732" cy="420" r="44" fill="${a}"/><circle cx="512" cy="840" r="50" fill="${b}"/>`;
    case "ward":
      return `<path ${stroke} d="M512 310l250 118v270q0 260-250 442-250-182-250-442V428z"/><path ${thin} d="M400 665h224M400 785h224M444 905h136"/>`;
    case "proposal":
      return `<path d="M340 410h344v560l-172 150-172-150z" fill="#f0e3c5" opacity=".22"/><circle cx="512" cy="832" r="70" fill="${a}" opacity=".65" filter="url(#glow)"/><path ${thin} d="M394 560h236M394 670h236M512 902v180"/>`;
    case "seal":
      return `<circle cx="512" cy="755" r="220" fill="${a}" opacity=".18" filter="url(#glow)"/><path ${stroke} d="M350 755l108 108 220-230"/><circle cx="512" cy="755" r="290" ${thin}/>`;
    default:
      return `<path ${stroke} d="M252 925h520M352 770h320l100 155H252z"/><circle cx="512" cy="540" r="130" ${thin}/>`;
  }
}

function svgFor(file, kind, colors, seed) {
  const [a, b] = colors;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1536" viewBox="0 0 1024 1536">
  <defs>
    <radialGradient id="ember" cx="50%" cy="58%" r="70%">
      <stop offset="0%" stop-color="${a}" stop-opacity=".34"/>
      <stop offset="38%" stop-color="#2b3d5c" stop-opacity=".42"/>
      <stop offset="100%" stop-color="#1a1410"/>
    </radialGradient>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="50%" stop-color="#2b3d5c" stop-opacity=".72"/>
      <stop offset="100%" stop-color="#100b08"/>
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="7" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="3" seed="${seed}" result="noise"/>
      <feColorMatrix in="noise" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="table" tableValues="0 .16"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="1024" height="1536" fill="url(#wash)"/>
  <rect width="1024" height="1536" fill="url(#ember)"/>
  <path d="M90 1480C160 980 50 610 280 260C432 28 682 72 824 250C1002 474 826 832 946 1480Z" fill="#000" opacity=".22"/>
  <circle cx="512" cy="810" r="430" fill="${a}" opacity=".08" filter="url(#glow)"/>
  ${hashNoise(seed)}
  ${motif(kind, a, b)}
  <g opacity=".22" stroke="#7ed8e6" stroke-width="2" fill="none">
    <path d="M138 216h748M138 1320h748"/>
    <path d="M180 172q332 82 664 0M180 1364q332-82 664 0"/>
  </g>
  <rect width="1024" height="1536" filter="url(#grain)" opacity=".55"/>
  <rect x="38" y="38" width="948" height="1460" rx="42" fill="none" stroke="#f0e3c5" stroke-opacity=".08" stroke-width="3"/>
</svg>`;
}

await Promise.all(["realm", "npc", "boss", "mission"].map((dir) => fs.mkdir(path.join(outRoot, dir), { recursive: true })));

let total = 0;
for (const [file, kind, colors, seed] of cards) {
  const output = path.join(outRoot, file);
  const svg = svgFor(file, kind, colors, seed);
  const png = await sharp(Buffer.from(svg)).png({ quality: 95 }).toBuffer();
  await fs.writeFile(output, png);
  total += png.length;
  console.log(`OK ${file} ${png.length}`);
}
console.log(`DONE ${cards.length} cards ${total} bytes`);
