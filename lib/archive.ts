/**
 * Portfolio archive for the four sides.
 * Facts come from repository READMEs, GitHub homepages, and files already in this repo.
 * A responding URL is not treated as Live unless the project itself is the verified deployment.
 */

export type WorkStatus = "Live" | "Prototype" | "In progress";

export type WorkGroup = "Agents" | "Markets" | "On-chain" | "Payments";

export type WorkLink = {
  href: string;
  label: string;
};

export type WorkRecord = {
  id: string;
  name: string;
  summary: string;
  status: WorkStatus;
  category: string;
  group: WorkGroup;
  stack: string[];
  repo: string;
  demo?: WorkLink;
  proof?: WorkLink;
  note?: string;
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
};

export const WORK: WorkRecord[] = [
  {
    id: "genesis",
    name: "Genesis",
    summary:
      "Self-custody autonomous trading agent for the BNB Chain × CoinMarketCap × Trust Wallet hackathon. CMC signals, hard risk rules, TWAK execution, and a Track 2 strategy spec.",
    status: "Prototype",
    category: "Autonomous trading agent",
    group: "Agents",
    stack: ["Python", "FastAPI", "CMC MCP", "TWAK", "Pydantic"],
    repo: "https://github.com/rishu4436/Genesis",
    proof: {
      href: "https://x.com/BNBChainDevs/status/2074807300632858776",
      label: "BNB Chain announcement",
    },
    note: "No public deployment is listed. The repository describes a local dashboard.",
    image: "/projects/genesis.png",
    imageAlt: "Genesis mark, a gold G on a dark square",
    imageFit: "contain",
  },
  {
    id: "genesis-marketplace",
    name: "Genesis Marketplace",
    summary:
      "BNB Agent Studio marketplace for the Smart Money Era hackathon. Find and hire agents on BNB Smart Chain. Agents return a plan or report and do not move buyer funds.",
    status: "Prototype",
    category: "Agent marketplace",
    group: "Agents",
    stack: ["Next.js", "TypeScript", "Tailwind", "8004scan", "BSC"],
    repo: "https://github.com/rishu4436/genesis-marketplace",
    demo: {
      href: "https://genesis-marketplace-one.vercel.app",
      label: "Public build",
    },
    note: "The address responds. It stays a prototype, not a Live product.",
  },
  {
    id: "nightshift",
    name: "Nightshift",
    summary:
      "Bitget AI Hackathon desk. Frozen rNVDA collateral against a moving Bitcoin leg. Qwen narrates. The kernel sizes. Paper UTA only, no live fills.",
    status: "Prototype",
    category: "Paper research engine",
    group: "Agents",
    stack: ["Python", "Qwen", "Bitget paper UTA"],
    repo: "https://github.com/rishu4436/nightshift",
    note: "No public homepage. The repository does not claim a live Bitget fill.",
  },
  {
    id: "keel",
    name: "Keel",
    summary:
      "SafeLane desk for the Binance Agent OS Mini Hackathon, Track A. Quote, park, revoke, pay, and redeem — nothing broadcasts until confirm.",
    status: "Prototype",
    category: "Wallet copilot",
    group: "Agents",
    stack: ["Node.js", "SafeLane", "Binance Agent OS"],
    repo: "https://github.com/rishu4436/keel",
    note: "Localhost desk. The repository has no public deployment.",
  },
  {
    id: "lastmile",
    name: "LastMile",
    summary:
      "DoraHacks Agent Economy submission. Almanak decides. KeeperHub executes. A sealed last mile, not another agent.",
    status: "Prototype",
    category: "Execution rail",
    group: "Agents",
    stack: ["Node.js", "Almanak", "KeeperHub", "Sepolia"],
    repo: "https://github.com/rishu4436/almanak-keeperhub-lastmile",
    note: "Runs locally. No public homepage is listed.",
  },
  {
    id: "basis-desk",
    name: "Basis Desk",
    summary:
      "CMC RWA desk. Same underlying, several wrappers: which to trade, where, and whether the gap is real.",
    status: "Prototype",
    category: "Market desk",
    group: "Markets",
    stack: ["CMC API", "Next.js"],
    repo: "https://github.com/rishu4436/rwa-basis-desk",
    demo: {
      href: "https://rwa-basis-desk.vercel.app",
      label: "Public build",
    },
  },
  {
    id: "parallax",
    name: "Parallax",
    summary:
      "One-page surface for tokenized US stocks on BNB Smart Chain. Three BEP-20 rails for the same company. You sign. Fills land in your wallet.",
    status: "Prototype",
    category: "Tokenized equities",
    group: "Markets",
    stack: ["BNB Smart Chain", "Binance Web3 API"],
    repo: "https://github.com/rishu4436/parallax",
    demo: {
      href: "https://parallax-puce-seven.vercel.app",
      label: "Hosted page",
    },
    note: "The repository says a host can serve the page and cannot keep the always-on desk worker.",
  },
  {
    id: "equicurve",
    name: "EquiCurve",
    summary:
      "Constrained market-design engine for Meteora DBC launches. An issuer sets the raise and the constraints. The search fingerprints a curve and reads the deployment back.",
    status: "In progress",
    category: "Launch design",
    group: "Markets",
    stack: ["TypeScript", "Solana", "Meteora DBC"],
    repo: "https://github.com/rishu4436/equicurve",
    proof: {
      href: "https://github.com/rishu4436/equicurve/blob/main/docs/canonical-evidence.md",
      label: "Devnet evidence",
    },
    note: "Hackathon MVP. README deadline 13 Oct 2026. No public homepage.",
  },
  {
    id: "panta",
    name: "Panta Brief Command",
    summary: "Prediction desk on Solana, powered by the Panta API. Intel, then execute, then the book.",
    status: "Prototype",
    category: "Prediction desk",
    group: "Markets",
    stack: ["Solana", "Panta API", "Next.js"],
    repo: "https://github.com/rishu4436/panta-brief-command",
    demo: {
      href: "https://briefcommand.vercel.app",
      label: "Public build",
    },
  },
  {
    id: "litchess",
    name: "LitChess",
    summary:
      "Chess on LitVM testnet. Player games escrow zkLTC. Practice against a computer is free and does not need a wallet.",
    status: "Prototype",
    category: "On-chain game",
    group: "On-chain",
    stack: ["Solidity", "Next.js", "wagmi", "Hardhat", "chess.js"],
    repo: "https://github.com/rishu4436/litchess",
    demo: { href: "https://www.litchess.in", label: "Public build" },
    image: "/projects/litchess.png",
    imageAlt: "LitChess landing page on LitVM testnet",
    imageFit: "cover",
  },
  {
    id: "opn-rewardvault",
    name: "OPN RewardVault",
    summary:
      "Merkle reward escrow on OPN testnet. Giveaways, bounties, and campaign payouts. CSV to root to claim.",
    status: "Prototype",
    category: "Reward distribution",
    group: "On-chain",
    stack: ["Solidity", "Hardhat", "Next.js", "wagmi", "merkletreejs"],
    repo: "https://github.com/rishu4436/opn-rewardvault",
    demo: {
      href: "https://opn-rewardvault-frontend.vercel.app",
      label: "Public build",
    },
    image: "/projects/rewardvault.png",
    imageAlt: "OPN RewardVault landing page on OPN testnet",
    imageFit: "cover",
  },
  {
    id: "noxrouter",
    name: "NoxRouter",
    summary:
      "Confidential execution in front of an unmodified Uniswap V2-style router, using iExec Nox. Built for the WTF hackathon. Sepolia.",
    status: "Prototype",
    category: "Confidential routing",
    group: "On-chain",
    stack: ["Solidity", "iExec Nox", "Sepolia", "Vite"],
    repo: "https://github.com/rishu4436/noxrouter",
    proof: {
      href: "https://sepolia.etherscan.io/address/0xb0b9d6a8456c4c13077195e17c2c4b18e30c5692",
      label: "Sepolia contract",
    },
    note: "The hosted demo in the README returned 404 on 2 Oct 2026, so it is not linked.",
  },
  {
    id: "final-arc",
    name: "Final Arc",
    summary:
      "USDC payments on Arc mainnet. A protocol memo, a public receipt, and inclusion checked against the Arc certificate.",
    status: "Live",
    category: "Payments",
    group: "Payments",
    stack: ["Arc", "USDC", "Memo"],
    repo: "https://github.com/rishu4436/final-arc",
    demo: {
      href: "https://final-arc-eight.vercel.app",
      label: "Deployment",
    },
  },
];

