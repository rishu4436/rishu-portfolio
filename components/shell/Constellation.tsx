"use client";

import type { MouseEvent } from "react";
import { SIDES, sideById, type Side } from "./sides";

type ConstellationProps = {
  side: Side;
  onNavigate: (side: Side) => void;
};

const LINES = [
  { id: "trade", x: 118, y: 108 },
  { id: "create", x: 324, y: 112 },
  { id: "community", x: 112, y: 308 },
  { id: "build", x: 322, y: 318 },
] as const;

const CENTER = { x: 220, y: 214 };
const RING = 80;

function ringPoint(x: number, y: number) {
  const dx = x - CENTER.x;
  const dy = y - CENTER.y;
  const length = Math.hypot(dx, dy) || 1;
  return {
    x1: CENTER.x + (dx / length) * RING,
    y1: CENTER.y + (dy / length) * RING,
  };
}

export function Constellation({ side, onNavigate }: ConstellationProps) {
  const current = sideById(side);

  const follow = (event: MouseEvent<HTMLAnchorElement>, target: Side) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onNavigate(target);
  };

  return (
    <div className="constellation">
      <div className="field" aria-hidden={false}>
        <svg className="field-lines" viewBox="0 0 440 430" aria-hidden="true">
          {LINES.map((line) => {
            const start = ringPoint(line.x, line.y);
            return (
              <line
                key={line.id}
                x1={start.x1}
                y1={start.y1}
                x2={line.x}
                y2={line.y}
                className={line.id === side ? "is-live" : undefined}
              />
            );
          })}
          <circle cx="220" cy="214" r="74" />
        </svg>
        <p className="you-are">
          <span>You are</span>
          <strong>{current.label}</strong>
        </p>
        {SIDES.map((item) => (
          <a
            key={item.id}
            className="node"
            data-node={item.id}
            href={`/?side=${item.id}`}
            draggable={false}
            aria-current={item.id === side ? "page" : undefined}
            onClick={(event) => follow(event, item.id)}
          >
            <span>{item.label}</span>
            <small className="node-note">{item.description}</small>
          </a>
        ))}
      </div>
      <p className="field-compact">
        <span>You are</span>
        <strong>{current.label}</strong>
      </p>
    </div>
  );
}
