export const profile = {
  name: "Rishu Kumar Gupta",
  /** Nickname used in community */
  nickname: "Rishabh",
  short: "RK",
  location: "Gopalganj, Bihar, India",
  role: "Blockchain Builder & Crypto Community Participant",
  tagline: "Building the on-chain future from Bihar, India.",
  summary:
    "Blockchain builder and crypto community participant since 2020. I turn ideas into functional on-chain products that combine technical integrity with real user value — and I engage deeply in communities, builder programs, and collaborative Web3 work.",
  since: 2020,
  email: "rishu4436@gmail.com",
  x: "https://x.com/rishabh4436",
  xHandle: "@rishabh4436",
  github: "https://github.com/rishu4436",
  githubHandle: "rishu4436",
  telegram: "https://t.me/rishug4436",
  telegramHandle: "@rishug4436",
  /** Hero: professional blazer studio look */
  photo: "/images/rishu-professional.jpg",
  /** About: different cinematic builder style */
  photoAbout: "/images/rishu-about.jpg",
  /** Generated resume PDF — see scripts/generate-cv.mjs or /cv page */
  cv: "/cv.pdf",
  cvPage: "/cv",
  openTo:
    "Ambassador programs · builder initiatives · collaborative Web3 projects · on-chain products",
  /** About section paragraphs — focus on who I am & what I do */
  about: [
    "I'm Rishu Kumar Gupta — also known as Rishabh. I am a blockchain builder and crypto community participant with deep experience exploring decentralized technologies since 2020. I focus on turning ideas into functional on-chain products that combine technical integrity with real user value.",
    "I ship and maintain products across ecosystems — including LitChess on LitVM — and care about transparent, skill-based systems where outcomes are verifiable and fair. My interests span blockchain infrastructure, DeFi, prediction markets, on-chain gaming, and both EVM and Solana environments.",
    "I am drawn to the human side of crypto: discipline, risk management, and content that helps others build sustainable habits and clearer decisions. I actively build and engage crypto and gaming communities, especially Discord-based tools that deliver real utility alongside great experiences.",
    "I contribute to on-chain development efforts — including work with LitecoinVM and IOPn — and favor clean, iterative shipping with practical tools and AI assistance for rapid prototyping. I value connecting with people who are building the next generation of decentralized apps and communities.",
  ],
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Built" },
  { href: "#signal", label: "Community" },
  { href: "#markets", label: "Markets" },
  { href: "#contact", label: "Contact" },
];

export const marqueePrimary = [
  "LITVM",
  "OPN CHAIN",
  "GENESIS · 2ND PLACE",
  "BNB HACK",
  "BNB CHAIN",
  "AI AGENTS",
  "SOLIDITY",
  "NEXT.JS",
  "WAGMI",
  "BUILDER MODE",
];

export const marqueeSecondary = [
  "TRACK 1 · AUTONOMOUS AGENTS",
  "GOPALGANJ",
  "LITCHESS",
  "GENESIS AGENT",
  "OPN REWARDVAULT",
  "BNB · CMC · TWAK",
  "MERKLE CLAIMS",
];

