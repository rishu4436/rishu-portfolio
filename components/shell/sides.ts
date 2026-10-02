export const SIDES = [
  {
    id: "trade",
    index: "01",
    label: "Trade",
    description: "Market thinking",
    sentence: "A research desk for notes, theses, and the work they point to.",
    accent: "cyan",
  },
  {
    id: "create",
    index: "02",
    label: "Create",
    description: "Ideas and published work",
    sentence: "A publishing desk for stories, threads, video, and campaigns.",
    accent: "amber",
  },
  {
    id: "community",
    index: "03",
    label: "Community",
    description: "People, systems, recognition",
    sentence: "A field notebook for people, systems, and proof.",
    accent: "olive",
  },
  {
    id: "build",
    index: "04",
    label: "Build",
    description: "Products, dApps, agents, contracts",
    sentence: "Objects for products, dApps, agents, and contracts.",
    accent: "amber",
  },
] as const;

export type Side = (typeof SIDES)[number]["id"];

export const LEGEND = [
  {
    term: "Live",
    detail: "A public deployment the work itself presents, whose address responds.",
  },
  {
    term: "Prototype",
    detail: "A hackathon, demo, or testnet build. A public address may still respond.",
  },
  {
    term: "In progress",
    detail: "Work that is still underway.",
  },
  {
    term: "Archived",
    detail: "Work that has been retired.",
  },
] as const;

const SIDE_IDS = new Set<string>(SIDES.map((side) => side.id));

export function isSide(value: string | null | undefined): value is Side {
  return typeof value === "string" && SIDE_IDS.has(value);
}

export function parseSide(value: string | string[] | undefined): Side {
  const raw = Array.isArray(value) ? value[0] : value;
  return isSide(raw) ? raw : "build";
}

export function sideById(id: Side) {
  return SIDES.find((side) => side.id === id) ?? SIDES[3];
}

export function neighbor(id: Side, direction: -1 | 1) {
  const index = SIDES.findIndex((side) => side.id === id);
  return SIDES[index + direction];
}