export const GROUPS: WorkGroup[] = ["Agents", "Markets", "On-chain", "Payments"];

export function workById(id: string) {
  return WORK.find((item) => item.id === id);
}

export function parseWork(value: string | string[] | undefined | null) {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "genesis" ? "genesis" : null;
}

export const GENESIS_FLOW = [
  {
    id: "signal",
    label: "Signal",
    copy: "CoinMarketCap MCP. Quotes, technicals, sentiment, on-chain data, derivatives, and news.",
  },
  {
    id: "intelligence",
    label: "Intelligence",
    copy: "A signal aggregator feeds a strategy engine. Decisions come back as structured model output.",
  },
  {
    id: "risk",
    label: "Risk",
    copy: "A hard manager: drawdown halt, position size, token allowlist, slippage, and cooldowns. The model does not override it.",
  },
  {
    id: "execution",
    label: "Execution",
    copy: "Trust Wallet Agent Kit signs locally and sends the trade to PancakeSwap.",
  },
  {
    id: "onchain",
    label: "On-chain",
    copy: "The BNB AI Agent SDK registers an ERC-8004 identity. The README describes testnet registration as gas-free.",
  },
] as const;

export const GENESIS_BUILT = [
  "An autonomous loop, with a configurable interval and a trigger when the signal changes.",
  "CMC Agent Hub across quotes, technicals, sentiment, on-chain data, derivatives, and news.",
  "Local signing through TWAK, PancakeSwap execution, and x402 payments.",
  "ERC-8004 identity through the BNB AI Agent SDK.",
  "Structured decisions with instructor and Pydantic. The model can be Grok, OpenAI, or Anthropic.",
  "A SQLite audit of signals, decisions, trades, and portfolio snapshots.",
  "A Typer CLI and a FastAPI monitoring dashboard.",
  "A Track 2 Strategy Skill: a backtestable strategy JSON that can be shared without a live trade.",
];