export const craft = [
  {
    tag: "01",
    title: "Build on-chain",
    body: "Ship functional products with technical integrity — contracts, interfaces, and real user value.",
  },
  {
    tag: "02",
    title: "Community & programs",
    body: "Active in crypto and gaming communities; drawn to ambassador, builder, and collaborative Web3 initiatives.",
  },
  {
    tag: "03",
    title: "Discipline & craft",
    body: "Risk awareness, iterative development, and AI-assisted prototyping without losing production quality.",
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  href?: string;
  repo?: string;
  proof?: string;
  accent: string;
  badge?: string;
  /** Local image under public/ */
  image?: string;
  imageAlt?: string;
  /** "cover" (default) or "contain" for logos */
  imageFit?: "cover" | "contain";
};

export const hackathon = {
  name: "BNB Hack: AI Trading Agent Edition",
  hosts: "BNB Chain × CoinMarketCap × Trust Wallet",
  track: "Track 1 — Autonomous Trading Agents",
  place: "2nd",
  project: "Genesis",
  prizePoolTrack1: "$24,000",
  announcement: "https://x.com/BNBChainDevs/status/2074807300632858776",
  winnersBlog:
    "https://www.bnbchain.org/en/blog/meet-the-winners-of-bnb-hack-ai-trading-agent-edition",
  track1Leaders: [
    "1st: Neural Alpha by ClipX",
    "2nd: Genesis",
    "3rd: Gridora",
    "4th: Guarded Alpha",
    "5th: Superagente007",
  ],
};

export const projects: Project[] = [
  {
    title: "Genesis",
    category: "AI · Autonomous Trading",
    description:
      "Self-custody autonomous trading agent for BNB Hack: AI Trading Agent Edition (BNB Chain × CoinMarketCap × Trust Wallet). CMC signal fusion, hard risk rules, TWAK/PancakeSwap execution. Officially ranked 2nd on Track 1 — Autonomous Trading Agents ($24K prize pool).",
    tech: ["Python", "CMC MCP", "TWAK", "Grok/LLM", "FastAPI"],
    href: "",
    repo: "https://github.com/rishu4436/Genesis",
    proof: "https://x.com/BNBChainDevs/status/2074807300632858776",
    accent: "from-cyan-400/30 to-emerald-700/15",
    badge: "2nd · Track 1 · BNB Hack",
    image: "/projects/genesis-logo.jpg",
    imageAlt: "Genesis AI agent logo",
    imageFit: "contain",
  },
  {
    title: "LitChess",
    category: "LitVM · On-Chain Gaming",
    description:
      "Decentralized chess with on-chain escrow betting on LitVM testnet. Play vs player with zkLTC wagers, or practice free vs computer AI (Easy / Medium / Expert).",
    tech: ["Solidity", "Next.js", "wagmi", "Hardhat", "chess.js"],
    href: "https://www.litchess.in",
    repo: "https://github.com/rishu4436/litchess",
    accent: "from-orange-500/30 to-amber-700/10",
    image: "/projects/litchess.png",
    imageAlt: "LitChess dApp screenshot",
  },
  {
    title: "OPN RewardVault",
    category: "OPN Chain · DeFi",
    description:
      "Transparent on-chain reward distribution with Merkle proofs — giveaways, bounties, and campaign payouts on OPN testnet. CSV → root → claim flow with a cyber-tech dashboard.",
    tech: ["Solidity", "Hardhat", "Next.js", "wagmi", "merkletreejs"],
    href: "https://opn-rewardvault-frontend.vercel.app",
    repo: "https://github.com/rishu4436/opn-rewardvault",
    accent: "from-violet-400/25 to-blue-700/10",
    image: "/projects/rewardvault.png",
    imageAlt: "OPN RewardVault dApp screenshot",
  },
];

/**
 * Appreciation / recognition cards.
 *
 * How to add a screenshot of praise (Discord, X, Telegram, email, etc.):
 * 1. Save your image as PNG or JPG in:  public/screenshots/
 *    e.g.  public/screenshots/genesis-bnb-win.png
 * 2. Add (or edit) a card below with:
 *    - image: "/screenshots/your-file.png"
 *    - project: which build it is about (e.g. "Genesis")
 *    - org / text / href as usual
 *
 * Tip: crop to the message only; dark theme screenshots look best.
 */
export type Signal = {
  org: string;
  text: string;
  href?: string;
  /** Which project this praise is about */
  project?: string;
  /** Path under public/ — e.g. "/screenshots/litvm-feedback.png" */
  image?: string;
  imageAlt?: string;
};

export const signals: Signal[] = [
  {
    org: "Sunny · Qwerti",
    project: "Qwerti",
    text: "Special shoutout for consistently staying active, helping the community, joining events, and contributing to the Qwerti app — won Legend role.",
    image: "/screenshots/recognition-04.jpg",
    imageAlt: "Sunny shoutout for Legend role on Qwerti",
    href: "https://discord.gg/sHR3xUaERf",
  },
  {
    org: "Sir Glimor · Qwerti",
    project: "Qwerti",
    text: "Congrats to our first @Qwertian in Qwerti Server — @RISHABH | QWERTI.",
    image: "/screenshots/recognition-03.jpg",
    imageAlt: "First Qwertian congratulations in Qwerti server",
    href: "https://discord.gg/sHR3xUaERf",
  },
  {
    org: "reeb · Qwerti",
    project: "Qwerti",
    text: "My fvrt in qwerti 🫶",
    image: "/screenshots/recognition-02.jpg",
    imageAlt: "Community member calling Rishu their favorite in Qwerti",
    href: "https://discord.gg/sHR3xUaERf",
  },
  {
    org: "BenDoverr · Community",
    project: "LitChess",
    text: "very cool — I made my profile it looks really good, nice GUI.",
    image: "/screenshots/recognition-01.jpg",
    imageAlt: "Feedback on LitChess GUI looking really good",
  },
  {
    org: "@BNBChainDevs · Official winners",
    project: "Genesis",
    text: "Track 1: Autonomous Trading Agents — 2nd: Genesis. Official BNB Hack winners announcement.",
    href: "https://x.com/BNBChainDevs/status/2074807300632858776",
  },
];

/**
 * Markets / products I use as a USER (not builds I shipped).
 * Each card shows:
 *  - referralLink → join via my link
 *  - earned → cash/points already made, OR
 *  - tgeStatus: "pending" if TGE not happened yet
 *
 * Edit amounts and links with your real referral URLs.
 */
export type UserMarket = {
  name: string;
  tagline: string;
  role: string;
  /** Your referral / invite link for others to join (optional) */
  referralLink?: string;
  /** Short label under the join button */
  referralLabel?: string;
  /**
   * TGE status:
   * - "live"     → token/live market, show earnings
   * - "pending"  → TGE not happened yet
   * - "points"   → points / testnet rewards only (no cash TGE yet)
   */
  tgeStatus: "live" | "pending" | "points";
  /** Optional status chip override, e.g. "TGE · Q3" or "TGE not announced" */
  tgeLabel?: string;
  /** e.g. "$1,250" or "12,400 pts" — only shown when you have a number */
  earned?: string;
  earnedNote?: string;
  /** Optional site homepage */
  site?: string;
  /** Community Discord invite */
  discord?: string;
  /** Logo under public/ e.g. /markets/qwerti.png */
  logo?: string;
  /** Optional cover/banner image */
  cover?: string;
  accent: string;
};

export const userMarkets: UserMarket[] = [
  {
    name: "Qwerti",
    tagline:
      "DeFAI aggregator — AI-powered multichain trading & points toward airdrop. I earned the Cryptan role here.",
    role: "Cryptan",
    referralLink: "https://app.qwerti.ai/?ref=146-41077",
    referralLabel: "Join Qwerti with my link",
    tgeStatus: "pending",
    tgeLabel: "TGE · Q3",
    earned: "—",
    earnedNote: "TGE planned Q3 · Cryptan role earned · trading & referral points until TGE",
    site: "https://qwerti.ai",
    discord: "https://discord.gg/sHR3xUaERf",
    logo: "/markets/qwerti-logo.png",
    cover: "/markets/qwerti-og.png",
    accent: "from-cyan-400/25 to-blue-800/15",
  },
  {
    name: "Pieverse",
    tagline: "Participated as a user — TGE completed.",
    role: "User",
    tgeStatus: "live",
    earned: "$59",
    earnedNote: "Earned from TGE",
    site: "https://www.pieverse.io/",
    logo: "/markets/pieverse-favicon.png",
    cover: "/markets/pieverse-og.png",
    accent: "from-fuchsia-400/20 to-purple-800/15",
  },
  {
    name: "AllScale",
    tagline: "Participating as a user — currently hold Verified role. TGE not announced yet.",
    role: "Verified",
    referralLink: "https://app.allscale.io/s/MOvrBWL",
    referralLabel: "Join AllScale with my link",
    tgeStatus: "pending",
    tgeLabel: "TGE not announced",
    earned: "—",
    earnedNote: "TGE not announced · Verified role · earnings after TGE",
    site: "https://allscale.io",
    discord: "https://discord.gg/brrNy4Z8Hp",
    logo: "/markets/allscale-logo.png",
    accent: "from-sky-400/25 to-indigo-800/15",
  },
  {
    name: "TermMax",
    tagline:
      "Term Structure Finance — alpha call/put on BNB. I hold the Sentinel role here.",
    role: "Sentinel",
    referralLink: "https://app.termmax.ts.finance/alpha/call-put?ref=V4VB6D&chain=bnb",
    referralLabel: "Join TermMax with my link",
    tgeStatus: "pending",
    tgeLabel: "TGE · Q3",
    earned: "—",
    earnedNote: "TGE planned Q3 · Sentinel role · earnings after TGE",
    site: "https://ts.finance/",
    discord: "https://discord.gg/V32HVv5Rgz",
    logo: "/markets/termmax-logo.png",
    cover: "/markets/termmax-og.jpg",
    accent: "from-lime-400/20 to-emerald-900/15",
  },
  // ── Open slot (last) — fill later ──
  {
    name: "Slot 05",
    tagline: "Empty panel — add project details later.",
    role: "TBD",
    tgeStatus: "pending",
    tgeLabel: "TBD",
    earned: "—",
    earnedNote: "Referral · role · TGE · earnings — fill when ready",
    accent: "from-white/10 to-white/5",
  },
];
