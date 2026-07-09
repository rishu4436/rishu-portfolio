'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '@/lib/data';

const LINES = [
  'Opening resume…',
  'Loading the world of Rishu',
  'Also known as Rishabh',
  'Builder · Community · On-chain',
];

/**
 * Branded boot screen — resume / world-of-Rishu intro instead of a plain loader.
 */
export function ResumeBoot() {
  const [show, setShow] = useState(true);
  const [lineIdx, setLineIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lineTimer = window.setInterval(() => {
      setLineIdx((i) => Math.min(i + 1, LINES.length - 1));
    }, 480);

    const start = performance.now();
    // Slightly faster on small screens so mobile feels snappier
    const duration =
      typeof window !== 'undefined' && window.innerWidth < 768 ? 1600 : 2200;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const end = window.setTimeout(() => setShow(false), duration + 350);

    return () => {
      clearInterval(lineTimer);
      clearTimeout(end);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="resume-boot"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#05060a] px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,90,60,0.12),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-30" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photo}
              alt=""
              className="h-full w-full object-cover object-top"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative font-mono text-[10px] tracking-[0.35em] text-[var(--accent)]"
          >
            RESUME INTERFACE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mt-3 text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Entering the world of{' '}
            <span className="glow-text">Rishu</span>
          </motion.h1>
          <p className="relative mt-2 text-center text-sm text-white/50">
            Rishabh · {profile.name}
          </p>

          <div className="relative mt-10 h-8 w-full max-w-xs overflow-hidden text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-mono text-[11px] tracking-[0.14em] text-white/55"
              >
                {LINES[lineIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative mt-6 h-[2px] w-full max-w-xs overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-[var(--accent)] via-cyan-300 to-violet-300"
              style={{ scaleX: progress }}
            />
          </div>
          <p className="relative mt-3 font-mono text-[10px] tracking-[0.2em] text-white/30">
            {Math.round(progress * 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