export const GENESIS_DECISIONS = [
  "Risk is a hard gate in front of execution, not a suggestion inside the prompt.",
  "Signing stays on the machine, in TWAK. The agent does not hand the key to a hosted signer.",
  "The repository is testnet-first. Mainnet is an environment switch, not a published deployment.",
  "Every signal, decision, and trade is written to SQLite so the loop can be read after the fact.",
];

export const GENESIS_OPEN = [
  "No public agent URL is published in the repository. The dashboard it names is local, on port 8080.",
  "A mainnet switch exists in configuration. A public mainnet deployment is not listed.",
  "Track 2 is a strategy specification. The README says it can be shared without running a live trade.",
];

export const GENESIS_RECOGNITION = {
  place: "2nd place · Track 1",
  track: "Autonomous Trading Agents",
  source: "BNB Chain Developers",
  href: "https://x.com/BNBChainDevs/status/2074807300632858776",
};

export type FieldEntry = {
  name: string;
  line: string;
  role: string;
  links: WorkLink[];
};

export const FIELDS: FieldEntry[] = [
  {
    name: "Qwerti",
    line: "DeFAI aggregator.",
    role: "Recorded role · Cryptan",
    links: [
      { href: "https://qwerti.ai", label: "Site" },
      { href: "https://discord.gg/sHR3xUaERf", label: "Discord" },
      { href: "https://app.qwerti.ai/?ref=146-41077", label: "Invite" },
    ],
  },
  {
    name: "Pieverse",
    line: "Participated as a user. A completed TGE is on record.",
    role: "Recorded role · Participant",
    links: [{ href: "https://www.pieverse.io/", label: "Site" }],
  },
  {
    name: "AllScale",
    line: "A venue. No generation date is on record.",
    role: "Recorded role · Verified",
    links: [
      { href: "https://allscale.io", label: "Site" },
      { href: "https://discord.gg/brrNy4Z8Hp", label: "Discord" },
      { href: "https://app.allscale.io/s/MOvrBWL", label: "Invite" },
    ],
  },
  {
    name: "TermMax",
    line: "Term structure on BNB. Alpha call and put.",
    role: "Recorded role · Sentinel",
    links: [
      { href: "https://ts.finance/", label: "Site" },
      { href: "https://discord.gg/V32HVv5Rgz", label: "Discord" },
      {
        href: "https://app.termmax.ts.finance/alpha/call-put?ref=V4VB6D&chain=bnb",
        label: "Invite",
      },
    ],
  },
];

export type ProofEntry = {
  id: string;
  who: string;
  when?: string;
  text: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  hrefLabel?: string;
};

export const PROOFS: ProofEntry[] = [
  {
    id: "genesis-track",
    who: "BNB Chain Developers",
    text: "2nd place · Track 1 — Autonomous Trading Agents. Official announcement. This is a track placement, not an overall hackathon win.",
    href: GENESIS_RECOGNITION.href,
    hrefLabel: "Open the announcement",
  },
  {
    id: "sunny",
    who: "Sunny · Qwerti",
    text: "A shoutout to Rishabh for staying active, helping the community, joining events, and contributing to the Qwerti app. The message records a Legend role.",
    image: "/screenshots/recognition-04.jpg",
    imageAlt: "Sunny in Qwerti thanking Rishabh and recording a Legend role",
  },
  {
    id: "glimor",
    who: "Sir Glimor · Qwerti",
    text: "Names Rishabh as the first Qwertian in the Qwerti server.",
    image: "/screenshots/recognition-03.jpg",
    imageAlt: "Sir Glimor congratulating the first Qwertian, Rishabh",
  },
  {
    id: "reeb",
    who: "reeb · Qwerti",
    when: "29 Jun 2026",
    text: "“My fvrt in qwerti.” Left as written.",
    image: "/screenshots/recognition-02.jpg",
    imageAlt: "reeb writing My fvrt in qwerti on 29 June 2026",
  },
  {
    id: "litchess-note",
    who: "BenDoverr · LitChess",
    when: "26 Jun 2026",
    text: "On the LitChess interface: “very cool”, then that the profile looked really good, and “nice GUI.”",
    image: "/screenshots/recognition-01.jpg",
    imageAlt: "BenDoverr on 26 June 2026 saying the LitChess profile and GUI looked good",
  },
];

export const TRADE_LINKS = WORK.filter((item) =>
  ["genesis", "basis-desk", "parallax", "equicurve", "panta", "nightshift"].includes(item.id),
);
