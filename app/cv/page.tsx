import type { Metadata } from 'next';
import Link from 'next/link';
import {
  profile,
  projects,
  hackathon,
  userMarkets,
  signals,
  craft,
} from '@/lib/data';
import { PrintButton } from './PrintButton';

export const metadata: Metadata = {
  title: `CV — ${profile.name}`,
  description: profile.summary,
};

export default function CVPage() {
  const markets = userMarkets.filter((m) => m.role !== 'TBD' && !m.name.startsWith('Slot'));

  return (
    <div className="min-h-[100dvh] bg-[#f6f5f2] text-[#111] print:bg-white">
      <div className="mx-auto max-w-3xl px-6 py-10 print:py-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link href="/" className="text-sm text-[#666] hover:text-[#111]">
            ← Back to portfolio
          </Link>
          <div className="flex gap-2">
            <a
              href="/cv.pdf"
              download
              className="rounded-full bg-[#111] px-4 py-2 text-sm font-medium text-white"
            >
              Download PDF
            </a>
            <PrintButton />
          </div>
        </div>

        <header className="border-b border-[#e4e2dc] pb-6">
          <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-sm text-[#777]">aka {profile.nickname}</p>
          <p className="mt-1 text-[#555]">{profile.role}</p>
          <p className="mt-1 text-sm text-[#777]">
            {profile.location} · Building since {profile.since}
          </p>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[#666]">
            <a className="underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="underline" href={profile.telegram} target="_blank" rel="noreferrer">
              Telegram {profile.telegramHandle}
            </a>
            <a className="underline" href={profile.github} target="_blank" rel="noreferrer">
              github.com/{profile.githubHandle}
            </a>
            <a className="underline" href={profile.x} target="_blank" rel="noreferrer">
              {profile.xHandle}
            </a>
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c44]">
            Profile
          </h2>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#333]">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c44]">
            Focus
          </h2>
          <ul className="mt-3 space-y-3">
            {craft.map((c) => (
              <li key={c.tag}>
                <span className="font-semibold">{c.title}</span>
                <span className="text-[#555]"> — {c.body}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c44]">
            Key highlight
          </h2>
          <p className="mt-3 text-[15px] font-semibold">
            {hackathon.place} place — {hackathon.track}
          </p>
          <p className="mt-1 text-[15px] leading-relaxed text-[#333]">
            {hackathon.name} ({hackathon.hosts}). Project: {hackathon.project}. Track 1 prize pool{' '}
            {hackathon.prizePoolTrack1}.
          </p>
          <a
            href={hackathon.announcement}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-sm text-[#555] underline"
          >
            Official @BNBChainDevs announcement
          </a>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c44]">
            Products I built
          </h2>
          <ul className="mt-4 space-y-5">
            {projects.map((p) => (
              <li key={p.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold">{p.title}</h3>
                  {p.badge && (
                    <span className="text-xs font-medium text-amber-800">{p.badge}</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-[#666]">{p.category}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[#333]">{p.description}</p>
                <p className="mt-2 font-mono text-xs text-[#777]">{p.tech.join(' · ')}</p>
                <p className="mt-1 text-xs text-[#888]">
                  {p.href && (
                    <a href={p.href} className="underline" target="_blank" rel="noreferrer">
                      Live
                    </a>
                  )}
                  {p.href && p.repo && ' · '}
                  {p.repo && (
                    <a href={p.repo} className="underline" target="_blank" rel="noreferrer">
                      Code
                    </a>
                  )}
                  {p.proof && (
                    <>
                      {' · '}
                      <a href={p.proof} className="underline" target="_blank" rel="noreferrer">
                        Proof
                      </a>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c44]">
            Markets I participate in (as user)
          </h2>
          <ul className="mt-4 space-y-4">
            {markets.map((m) => (
              <li key={m.name} className="border-b border-[#eae8e2] pb-4 last:border-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold">
                    {m.name}{' '}
                    <span className="text-sm font-normal text-[#666]">· Role: {m.role}</span>
                  </h3>
                  <span className="text-xs font-medium text-[#888]">
                    {m.tgeLabel ||
                      (m.tgeStatus === 'live'
                        ? 'TGE live'
                        : m.tgeStatus === 'points'
                          ? 'Points / pre-TGE'
                          : 'TGE pending')}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#555]">{m.tagline}</p>
                <p className="mt-2 text-sm text-[#333]">
                  <span className="font-medium">Earned:</span> {m.earned || '—'}
                  {m.earnedNote ? ` — ${m.earnedNote}` : ''}
                </p>
                <p className="mt-1 text-xs text-[#777]">
                  {m.site && (
                    <a href={m.site} className="underline" target="_blank" rel="noreferrer">
                      Website
                    </a>
                  )}
                  {m.referralLink && (
                    <>
                      {m.site ? ' · ' : ''}
                      <a
                        href={m.referralLink}
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Referral
                      </a>
                    </>
                  )}
                  {m.discord && (
                    <>
                      {' · '}
                      <a href={m.discord} className="underline" target="_blank" rel="noreferrer">
                        Discord
                      </a>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c44]">
            Community recognition
          </h2>
          <ul className="mt-4 space-y-3">
            {signals.map((s) => (
              <li key={s.org} className="text-[15px] leading-relaxed text-[#333]">
                <span className="font-semibold">{s.org}</span>
                {s.project && (
                  <span className="text-sm text-[#888]"> · {s.project}</span>
                )}
                <br />
                <span className="text-[#555]">“{s.text}”</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c44]">
            Skills
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#333]">
            Solidity · Hardhat · Next.js · TypeScript · React · wagmi/viem · RainbowKit · Python ·
            LLM agents · CMC MCP · TWAK · Merkle trees · Tailwind · Community ops · Discord systems ·
            AI-assisted prototyping
          </p>
        </section>

        <section className="mt-8 pb-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c44]">
            Open to
          </h2>
          <p className="mt-3 text-[15px] text-[#333]">{profile.openTo}</p>
        </section>
      </div>
    </div>
  );
}
