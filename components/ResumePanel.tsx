'use client';

import { motion } from 'framer-motion';
import { profile, hackathon } from '@/lib/data';

/**
 * Portrait panel.
 * - hero: professional blazer headshot
 * - about: different cinematic / builder style
 */
export function ResumePanel({ variant = 'hero' }: { variant?: 'hero' | 'about' }) {
  const years = new Date().getFullYear() - profile.since;
  const isAbout = variant === 'about';
  const photo = isAbout
    ? profile.photoAbout || profile.photo
    : profile.photo;

  const lines = [
    { k: 'ROLE', v: profile.role },
    { k: 'BASED', v: profile.location },
    { k: 'HIGHLIGHT', v: `Genesis · ${hackathon.place} · Track 1` },
  ];

  // About: clean portrait only — no text stacked on the image
  if (isAbout) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[3/4] min-h-[260px] overflow-hidden rounded-[1.25rem] border border-white/12 shadow-2xl shadow-black/50 sm:min-h-[320px] sm:rounded-[1.75rem] sm:aspect-[4/5] md:min-h-[320px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={profile.name}
          className="absolute inset-0 h-full w-full object-cover object-[center_12%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060a]/40 via-transparent to-transparent" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[3/4] min-h-[340px] overflow-hidden rounded-[1.25rem] border border-white/12 shadow-2xl shadow-black/50 sm:min-h-[400px] sm:rounded-[1.75rem] sm:aspect-[4/5] md:min-h-[440px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt={profile.name}
        className="absolute inset-0 h-full w-full object-cover object-[center_12%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-[#05060a]/50 to-[#05060a]/25" />

      <div className="relative flex h-full flex-col justify-end p-4 sm:p-5 md:p-6">
        <div className="mb-2 font-mono text-[9px] tracking-[0.2em] text-[var(--accent)] sm:mb-3 sm:text-[10px] sm:tracking-[0.22em]">
          RESUME · PROFILE
        </div>
        <div className="text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">
          {profile.name}
        </div>
        <div className="mt-1 text-xs text-white/70 sm:text-sm">
          aka {profile.nickname} · {years}Y+ · {profile.location}
        </div>

        <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
          {lines.map((row, i) => (
            <motion.div
              key={row.k}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.07 }}
              className="rounded-xl border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-md sm:px-3.5 sm:py-2.5"
            >
              <div className="font-mono text-[9px] tracking-[0.18em] text-white/40">{row.k}</div>
              <div className="mt-0.5 text-[12px] leading-snug text-white/90 line-clamp-2 sm:text-[13px]">
                {row.v}
              </div>
            </motion.div>
          ))}
        </div>

        <a
          href={profile.cvPage}
          className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/15 sm:mt-4"
        >
          Open full resume
          <span className="font-mono text-[10px] text-white/50">/cv</span>
        </a>
      </div>
    </motion.div>
  );
}
