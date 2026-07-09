'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Download, ExternalLink, Mail, Menu, X } from 'lucide-react';
import { Atmosphere } from '@/components/Atmosphere';
import { AnnouncementPanel } from '@/components/AnnouncementPanel';
import { ResumeBoot } from '@/components/ResumeBoot';
import { Magnetic, Reveal, ScrollProgress, TiltCard } from '@/components/Motion';
import { ResumePanel } from '@/components/ResumePanel';
import { GithubIcon, XIcon } from '@/components/Icons';
import {
  craft,
  marqueePrimary,
  marqueeSecondary,
  navLinks,
  profile,
  projects,
  signals,
  userMarkets,
} from '@/lib/data';

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const openEmail = () => {
    const addr = profile.email;
    // Prefer native mail client
    window.location.href = `mailto:${addr}?subject=${encodeURIComponent('Hello Rishu — from your portfolio')}`;
    // Fallback: copy if mail client does nothing (common on some desktops)
    void navigator.clipboard?.writeText(addr).then(() => {
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2500);
    });
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenu(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenu(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="relative min-h-[100dvh] text-white">
      <ResumeBoot />
      <Atmosphere />
      <ScrollProgress />
      <AnnouncementPanel />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05060a]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[#05060a]/75">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-3.5">
          <a href="#" className="flex min-w-0 items-center gap-2.5 md:gap-3">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photo}
                alt=""
                className="h-full w-full object-cover object-top"
              />
            </span>
            <span className="min-w-0 sm:block">
              <span className="block truncate text-[13px] font-medium leading-tight sm:text-sm">
                {profile.name}
              </span>
              <span className="block truncate text-[10px] text-white/45 sm:text-[11px]">
                aka {profile.nickname}
              </span>
            </span>
          </a>

          <nav className="glass hidden items-center gap-0.5 rounded-full px-1.5 py-1 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Magnetic>
              <a
                href={profile.cv}
                download
                className="btn-ghost hidden !h-auto !w-auto !px-4 !py-2 font-mono text-[11px] tracking-[0.12em] sm:inline-flex"
                title="Download CV PDF"
              >
                <Download className="h-3.5 w-3.5" />
                CV
              </a>
            </Magnetic>
            <button
              type="button"
              className="glass flex h-11 w-11 items-center justify-center rounded-full md:hidden"
              onClick={() => setMenu((v) => !v)}
              aria-label={menu ? 'Close menu' : 'Open menu'}
              aria-expanded={menu}
            >
              {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass mx-3 mb-3 max-h-[70dvh] overflow-y-auto rounded-2xl p-2 md:hidden"
            >
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block rounded-xl px-4 py-3.5 font-mono text-xs tracking-[0.16em] text-white active:bg-white/10"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={profile.cv}
                download
                className="block rounded-xl px-4 py-3.5 font-mono text-xs tracking-[0.16em] text-[var(--accent)] active:bg-white/10"
              >
                Download CV
              </a>
              <a
                href={profile.cvPage}
                className="block rounded-xl px-4 py-3.5 font-mono text-xs tracking-[0.16em] text-white/80 active:bg-white/10"
              >
                View resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="site-content">
        <section className="relative flex min-h-0 items-center px-4 pb-14 pt-24 max-md:min-h-0 md:min-h-[100dvh] md:px-6 md:pb-20 md:pt-28">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 max-md:gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-white max-md:flex-wrap sm:mb-7 sm:gap-2.5 sm:px-3.5 sm:text-[11px] sm:tracking-[0.18em]"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="min-w-0 break-words">
                  OPEN TO BUILD · {profile.location.toUpperCase()}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-read max-w-4xl text-[clamp(2rem,8.5vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] md:leading-[0.98]"
              >
                Building the
                <br />
                <span className="glow-text">on-chain future</span>
                <br />
                from Bihar, India.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.55 }}
                className="mt-3 font-mono text-[10px] tracking-[0.1em] text-white/45 sm:mt-4 sm:text-[12px] sm:tracking-[0.14em]"
              >
                {profile.name.toUpperCase()} · AKA {profile.nickname.toUpperCase()}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.65 }}
                className="text-muted mt-4 max-w-lg text-[15px] leading-relaxed sm:mt-5 sm:text-base md:text-lg"
              >
                {profile.role}. Exploring decentralized tech since {profile.since} — shipping
                on-chain products, joining communities, and building with discipline.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.55 }}
                className="mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap"
              >
                <Magnetic className="w-full sm:w-auto">
                  <a href="#projects" className="btn-primary max-md:!w-full">
                    View projects
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.18} className="w-full sm:w-auto">
                  <a href="#contact" className="btn-ghost max-md:!w-full">
                    Get in touch
                  </a>
                </Magnetic>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.36 }}
                className="mt-7 max-w-lg rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm sm:mt-10"
              >
                <div className="font-mono text-[10px] tracking-[0.18em] text-white/45">OPEN TO</div>
                <p className="mt-1 text-[13px] leading-snug text-white/85 sm:text-sm">
                  {profile.openTo}
                </p>
              </motion.div>

              <motion.dl
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
                className="mt-8 grid max-w-md grid-cols-3 gap-3 border-t border-white/10 pt-6 sm:mt-10 sm:gap-4 sm:pt-8"
              >
                {[
                  { k: `${new Date().getFullYear() - profile.since}Y+`, v: 'Building' },
                  { k: '2nd', v: 'Track 1 BNB Hack' },
                  { k: '3', v: 'Featured builds' },
                ].map((s, i) => (
                  <motion.div
                    key={s.v}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48 + i * 0.08 }}
                  >
                    <dt className="text-lg font-semibold tracking-tight text-white sm:text-xl md:text-2xl">
                      {s.k}
                    </dt>
                    <dd className="mt-1 font-mono text-[9px] leading-tight tracking-[0.12em] text-white/55 sm:text-[10px] sm:tracking-[0.16em]">
                      {s.v}
                    </dd>
                  </motion.div>
                ))}
              </motion.dl>
            </div>

            {/* Resume panel — slightly compact on mobile only */}
            <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0 lg:max-w-none">
              <ResumePanel variant="hero" />
            </div>
          </div>
        </section>

        <section className="space-y-2.5 border-y border-white/10 bg-black/35 py-4 backdrop-blur-sm">
          <div className="overflow-hidden">
            <div className="marquee-track gap-8 px-4">
              {[...marqueePrimary, ...marqueePrimary].map((item, i) => (
                <span
                  key={`p-${i}`}
                  className="font-mono text-xs tracking-[0.28em] text-white/70 md:text-sm"
                >
                  {item}
                  <span className="ml-8 text-[var(--accent)]">◆</span>
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="marquee-track-rev gap-8 px-4">
              {[...marqueeSecondary, ...marqueeSecondary].map((item, i) => (
                <span
                  key={`s-${i}`}
                  className="font-mono text-xs tracking-[0.28em] text-white/55 md:text-sm"
                >
                  {item}
                  <span className="ml-8 text-cyan-300/80">◇</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 px-4 py-14 md:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="section-label">01 — ABOUT</p>
              <h2 className="text-read text-[1.75rem] font-semibold tracking-tight sm:text-3xl md:text-5xl">
                Who I am &amp; what I do.
              </h2>
              <p className="mt-3 break-words font-mono text-[10px] tracking-[0.12em] text-white/40 sm:mt-4 sm:text-[11px] sm:tracking-[0.16em]">
                {profile.location.toUpperCase()} · SINCE {profile.since}
              </p>
            </Reveal>

            <div className="mt-8 grid items-start gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-12">
              {/* Photo only — no title stacked on top of it */}
              <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0 lg:max-w-none">
                <Reveal>
                  <ResumePanel variant="about" />
                </Reveal>
              </div>

              <div className="space-y-4 text-[15px] leading-relaxed sm:space-y-5 sm:text-[17px] lg:col-span-7">
                {profile.about.map((para, i) => (
                  <Reveal key={i} delay={0.05 + i * 0.06}>
                    <p className={i === profile.about.length - 1 ? 'text-white/65' : 'text-muted'}>
                      {para}
                    </p>
                  </Reveal>
                ))}

                <Reveal delay={0.28}>
                  <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
                    {craft.map((c, i) => (
                      <motion.div
                        key={c.tag}
                        className="glass rounded-2xl p-5"
                        whileHover={{ y: -6, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                        style={{ transitionDelay: `${i * 40}ms` }}
                      >
                        <div className="mb-3 font-mono text-[10px] tracking-[0.2em] text-[var(--accent)]">
                          {c.tag}
                        </div>
                        <h3 className="mb-2 text-base font-semibold">{c.title}</h3>
                        <p className="text-sm leading-relaxed text-white/70">{c.body}</p>
                      </motion.div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 px-4 py-14 md:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mb-8 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-4">
                <div>
                  <p className="section-label">02 — BUILT BY ME</p>
                  <h2 className="text-read max-w-xl text-[1.75rem] font-semibold tracking-tight sm:text-3xl md:text-5xl">
                    Products I ship.
                  </h2>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-white/60 md:text-right">
                  Code &amp; products I developed — not markets I only join as a user.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <TiltCard className="project-card glass group flex h-full flex-col overflow-hidden rounded-3xl">
                    <div
                      className={`relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-gradient-to-br ${p.accent}`}
                    >
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt={p.imageAlt || p.title}
                          className={`h-full w-full transition duration-700 ease-out group-hover:scale-105 ${
                            p.imageFit === 'contain'
                              ? 'object-contain object-center p-6 sm:p-10'
                              : 'object-cover object-top group-hover:scale-110'
                          }`}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                      <div
                        className={`pointer-events-none absolute inset-0 ${
                          p.imageFit === 'contain'
                            ? 'bg-gradient-to-t from-black/70 via-transparent to-transparent'
                            : 'bg-gradient-to-t from-black/75 via-black/15 to-black/20'
                        }`}
                      />
                      {p.badge && (
                        <div className="absolute left-3 top-3 z-[1] max-w-[80%] rounded-full border border-amber-300/40 bg-black/55 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-amber-50 backdrop-blur-sm sm:left-4 sm:top-4">
                          {p.badge}
                        </div>
                      )}
                      <div className="pointer-events-none absolute bottom-3 left-3 z-[1] font-mono text-[10px] tracking-[0.16em] text-white/90 sm:bottom-4 sm:left-5">
                        {p.category.toUpperCase()}
                      </div>
                      <div className="pointer-events-none absolute right-3 top-3 z-[1] flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/60 backdrop-blur-sm sm:right-4 sm:top-4 sm:h-9 sm:w-9">
                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
                      <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
                        {p.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white/65"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5">
                        {p.href ? (
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition hover:text-[var(--accent)]"
                          >
                            Live
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                        {p.proof && (
                          <a
                            href={p.proof}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-100/90 transition hover:text-amber-50"
                          >
                            Proof
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-white/70 transition hover:text-white"
                          >
                            Code
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="signal" className="scroll-mt-24 px-4 py-14 md:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="section-label">03 — COMMUNITY</p>
              <h2 className="text-read mb-3 max-w-xl text-[1.75rem] font-semibold tracking-tight sm:mb-4 sm:text-3xl md:text-5xl">
                Recognition from the community.
              </h2>
              <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/55 md:mb-12">
                Screenshots of shoutouts and feedback from communities I&apos;m active in.
              </p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {signals.map((s, i) => (
                <Reveal key={s.org} delay={i * 0.06}>
                  <blockquote className="glass flex h-full flex-col overflow-hidden rounded-3xl">
                    {s.image ? (
                      <a
                        href={s.href || s.image}
                        target={s.href ? '_blank' : undefined}
                        rel={s.href ? 'noreferrer' : undefined}
                        className="group relative block border-b border-white/10 bg-black/40"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.image}
                          alt={s.imageAlt || `Appreciation for ${s.project || s.org}`}
                          className="max-h-56 w-full object-contain object-top transition duration-500 group-hover:scale-[1.01] sm:max-h-72 md:max-h-80"
                          loading="lazy"
                        />
                        {s.project && (
                          <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-white/90 backdrop-blur-sm">
                            {s.project.toUpperCase()}
                          </span>
                        )}
                      </a>
                    ) : null}

                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      {!s.image && s.project ? (
                        <div className="mb-3 font-mono text-[10px] tracking-[0.16em] text-[var(--accent)]">
                          RE: {s.project.toUpperCase()}
                        </div>
                      ) : null}
                      <p className="flex-1 text-[16px] leading-snug text-white/95">
                        &ldquo;{s.text}&rdquo;
                      </p>
                      <footer className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                        <span className="font-mono text-[11px] tracking-[0.12em] text-white/55">
                          {s.org}
                        </span>
                        {s.href ? (
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.12em] text-amber-100/90 transition hover:text-amber-50"
                          >
                            VIEW
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ) : null}
                      </footer>
                    </div>
                  </blockquote>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-white/35">
              More shoutouts? Drop images in{' '}
              <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-white/50">
                public/screenshots
              </code>
            </p>
          </div>
        </section>

        {/* Markets I'm part of as a USER */}
        <section id="markets" className="scroll-mt-24 px-4 py-14 md:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mb-8 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-4">
                <div>
                  <p className="section-label">04 — MARKETS · AS USER</p>
                  <h2 className="text-read max-w-xl text-[1.75rem] font-semibold tracking-tight sm:text-3xl md:text-5xl">
                    Projects I&apos;m part of.
                  </h2>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-white/60 md:text-right">
                  Separate from Built — products I join as a user / referral partner.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {userMarkets.map((m, i) => {
                const tgeLabel =
                  m.tgeLabel ||
                  (m.tgeStatus === 'pending'
                    ? 'TGE not happened'
                    : m.tgeStatus === 'points'
                      ? 'Points · pre-TGE'
                      : 'Live · earned');
                const tgeColor =
                  m.tgeStatus === 'pending'
                    ? 'border-amber-400/35 bg-amber-400/10 text-amber-100'
                    : m.tgeStatus === 'points'
                      ? 'border-violet-400/35 bg-violet-400/10 text-violet-100'
                      : 'border-emerald-400/35 bg-emerald-400/10 text-emerald-100';

                const isPlaceholder = m.role === 'TBD' || m.name.startsWith('Slot ');

                return (
                  <Reveal key={`${m.name}-${i}`} delay={i * 0.06}>
                    <article
                      className={`glass flex h-full flex-col overflow-hidden rounded-3xl ${
                        isPlaceholder ? 'border-dashed border-white/15 opacity-70' : ''
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-br ${m.accent}`}
                      >
                        {m.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={m.cover}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover opacity-35"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-[#0a0c12]/70 to-transparent" />
                        <div className="relative px-6 py-8">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              {m.logo ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={m.logo}
                                  alt={`${m.name} logo`}
                                  className="h-12 w-12 rounded-2xl border border-white/15 bg-black/40 object-contain p-1.5"
                                />
                              ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/40 font-mono text-sm font-bold text-white/40">
                                  {isPlaceholder ? '+' : m.name.slice(0, 2).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <div
                                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] ${
                                    isPlaceholder
                                      ? 'border-white/15 bg-white/5 text-white/45'
                                      : 'border-[var(--accent)]/35 bg-[var(--accent-soft)] text-[var(--accent)]'
                                  }`}
                                >
                                  ROLE · {m.role.toUpperCase()}
                                </div>
                                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                                  {isPlaceholder ? 'Coming soon' : m.name}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-white/75">{m.tagline}</p>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[10px] tracking-[0.16em] text-white/45">
                              STATUS
                            </span>
                            <span
                              className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide ${tgeColor}`}
                            >
                              {tgeLabel}
                            </span>
                          </div>
                          <div className="mt-3 flex items-baseline justify-between gap-3">
                            <span className="text-xs text-white/45">
                              {m.tgeStatus === 'pending'
                                ? 'Cash earned'
                                : m.tgeStatus === 'points'
                                  ? 'Points / rewards'
                                  : 'Earned from here'}
                            </span>
                            <span className="text-2xl font-semibold tracking-tight text-white">
                              {m.tgeStatus === 'pending' && (!m.earned || m.earned === '—')
                                ? '—'
                                : m.earned || '—'}
                            </span>
                          </div>
                          {m.earnedNote && (
                            <p className="mt-2 text-xs leading-relaxed text-white/45">
                              {m.earnedNote}
                            </p>
                          )}
                        </div>

                        <div className="mt-5 flex flex-1 flex-col justify-end gap-3">
                          {isPlaceholder ? (
                            <div className="btn-ghost w-full justify-center !rounded-2xl !cursor-default opacity-60">
                              Add details later
                            </div>
                          ) : m.referralLink ? (
                            <a
                              href={m.referralLink}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-primary w-full justify-center !rounded-2xl"
                            >
                              {m.referralLabel || 'Join with my referral'}
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          ) : m.site ? (
                            <a
                              href={m.site}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-primary w-full justify-center !rounded-2xl"
                            >
                              Visit website
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          ) : null}
                          <div className="flex flex-wrap items-center justify-center gap-4">
                            {m.discord && (
                              <a
                                href={m.discord}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm text-white/55 transition hover:text-white"
                              >
                                Discord
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                            {m.site && m.referralLink && (
                              <a
                                href={m.site}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm text-white/55 transition hover:text-white"
                              >
                                Official site
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <p className="mt-8 text-center text-xs text-white/35">
              Edit markets, referral links &amp; earnings in{' '}
              <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-white/50">
                lib/data.ts → userMarkets
              </code>
            </p>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 px-4 pb-32 pt-10 max-md:pb-[calc(8rem+env(safe-area-inset-bottom))] md:px-6 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-gradient-to-br from-[#12151f] via-[#0a0c12] to-[#0f1520] px-4 py-10 shadow-[0_0_80px_-20px_rgba(255,90,60,0.35)] sm:rounded-[2rem] sm:px-6 sm:py-14 md:px-12 md:py-16">
                {/* Energy layers */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--accent)]/20 blur-[100px]" />
                <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-cyan-400/15 blur-[90px]" />
                <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[70px]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

                <div className="relative grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-5">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-emerald-200 sm:mb-5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                        <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      OPEN CHANNEL
                    </div>
                    <p className="section-label">05 — CONTACT</p>
                    <h2 className="text-read mt-2 text-[1.75rem] font-semibold tracking-tight sm:text-3xl md:text-5xl">
                      Let&apos;s build what
                      <br />
                      <span className="glow-text">doesn&apos;t exist yet.</span>
                    </h2>
                    <p className="text-muted mt-4 max-w-md text-[15px] leading-relaxed sm:mt-5 sm:text-base">
                      Collaborations, builder programs, ambassador work, and serious on-chain
                      products. Based in {profile.location}.
                    </p>
                    <p className="mt-3 max-w-sm text-sm text-white/50 sm:mt-4">{profile.openTo}</p>

                    <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
                      <button
                        type="button"
                        onClick={openEmail}
                        className="btn-primary !rounded-2xl !px-7 !py-3.5 max-md:!w-full"
                      >
                        {emailCopied ? (
                          <>
                            Email copied
                            <Check className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Email me
                            <Mail className="h-4 w-4" />
                          </>
                        )}
                      </button>
                      <a
                        href={profile.cv}
                        download
                        className="btn-ghost !rounded-2xl !px-7 !py-3.5 max-md:!w-full"
                      >
                        <Download className="h-4 w-4" />
                        Download CV
                      </a>
                    </div>
                    {emailCopied && (
                      <p className="mt-3 text-xs text-emerald-300/90">
                        {profile.email} copied — paste into your mail app if nothing opened.
                      </p>
                    )}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
                    <motion.a
                      href={profile.x}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0, duration: 0.45 }}
                      whileHover={{ y: -4, scale: 1.015 }}
                      className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md transition hover:border-white/30 hover:shadow-[0_0_30px_-8px_rgba(255,255,255,0.25)]"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition group-hover:scale-110">
                        <XIcon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10px] tracking-[0.16em] text-white/45">
                          X / TWITTER
                        </span>
                        <span className="mt-1 block truncate text-sm font-medium text-white">
                          {profile.xHandle}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition group-hover:text-white" />
                    </motion.a>

                    <motion.a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.07, duration: 0.45 }}
                      whileHover={{ y: -4, scale: 1.015 }}
                      className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md transition hover:border-violet-400/40 hover:shadow-[0_0_30px_-8px_rgba(167,139,250,0.35)]"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200 transition group-hover:scale-110">
                        <GithubIcon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10px] tracking-[0.16em] text-white/45">
                          GITHUB
                        </span>
                        <span className="mt-1 block truncate text-sm font-medium text-white">
                          {profile.githubHandle}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition group-hover:text-white" />
                    </motion.a>

                    <motion.a
                      href={profile.telegram}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.12, duration: 0.45 }}
                      whileHover={{ y: -4, scale: 1.015 }}
                      className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md transition hover:border-sky-400/40 hover:shadow-[0_0_30px_-8px_rgba(56,189,248,0.35)]"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-400/15 text-sky-200 transition group-hover:scale-110">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10px] tracking-[0.16em] text-white/45">
                          TELEGRAM
                        </span>
                        <span className="mt-1 block truncate text-sm font-medium text-white">
                          {profile.telegramHandle}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition group-hover:text-white" />
                    </motion.a>

                    {/* Email: button, not broken mailto-only */}
                    <motion.button
                      type="button"
                      onClick={openEmail}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.17, duration: 0.45 }}
                      whileHover={{ y: -4, scale: 1.015 }}
                      className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 text-left backdrop-blur-md transition hover:border-[var(--accent)]/45 hover:shadow-[0_0_30px_-8px_rgba(255,90,60,0.4)]"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] transition group-hover:scale-110">
                        {emailCopied ? <Check className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10px] tracking-[0.16em] text-white/45">
                          EMAIL
                        </span>
                        <span className="mt-1 block truncate text-sm font-medium text-white">
                          {emailCopied ? 'Copied to clipboard' : profile.email}
                        </span>
                      </span>
                      <Copy className="h-4 w-4 shrink-0 text-white/30 transition group-hover:text-white" />
                    </motion.button>

                    <motion.a
                      href={profile.cvPage}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.24, duration: 0.45 }}
                      whileHover={{ y: -4, scale: 1.015 }}
                      className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md transition hover:border-cyan-400/40 hover:shadow-[0_0_30px_-8px_rgba(125,243,255,0.35)] sm:col-span-2"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-200 transition group-hover:scale-110">
                        <Download className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10px] tracking-[0.16em] text-white/45">
                          RESUME
                        </span>
                        <span className="mt-1 block truncate text-sm font-medium text-white">
                          View full CV page · /cv
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition group-hover:text-white" />
                    </motion.a>

                    <motion.a
                      href={profile.cv}
                      download
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.45 }}
                      whileHover={{ y: -3 }}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--accent)]/30 bg-gradient-to-r from-[var(--accent)]/15 via-transparent to-cyan-400/10 p-5 transition hover:border-[var(--accent)]/55 sm:col-span-2"
                    >
                      <span>
                        <span className="block font-mono text-[10px] tracking-[0.16em] text-[var(--accent)]">
                          ONE-CLICK
                        </span>
                        <span className="mt-1 block text-base font-semibold text-white">
                          Download CV (PDF)
                        </span>
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-black transition group-hover:scale-110">
                        <Download className="h-5 w-5" />
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* bottom spacer so announcement panel doesn't cover content on mobile */}
        <div className="h-28 max-md:h-[calc(7rem+env(safe-area-inset-bottom))] sm:h-8" aria-hidden />

        <footer className="border-t border-white/10 bg-black/40 px-4 py-6 backdrop-blur-md md:px-6 md:py-7">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center font-mono text-[9px] tracking-[0.14em] text-white/50 sm:flex-row sm:gap-3 sm:text-left sm:text-[10px] sm:tracking-[0.18em]">
            <span className="break-words">
              {profile.name.toUpperCase()} · AKA {profile.nickname.toUpperCase()}
            </span>
            <span>© {new Date().getFullYear()} · BUILDER INTERFACE</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
