"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import {
  FIELDS,
  GENESIS_BUILT,
  GENESIS_DECISIONS,
  GENESIS_FLOW,
  GENESIS_OPEN,
  GENESIS_RECOGNITION,
  GROUPS,
  PROOFS,
  TRADE_LINKS,
  WORK,
  workById,
  type WorkRecord,
} from "@/lib/archive";
import { profile } from "@/lib/data";
import { LEGEND } from "./sides";

function plainClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function Status({ value }: { value: WorkRecord["status"] }) {
  const tone = value === "In progress" ? "progress" : value.toLowerCase();
  return <span className={`mark mark-${tone}`}>{value}</span>;
}

function Links({ item }: { item: WorkRecord }) {
  return (
    <p className="object-links">
      <a href={item.repo} target="_blank" rel="noreferrer">
        GitHub
      </a>
      {item.demo ? (
        <a href={item.demo.href} target="_blank" rel="noreferrer">
          {item.demo.label}
        </a>
      ) : null}
      {item.proof ? (
        <a href={item.proof.href} target="_blank" rel="noreferrer">
          {item.proof.label}
        </a>
      ) : null}
    </p>
  );
}

export function BuildDesk({ onOpenCase }: { onOpenCase: () => void }) {
  const genesis = workById("genesis");
  const live = workById("final-arc");
  if (!genesis || !live) return null;
  const rest = WORK.filter((item) => item.id !== "genesis" && item.id !== "final-arc");

  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    if (plainClick(event)) return;
    event.preventDefault();
    onOpenCase();
  };

  return (
    <div className="archive">
      <article className="lead">
        <div className="lead-copy">
          <p className="meta">Lead object · Agents</p>
          <h2 className="lead-name">
            <a href="/?side=build&work=genesis" onClick={open}>
              {genesis.name}
            </a>
          </h2>
          <p className="lead-kicker">AI autonomous trading agent</p>
          <p className="object-summary">{genesis.summary}</p>
          <p className="object-meta">
            <Status value={genesis.status} />
            <span>{genesis.category}</span>
          </p>
          <p className="stack">{genesis.stack.join(" · ")}</p>
          <p className="object-links">
            <a href="/?side=build&work=genesis" onClick={open}>
              Open case
            </a>
            <a href={genesis.repo} target="_blank" rel="noreferrer">
              GitHub
            </a>
            {genesis.proof ? (
              <a href={genesis.proof.href} target="_blank" rel="noreferrer">
                {genesis.proof.label}
              </a>
            ) : null}
          </p>
          {genesis.note ? <p className="object-note">{genesis.note}</p> : null}
        </div>
        <figure className="still still-mark">
          <div className="still-frame">
            <Image src={genesis.image ?? ""} alt={genesis.imageAlt ?? ""} fill sizes="240px" />
          </div>
          <figcaption>Mark from the repository. Not a product screenshot.</figcaption>
        </figure>
      </article>

      <article className="object object-live">
        <p className="object-index">Live</p>
        <div>
          <h3 className="object-name">{live.name}</h3>
          <p className="object-summary">{live.summary}</p>
          <p className="object-meta">
            <Status value={live.status} />
            <span>{live.category}</span>
          </p>
          <p className="stack">{live.stack.join(" · ")}</p>
          <Links item={live} />
        </div>
      </article>

      {GROUPS.map((group) => {
        const items = rest.filter((item) => item.group === group);
        if (items.length === 0) return null;
        return (
          <section key={group} className="shelf" aria-labelledby={`shelf-${group}`}>
            <h3 id={`shelf-${group}`} className="shelf-label">
              {group}
            </h3>
            <ol className="shelf-list">
              {items.map((item, index) => (
                <li key={item.id} className="object">
                  {item.image ? (
                    <figure className="still still-shot">
                      <div className="still-frame">
                        <Image src={item.image} alt={item.imageAlt ?? ""} fill sizes="160px" />
                      </div>
                    </figure>
                  ) : (
                    <p className="object-index">{String(index + 1).padStart(2, "0")}</p>
                  )}
                  <div>
                    <h4 className="object-name">{item.name}</h4>
                    <p className="object-summary">{item.summary}</p>
                    <p className="object-meta">
                      <Status value={item.status} />
                      <span>{item.category}</span>
                    </p>
                    <p className="stack">{item.stack.join(" · ")}</p>
                    <Links item={item} />
                    {item.note ? <p className="object-note">{item.note}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        );
      })}

      <dl className="legend archive-legend">
        {LEGEND.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function GenesisCase({ onClose }: { onClose: () => void }) {
  const close = (event: MouseEvent<HTMLAnchorElement>) => {
    if (plainClick(event)) return;
    event.preventDefault();
    onClose();
  };

  return (
    <article className="case" id="case-genesis" aria-labelledby="case-title">
      <p className="case-back">
        <a id="case-back" href="/?side=build" onClick={close}>
          ← Index
        </a>
      </p>
      <p className="meta">Case · Prototype · Agents</p>
      <h2 id="case-title">Genesis</h2>
      <p className="case-kicker">AI autonomous trading agent</p>
      <ol className="case-flow">
        {GENESIS_FLOW.map((step) => (
          <li key={step.id}>
            <strong>{step.label}</strong>
            <span>{step.copy}</span>
          </li>
        ))}
      </ol>

      <div className="case-grid">
        <figure className="still still-mark">
          <div className="still-frame">
            <Image src="/projects/genesis.png" alt="Genesis mark, a gold G on a dark square" fill sizes="280px" />
          </div>
          <figcaption>Repository mark. A product screenshot is not in this archive.</figcaption>
        </figure>
        <div>
          <h3>Recognition</h3>
          <p className="case-place">{GENESIS_RECOGNITION.place}</p>
          <p className="object-summary">
            Track 1 — {GENESIS_RECOGNITION.track}. Cited from the official {GENESIS_RECOGNITION.source} announcement.
            Not an overall hackathon win.
          </p>
          <p className="object-links">
            <a href={GENESIS_RECOGNITION.href} target="_blank" rel="noreferrer">
              Announcement
            </a>
            <a href="https://github.com/rishu4436/Genesis" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </div>

      <section className="case-block">
        <h3>What I built</h3>
        <ul>
          {GENESIS_BUILT.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      <section className="case-block">
        <h3>Decisions</h3>
        <ul>
          {GENESIS_DECISIONS.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      <section className="case-block">
        <h3>Not claimed</h3>
        <ul>
          {GENESIS_OPEN.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export function TradeDesk() {
  return (
    <div className="desk-grid">
      <article className="panel">
        <p className="meta">Notebook</p>
        <p className="empty-title">No notes yet.</p>
        <p className="empty-copy">
          A thesis, a date, and a market are added only when the note is real. Nothing here is a trade record.
        </p>
      </article>
      <article className="panel">
        <p className="meta">Linked builds</p>
        <p className="empty-copy">Work in the archive that touches markets. Not positions, and not results.</p>
        <ol className="link-list">
          {TRADE_LINKS.map((item) => (
            <li key={item.id}>
              <a href={item.repo} target="_blank" rel="noreferrer">
                {item.name}
              </a>
              <span>{item.summary}</span>
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}

export function CreateDesk() {
  return (
    <div className="feature">
      <div className="feature-frame">
        <p className="meta">Publishing desk</p>
        <p className="empty-title">No story is filed.</p>
        <p className="empty-copy">
          Threads, video, and campaigns go here only when there is a real piece. The account that exists today is the
          public profile.
        </p>
        <a className="text-link" href={profile.x} target="_blank" rel="noreferrer">
          {profile.xHandle}
        </a>
      </div>
    </div>
  );
}

export function CommunityDesk() {
  return (
    <div className="field-log">
      <section className="panel" aria-labelledby="fields-title">
        <p className="meta">Ecosystems</p>
        <h2 id="fields-title" className="log-title">
          Where the work sat
        </h2>
        <ol className="field-list">
          {FIELDS.map((field) => (
            <li key={field.name}>
              <h3>{field.name}</h3>
              <p>{field.line}</p>
              <p className="object-note">{field.role}</p>
              <p className="object-links">
                {field.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section className="panel" aria-labelledby="proof-title">
        <p className="meta">Recognition</p>
        <h2 id="proof-title" className="log-title">
          What was said
        </h2>
        <ol className="proof-list">
          {PROOFS.map((proof) => (
            <li key={proof.id}>
              <p className="object-meta">
                <span>{proof.who}</span>
                {proof.when ? <span>{proof.when}</span> : null}
              </p>
              <p>{proof.text}</p>
              {proof.href ? (
                <p className="object-links">
                  <a href={proof.href} target="_blank" rel="noreferrer">
                    {proof.hrefLabel}
                  </a>
                </p>
              ) : null}
              {proof.image ? (
                <figure className="proof-still">
                  <Image
                    src={proof.image}
                    alt={proof.imageAlt ?? ""}
                    width={720}
                    height={480}
                    className="proof-img"
                  />
                </figure>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
