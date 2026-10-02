"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { parseWork } from "@/lib/archive";
import { ContactDialog } from "./ContactDialog";
import { Spine } from "./Spine";
import { Stage, type Phase } from "./Stage";
import { SIDES, isSide, type Side } from "./sides";

const HINT_KEY = "rishu-sides-hint";
const MOTION_MS = 680;

function scrollKey(side: Side, work: string | null) {
  return work ? `${side}:${work}` : side;
}

function locationFor(side: Side, work: string | null) {
  const params = new URLSearchParams();
  params.set("side", side);
  if (side === "build" && work) params.set("work", work);
  const search = `?${params.toString()}`;
  const previous = window.history.state;
  const base: Record<string, unknown> =
    previous && typeof previous === "object" ? { ...(previous as Record<string, unknown>) } : {};
  const internals = base.__PRIVATE_NEXTJS_INTERNALS_TREE;
  if (internals && typeof internals === "object") {
    base.__PRIVATE_NEXTJS_INTERNALS_TREE = {
      ...(internals as Record<string, unknown>),
      renderedSearch: search,
    };
  }
  // Keep the App Router marker so Back and Forward do not reload the document.
  base.__NA = true;
  base.side = side;
  base.work = work;
  return { state: base, href: `/${search}` };
}

type ShellProps = {
  initialSide: Side;
  initialWork: string | null;
};

