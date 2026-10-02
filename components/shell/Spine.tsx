"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import Image from "next/image";
import { profile } from "@/lib/data";
import { SIDES, sideById, type Side } from "./sides";

type SpineProps = {
  side: Side;
  hintVisible: boolean;
  contactOpen: boolean;
  onNavigate: (side: Side) => void;
  onContact: () => void;
};

/**
 * Navigation landmark, not a tablist.
 * Each mode is a real URL and stays in the tab order. Arrow keys are only a
 * shortcut while focus is already inside this nav.
 */
export function Spine({
  side,
  hintVisible,
  contactOpen,
  onNavigate,
  onContact,
}: SpineProps) {
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !backward) return;
    const index = SIDES.findIndex((item) => item.id === side);
    const next = SIDES[index + (forward ? 1 : -1)];
    if (!next) return;
    event.preventDefault();
    onNavigate(next.id);
    requestAnimationFrame(() => {
      document.getElementById(`mode-${next.id}`)?.focus();
    });
  };

  return (
    <header className="spine">
      <div className="spine-identity">
        <Image
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          width={96}
          height={120}
          priority
          className="spine-photo"
        />
        <div className="spine-nameplate">
          <p className="spine-name">{profile.name}</p>
          <p className="spine-aka">Also {profile.nickname}</p>
          <p className="identity-line">One builder. Four sides.</p>
        </div>
        <button
          type="button"
          id="contact-open"
          className="contact-open"
          aria-haspopup="dialog"
          aria-expanded={contactOpen}
          aria-controls="contact-dialog"
          onClick={onContact}
        >
          Contact
        </button>
      </div>

      <nav aria-label="Sides" onKeyDown={onKeyDown}>
        <ul className="mode-list">
          {SIDES.map((item) => {
            const current = item.id === side;
            return (
              <li key={item.id}>
                <a
                  id={`mode-${item.id}`}
                  href={`/?side=${item.id}`}
                  draggable={false}
                  aria-current={current ? "page" : undefined}
                  className="mode-link"
                  onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                    if (
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.altKey ||
                      event.button !== 0
                    ) {
                      return;
                    }
                    event.preventDefault();
                    onNavigate(item.id);
                  }}
                >
                  <span className="mode-index">{item.index}</span>
                  <span className="mode-label">{item.label}</span>
                  <span className="mode-desc">{item.description}</span>
                  {current ? <span className="mode-now">Now viewing</span> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <p className="now-line">Now viewing {sideById(side).label}</p>

      {hintVisible ? (
        <p className="hint">
          <span className="hint-keys">
            Arrow keys when a side is highlighted. Drag sideways anywhere in the page.
          </span>
          <span className="hint-touch">
            Swipe sideways for another side. Scroll to read this one.
          </span>
        </p>
      ) : null}
    </header>
  );
}
