'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { hackathon } from '@/lib/data';

const STORAGE_KEY = 'rishu-announcement-dismissed-v2';
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Floating notification panel — tweet-style preview of official BNB Hack placement.
 * Dismissed for 7 days (localStorage). Mobile: full-width bottom bar, safe padding.
 */
export function AnnouncementPanel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ts = Number(raw);
        if (!Number.isNaN(ts) && Date.now() - ts < WEEK_MS) return;
      }
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] mx-auto w-auto max-w-[380px] max-md:max-h-[min(52dvh,420px)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:mx-0 sm:max-h-none sm:w-[min(100vw-2rem,380px)]"
        >
          <div className="max-md:max-h-[min(52dvh,420px)] overflow-hidden overflow-y-auto rounded-2xl border border-white/15 bg-[#0c0e16]/98 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:max-h-none">
            <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-white/10 bg-[#0c0e16]/95 px-3 py-2 sm:static sm:px-4 sm:py-2.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-50 max-md:animate-none" />
                  <span className="relative h-2 w-2 rounded-full bg-amber-400" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/55">
                  ANNOUNCEMENT
                </span>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white sm:h-8 sm:w-8"
                aria-label="Dismiss announcement"
              >
                <X className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
              </button>
            </div>

            <a
              href={hackathon.announcement}
              target="_blank"
              rel="noreferrer"
              className="block px-3 pb-3 pt-2.5 transition active:bg-white/[0.04] sm:px-4 sm:pb-4 sm:pt-3 sm:hover:bg-white/[0.03]"
            >
              <div className="mb-2.5 flex items-start gap-2.5 sm:mb-3 sm:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-yellow-400/80 to-amber-700 text-[10px] font-bold text-black sm:h-10 sm:w-10 sm:text-[11px]">
                  BNB
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                    <span className="truncate text-[13px] font-semibold text-white sm:text-sm">
                      BNB Chain Developers
                    </span>
                    <span className="font-mono text-[10px] text-white/40 sm:text-[11px]">
                      @BNBChainDevs
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] tracking-wide text-white/40">
                    Jul 8, 2026 · Official
                  </p>
                </div>
              </div>

              <p className="text-[13px] leading-relaxed text-white/90 sm:text-[13.5px]">
                Track 1: Autonomous Trading Agents
                <br />
                <span className="text-white/50">• 1st: Neural Alpha by ClipX</span>
                <br />
                <span className="font-medium text-amber-100">• 2nd: Genesis</span>
                <br />
                <span className="text-white/50">• 3rd: Gridora …</span>
              </p>

              <div className="mt-2.5 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-amber-500/15 via-yellow-600/10 to-transparent px-3 py-2 sm:mt-3 sm:py-2.5">
                <div className="font-mono text-[9px] tracking-[0.16em] text-amber-100/70">
                  BNB HACK · AI TRADING AGENT EDITION
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  Genesis · 2nd place · Track 1
                </div>
                <div className="mt-0.5 text-xs text-white/55">
                  Co-hosted with CoinMarketCap &amp; Trust Wallet
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs text-white/45 sm:mt-3">
                <span className="font-mono tracking-wide">Open on X</span>
                <span className="inline-flex items-center gap-1 text-amber-100/90">
                  View post
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