export function Shell({ initialSide, initialWork }: ShellProps) {
  const [side, setSide] = useState<Side>(initialSide);
  const [work, setWork] = useState<string | null>(initialWork);
  const [phase, setPhase] = useState<Phase | null>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  const sideRef = useRef(initialSide);
  const workRef = useRef<string | null>(initialWork);
  const scrolls = useRef<Record<string, number>>({});
  const plates = useRef<Partial<Record<Side, HTMLElement | null>>>({});
  const timer = useRef<number | null>(null);
  const pendingJump = useRef(initialWork === "genesis");
  const navigateRef = useRef<(next: Side, source: "push" | "pop") => void>(() => {});
  const workNavRef = useRef<(next: string | null, source: "push" | "pop") => void>(() => {});

  const saveScroll = () => {
    const plate = document.getElementById(`panel-${sideRef.current}`);
    if (plate) scrolls.current[scrollKey(sideRef.current, workRef.current)] = plate.scrollTop;
  };

  const applyScroll = useCallback(() => {
    const plate = document.getElementById(`panel-${sideRef.current}`);
    if (!plate) return;
    const key = scrollKey(sideRef.current, workRef.current);
    if (pendingJump.current && workRef.current === "genesis") {
      const desk = document.getElementById("instrument-build");
      if (!desk) return;
      const top = desk.getBoundingClientRect().top - plate.getBoundingClientRect().top + plate.scrollTop;
      plate.scrollTop = top;
      scrolls.current[key] = top;
      pendingJump.current = false;
      return;
    }
    plate.scrollTop = scrolls.current[key] ?? 0;
  }, []);

  const dismissHint = () => {
    setHintVisible(false);
    try {
      sessionStorage.setItem(HINT_KEY, "1");
    } catch {
      /* private mode */
    }
  };

  const navigate = useCallback((next: Side, source: "push" | "pop" = "push") => {
    const current = sideRef.current;
    if (source === "push" && next === current) {
      if (workRef.current) workNavRef.current(null, "push");
      return;
    }
    saveScroll();
    if (source === "push") {
      const nextLocation = locationFor(next, null);
      window.history.pushState(nextLocation.state, "", nextLocation.href);
      dismissHint();
    }
    const direction: 1 | -1 =
      SIDES.findIndex((item) => item.id === next) >= SIDES.findIndex((item) => item.id === current)
        ? 1
        : -1;
    sideRef.current = next;
    workRef.current = null;
    setSide(next);
    setWork(null);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    if (reduced) {
      setPhase(null);
      return;
    }
    setPhase({ from: current, to: next, direction });
    timer.current = window.setTimeout(() => {
      timer.current = null;
      setPhase(null);
    }, MOTION_MS);
  }, []);

  const changeWork = useCallback((next: string | null, source: "push" | "pop" = "push") => {
    if (sideRef.current !== "build") return;
    const parsed = parseWork(next);
    if (source === "push" && parsed === workRef.current) return;
    saveScroll();
    if (parsed === "genesis") pendingJump.current = true;
    if (source === "push") {
      const nextLocation = locationFor("build", parsed);
      window.history.pushState(nextLocation.state, "", nextLocation.href);
      dismissHint();
    }
    workRef.current = parsed;
    setWork(parsed);
  }, []);

  useEffect(() => {
    navigateRef.current = navigate;
    workNavRef.current = changeWork;
  }, [navigate, changeWork]);

  useLayoutEffect(() => {
    applyScroll();
    const frame = window.requestAnimationFrame(() => applyScroll());
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.closest("[hidden], [inert]")) {
      document.getElementById(`mode-${sideRef.current}`)?.focus();
    }
    return () => window.cancelAnimationFrame(frame);
  }, [side, work, phase, applyScroll]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    let cancel = false;
    queueMicrotask(() => {
      if (cancel) return;
      const url = new URL(window.location.href);
      const param = url.searchParams.get("side");
      const canonical = isSide(param) ? param : initialSide;
      const canonicalWork = canonical === "build" ? parseWork(url.searchParams.get("work")) : null;
      const nextLocation = locationFor(canonical, canonicalWork);
      const state = window.history.state;
      const marked =
        Boolean(state && typeof state === "object" && state.__NA) &&
        state.side === canonical &&
        (state.work ?? null) === canonicalWork &&
        window.location.search === nextLocation.href.slice(1);
      if (!marked) {
        window.history.replaceState(nextLocation.state, "", nextLocation.href);
      }
    });

    const onPop = (event: PopStateEvent) => {
      const url = new URL(window.location.href);
      const raw =
        event.state && typeof event.state === "object" && "side" in event.state
          ? String(event.state.side)
          : url.searchParams.get("side");
      if (!isSide(raw)) {
        const home = locationFor("build", null);
        window.history.replaceState(home.state, "", home.href);
        navigateRef.current("build", "pop");
        return;
      }
      const nextWork = raw === "build" ? parseWork(url.searchParams.get("work")) : null;
      if (raw !== sideRef.current) navigateRef.current(raw, "pop");
      if ((workRef.current ?? null) !== nextWork) workNavRef.current(nextWork, "pop");
    };

    window.addEventListener("popstate", onPop);
    return () => {
      cancel = true;
      window.removeEventListener("popstate", onPop);
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, [initialSide]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(HINT_KEY) === "1") setHintVisible(false);
    } catch {
      /* private mode */
    }
  }, []);

  const registerPlate = useCallback((id: Side, node: HTMLElement | null) => {
    plates.current[id] = node;
  }, []);

  const step = (direction: -1 | 1) => {
    const index = SIDES.findIndex((item) => item.id === sideRef.current);
    const next = SIDES[index + direction];
    if (!next) return;
    navigate(next.id);
  };

  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <div className="studio" data-side={side} data-motion={phase ? "travel" : "rest"}>
      <div className="horizon" aria-hidden="true">
        <Image
          src="/environment/vista.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="horizon-photo"
        />
        <div className="horizon-veil" />
      </div>
      <div className="wash" aria-hidden="true" />
      <div className="studio-frame" inert={contactOpen ? true : undefined}>
        <a className="skip" href="#side-stage">
          Skip to this side
        </a>
        <Spine
          side={side}
          hintVisible={hintVisible}
          contactOpen={contactOpen}
          onNavigate={(next) => navigate(next)}
          onContact={() => setContactOpen(true)}
        />
        <Stage
          side={side}
          work={work}
          phase={phase}
          onNavigate={(next) => navigate(next)}
          onWork={(next) => changeWork(next)}
          onStep={step}
          registerPlate={registerPlate}
        />
      </div>
      <ContactDialog open={contactOpen} onClose={closeContact} />
    </div>
  );
}
