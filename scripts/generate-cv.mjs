/**
 * Generates public/cv.pdf with full portfolio details.
 * Run: npm run cv
 */
import { jsPDF } from 'jspdf';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public', 'cv.pdf');

const doc = new jsPDF({ unit: 'pt', format: 'a4' });
const W = doc.internal.pageSize.getWidth();
const H = doc.internal.pageSize.getHeight();
const margin = 48;
const maxY = H - 48;
let y = 48;

const ink = [17, 17, 17];
const mute = [85, 85, 85];
const accent = [200, 70, 40];

function ensureSpace(need = 40) {
  if (y + need > maxY) {
    doc.addPage();
    y = 48;
  }
}

function line(text, opts = {}) {
  const {
    size = 10,
    color = ink,
    bold = false,
    x = margin,
    maxW = W - margin * 2,
    gap = 2,
  } = opts;
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...color);
  const lines = doc.splitTextToSize(String(text), maxW);
  ensureSpace(lines.length * (size + 3) + gap + 8);
  doc.text(lines, x, y);
  y += lines.length * (size + 3) + gap;
}

function rule() {
  ensureSpace(16);
  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.6);
  doc.line(margin, y, W - margin, y);
  y += 12;
}

function section(title) {
  y += 10;
  ensureSpace(36);
  line(title.toUpperCase(), { size: 10, bold: true, color: accent, gap: 4 });
  rule();
}

// ── Header ──
line('Rishu Kumar Gupta', { size: 20, bold: true, gap: 3 });
line('aka Rishabh', { size: 11, color: mute, gap: 3 });
line('Blockchain Builder & Crypto Community Participant', {
  size: 11,
  color: mute,
  gap: 4,
});
line('Gopalganj, Bihar, India · Building since 2020', { size: 9, color: mute, gap: 3 });
line(
  'Email: rishu4436@gmail.com  ·  Telegram: @rishug4436  ·  GitHub: github.com/rishu4436',
  { size: 8.5, color: mute, gap: 2 }
);
line('X: @rishabh4436  ·  t.me/rishug4436', { size: 8.5, color: mute, gap: 6 });
rule();

// ── Profile ──
section('Profile');
line(
  'I am a blockchain builder and crypto community participant with deep experience exploring decentralized technologies since 2020. I focus on turning ideas into functional on-chain products that combine technical integrity with real user value.',
  { size: 9.5, gap: 4 }
);
line(
  'I ship products across ecosystems (including LitChess on LitVM), contribute to on-chain development with LitecoinVM and IOPn, and engage in builder programs, ambassador-style community work, and collaborative Web3 projects. Interests: blockchain infrastructure, DeFi, prediction markets, on-chain gaming, EVM and Solana, discipline and risk management, and Discord tools that deliver real utility.',
  { size: 9.5, gap: 4 }
);
line(
  'I favor clean, iterative shipping with practical tools and AI assistance for rapid prototyping, without sacrificing production quality.',
  { size: 9.5, gap: 4 }
);

// ── Highlight ──
section('Key highlight');
line('2nd Place — Track 1 · BNB Hack: AI Trading Agent Edition (2026)', {
  size: 10.5,
  bold: true,
  gap: 3,
});
line(
  'Co-hosted by BNB Chain × CoinMarketCap × Trust Wallet. Project: Genesis — self-custody autonomous trading agent (CMC signal fusion, hard risk rules, TWAK / PancakeSwap execution, Strategy Skill generator). Track 1 prize pool $24,000. Official announcement: x.com/BNBChainDevs/status/2074807300632858776',
  { size: 9.5, gap: 4 }
);

