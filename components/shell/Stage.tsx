"use client";

import { useRef, type MouseEvent, type PointerEvent, type WheelEvent } from "react";
import { Plate } from "./Plate";
import { SIDES, type Side } from "./sides";

export type Phase = {
  from: Side;
  to: Side;
  direction: 1 | -1;
};

type StageProps = {
  side: Side;
  work: string | null;
  phase: Phase | null;
  onNavigate: (side: Side) => void;
  onWork: (work: string | null) => void;
  onStep: (direction: -1 | 1) => void;
  registerPlate: (id: Side, node: HTMLElement | null) => void;
};

const AXIS_LOCK = 10;
const COMMIT = 48;

export function Stage({ side, work, phase, onNavigate, onWork, onStep, registerPlate }: StageProps) {
  const drag = useRef<{
    x: number;
    y: number;
    t: number;
    axis: "x" | "y" | null;
    active: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const wheelLock = useRef(0);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || phase) return;
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      t: performance.now(),
      axis: null,
      active: true,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current?.active) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (!current.axis) {
      if (Math.hypot(dx, dy) < AXIS_LOCK) return;
      current.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (current.axis === "y") {
        current.active = false;
        return;
      }
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    drag.current = null;
    if (!current?.active || current.axis !== "x") return;
    const dx = event.clientX - current.x;
    const elapsed = Math.max(performance.now() - current.t, 1);
    const velocity = dx / elapsed;
    if (Math.abs(dx) >= COMMIT || Math.abs(velocity) > 0.65) {
      suppressClick.current = true;
      onStep(dx < 0 ? 1 : -1);
    }
  };

  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    if (Math.abs(event.deltaX) < COMMIT) return;
    const now = performance.now();
    if (now < wheelLock.current) return;
    wheelLock.current = now + 700;
    onStep(event.deltaX > 0 ? 1 : -1);
  };

  return (
    <div className="stage">
      <div
        id="side-stage"
        tabIndex={-1}
        className="stage-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onClickCapture={onClickCapture}
        onWheel={onWheel}
      >
        {SIDES.map((item) => {
          const leaving = phase?.from === item.id;
          const entering = phase?.to === item.id;
          const visible = item.id === side || leaving;
          let motion: "enter" | "leave" | undefined;
          if (entering) motion = "enter";
          else if (leaving) motion = "leave";
          return (
            <Plate
              key={item.id}
              id={item.id}
              visible={visible}
              motion={motion}
              direction={phase?.direction}
              work={item.id === "build" ? work : null}
              onNavigate={onNavigate}
              onWork={onWork}
              plateRef={(node) => registerPlate(item.id, node)}
            />
          );
        })}
      </div>
    </div>
  );
}
