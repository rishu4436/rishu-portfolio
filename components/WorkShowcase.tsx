'use client';

import { motion } from 'framer-motion';
import { projects, hackathon } from '@/lib/data';

/** Visual panel of my work — replaces generic video. */
export function WorkShowcase({ variant = 'hero' }: { variant?: 'hero' | 'about' }) {
  const shots = projects.filter((p) => p.image).slice(0, 3);
  const tall = variant === 'hero';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`glass relative overflow-hidden rounded-[1.75rem] ${
        tall ? 'aspect-[4/5] sm:aspect-[5/6]' : 'aspect-[16/11]'
      }`}
    >
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1.5">
        {shots.map((p, i) => (
          <div
            key={p.title}
            className={`relative overflow-hidden rounded-xl ${
              i === 0 ? 'col-span-2 row-span-1' : ''
            } ${!tall && i === 0 ? 'min-h-0' : ''}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.imageAlt || p.title}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-2 left-2.5 right-2">
              <div className="font-mono text-[9px] tracking-[0.14em] text-white/55">
                {p.badge || p.category}
              </div>
              <div className="truncate text-sm font-semibold text-white">{p.title}</div>
            </div>
          </div>
        ))}
        {shots.length < 3 && (
          <div className="flex items-center justify-center rounded-xl bg-white/5 font-mono text-xs text-white/40">
            WORK
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060a]/90 via-transparent to-black/20" />

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <div className="rounded-2xl border border-white/12 bg-black/55 p-3.5 backdrop-blur-md">
          <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--accent)]">
            SELECTED WORK · HIGHLIGHT
          </div>
          <div className="mt-1.5 text-sm font-semibold text-white md:text-base">
            Genesis · {hackathon.place} place · {hackathon.track}
          </div>
          <div className="mt-1 text-xs text-white/55">
            LitChess · OPN RewardVault · on-chain products
          </div>
        </div>
      </div>
    </motion.div>
  );
}
