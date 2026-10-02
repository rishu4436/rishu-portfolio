"use client";

import type { MouseEvent } from "react";
import { profile } from "@/lib/data";
import { Constellation } from "./Constellation";
import { BuildDesk, CommunityDesk, CreateDesk, GenesisCase, TradeDesk } from "./Desks";
import { neighbor, sideById, type Side } from "./sides";

type PlateProps = {
  id: Side;
  visible: boolean;
  motion: "enter" | "leave" | undefined;
  direction: 1 | -1 | undefined;
  work: string | null;
  onNavigate: (side: Side) => void;
  onWork: (work: string | null) => void;
  plateRef: (node: HTMLElement | null) => void;
};

export function Plate({ id, visible, motion, direction, work, onNavigate, onWork, plateRef }: PlateProps) {
  const side = sideById(id);
  const previous = neighbor(id, -1);
  const next = neighbor(id, 1);

  const follow = (event: MouseEvent<HTMLAnchorElement>, target: Side) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onNavigate(target);
  };

  const openDesk = () => {
    const plate = document.getElementById(`panel-${id}`);
    const desk = document.getElementById(`instrument-${id}`);
    if (!plate || !desk) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = desk.getBoundingClientRect().top - plate.getBoundingClientRect().top + plate.scrollTop;
    plate.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <article
      ref={plateRef}
      id={`panel-${id}`}
      className="plate"
      data-side={id}
      data-motion={motion}
      data-dir={direction}
      hidden={!visible}
      inert={!visible || motion === "leave" ? true : undefined}
      aria-labelledby={`title-${id}`}
      aria-hidden={motion === "leave" ? true : undefined}
    >
      <section className="hero">
        <p className="hero-place">{profile.location}</p>
        <div className="hero-copy">
          <p className="hero-hello">Hello,</p>
          <h1 id={`title-${id}`}>
            <span>Rishu</span>
            <span>Kumar Gupta</span>
          </h1>
          <p className="hero-line">
            Builder of autonomous systems, markets &amp; on&#8209;chain products.
          </p>
          <button type="button" className="hero-enter" onClick={openDesk}>
            Open {side.label}
          </button>
        </div>
        <Constellation side={id} onNavigate={onNavigate} />
        <p className="hero-cue">Scroll · Drag · Explore</p>
      </section>

      <section className="instrument" id={`instrument-${id}`} aria-labelledby={`desk-${id}`}>
        <header className="desk-head">
          {previous ? (
            <a className="jump" href={`/?side=${previous.id}`} onClick={(event) => follow(event, previous.id)}>
              ← {previous.label}
            </a>
          ) : (
            <span />
          )}
          <p className="desk-index">
            <span>{side.index}</span>
            <strong id={`desk-${id}`}>{side.label}</strong>
          </p>
          {next ? (
            <a className="jump jump-next" href={`/?side=${next.id}`} onClick={(event) => follow(event, next.id)}>
              {next.label} →
            </a>
          ) : (
            <span />
          )}
        </header>
        <p className="desk-sentence">{side.sentence}</p>
        <Desk id={id} work={work} onWork={onWork} />
      </section>
    </article>
  );
}

function Desk({ id, work, onWork }: { id: Side; work: string | null; onWork: (work: string | null) => void }) {
  if (id === "trade") return <TradeDesk />;
  if (id === "create") return <CreateDesk />;
  if (id === "community") return <CommunityDesk />;
  if (work === "genesis") return <GenesisCase onClose={() => onWork(null)} />;
  return <BuildDesk onOpenCase={() => onWork("genesis")} />;
}
