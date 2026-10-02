"use client";

import { useEffect, useId, useRef } from "react";
import { profile } from "@/lib/data";

const LINKS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "X", value: profile.xHandle, href: profile.x },
  { label: "GitHub", value: profile.githubHandle, href: profile.github },
  { label: "Telegram", value: profile.telegramHandle, href: profile.telegram },
] as const;

type ContactDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactDialog({ open, onClose }: ContactDialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const trigger = document.getElementById("contact-open");
    if (!dialog) return;

    const focusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );

    focusable()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="contact-layer">
      <div className="contact-backdrop" onClick={onClose} />
      <div
        ref={dialogRef}
        id="contact-dialog"
        className="contact-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <p className="contact-kicker">Contact</p>
        <h2 id={titleId}>{profile.name}</h2>
        <p className="contact-note">Also {profile.nickname}.</p>
        <ul>
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <span>{link.label}</span>
                <span>{link.value}</span>
              </a>
            </li>
          ))}
        </ul>
        <button type="button" className="contact-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
