import { Shell } from "@/components/shell/Shell";
import { parseWork } from "@/lib/archive";
import { parseSide } from "@/components/shell/sides";

export default async function Page(props: PageProps<"/">) {
  const query = await props.searchParams;
  const side = parseSide(query.side);
  const work = side === "build" ? parseWork(query.work) : null;
  return <Shell initialSide={side} initialWork={work} />;
}