// ── Built projects ──
section('Products I built');
const built = [
  {
    t: 'Genesis — AI Autonomous Trading Agent',
    d: '2nd place Track 1 at BNB Hack AI Trading Agent Edition. Self-custody agent with CMC MCP signals, risk manager veto, TWAK local signing, FastAPI dashboard, Track 2 strategy skills. Stack: Python, CMC MCP, TWAK, Grok/LLM, FastAPI. Repo: github.com/rishu4436/Genesis',
  },
  {
    t: 'LitChess — On-chain Chess (LitVM)',
    d: 'Decentralized chess dApp on LitVM with on-chain escrow betting (zkLTC), ranked play, practice vs AI, and transparent settlement. Stack: Solidity, Next.js, wagmi, Hardhat, chess.js. Live: litchess.in · github.com/rishu4436/litchess',
  },
  {
    t: 'OPN RewardVault — Merkle Rewards (OPN Chain)',
    d: 'On-chain reward distribution with Merkle proofs for giveaways, bounties, and campaigns. CSV → root → claim flow with dashboard. Stack: Solidity, Hardhat, Next.js, wagmi, merkletreejs. Live: opn-rewardvault-frontend.vercel.app · github.com/rishu4436/opn-rewardvault',
  },
];
for (const p of built) {
  line(p.t, { size: 10, bold: true, gap: 2 });
  line(p.d, { size: 9, color: mute, gap: 7 });
}

// ── Markets as user ──
section('Markets I participate in (as user)');
const markets = [
  {
    t: 'Qwerti — Role: Cryptan',
    d: 'DeFAI aggregator. TGE planned Q3. Referral: app.qwerti.ai/?ref=146-41077 · Site: qwerti.ai · Discord: discord.gg/sHR3xUaERf',
  },
  {
    t: 'Pieverse — Role: User',
    d: 'TGE completed. Earned: $59. Site: pieverse.io',
  },
  {
    t: 'AllScale — Role: Verified',
    d: 'TGE not announced. Referral: app.allscale.io/s/MOvrBWL · Site: allscale.io · Discord: discord.gg/brrNy4Z8Hp',
  },
  {
    t: 'TermMax — Role: Sentinel',
    d: 'Term Structure Finance (BNB alpha). TGE planned Q3. Referral: app.termmax.ts.finance/alpha/call-put?ref=V4VB6D&chain=bnb · Site: ts.finance · Discord: discord.gg/V32HVv5Rgz',
  },
];
for (const m of markets) {
  line(m.t, { size: 10, bold: true, gap: 2 });
  line(m.d, { size: 9, color: mute, gap: 7 });
}

// ── Community recognition ──
section('Community recognition');
const recognition = [
  'Qwerti (Sunny): Shoutout for activity, helping community, events — won Legend role.',
  'Qwerti (Sir Glimor): Congrats as first Qwertian in server — @RISHABH | QWERTI.',
  'Qwerti (reeb): “My fvrt in qwerti.”',
  'LitChess (BenDoverr): “nice GUI” / profile looks really good.',
  'BNB Chain Developers: Official Track 1 winners post — Genesis 2nd place.',
];
for (const r of recognition) {
  line(`• ${r}`, { size: 9, color: mute, gap: 3 });
}

// ── Skills ──
section('Skills & stack');
line(
  'Solidity · Hardhat · Next.js · TypeScript · React · wagmi/viem · RainbowKit · Python · LLM agents · CMC MCP · TWAK · Merkle trees · Tailwind · Framer Motion · Community ops · Discord systems · AI-assisted prototyping',
  { size: 9.5, gap: 4 }
);

// ── Open to ──
section('Open to');
line(
  'Ambassador programs · builder initiatives · collaborative Web3 projects · on-chain products · LitVM / OPN / BNB ecosystem work.',
  { size: 9.5, gap: 8 }
);

line(
  '— Rishu Kumar Gupta · Portfolio CV · Updated 2026 · github.com/rishu4436',
  { size: 8, color: [140, 140, 140], gap: 2 }
);

mkdirSync(dirname(out), { recursive: true });
const buf = Buffer.from(doc.output('arraybuffer'));
writeFileSync(out, buf);
console.log('Wrote', out, `(${buf.length} bytes)`);
