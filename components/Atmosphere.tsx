'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Immersive atmosphere: ambient video + aurora + particles.
 * Video on desktop only; respects reduced-motion; pauses when tab hidden.
 */
export function Atmosphere() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowVideo, setAllowVideo] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const dots = useMemo(
    () =>
      Array.from({ length: isMobile ? 8 : 20 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 5) % 100}%`,
        delay: `${(i % 10) * 0.6}s`,
        duration: `${12 + (i % 6) * 1.4}s`,
        size: 2 + (i % 3),
      })),
    [isMobile]
  );

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqMobile = window.matchMedia('(max-width: 768px)');
    const update = () => setAllowVideo(!mqMotion.matches && !mqMobile.matches);
    update();
    mqMotion.addEventListener('change', update);
    mqMobile.addEventListener('change', update);
    return () => {
      mqMotion.removeEventListener('change', update);
      mqMobile.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !allowVideo) return;
    const onVis = () => {
      if (document.hidden) v.pause();
      else void v.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVis);
    void v.play().catch(() => {});
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [allowVideo]);

  return (
    <>
      <div className="ambient-video" aria-hidden>
        {allowVideo && (
          <video
            ref={videoRef}
            className="ambient-video-el"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="veil" />
      </div>

      <div className="aurora" aria-hidden>
        <div className="aurora-blob aurora-a" />
        <div className="aurora-blob aurora-b" />
        <div className="aurora-blob aurora-c" />
      </div>

      <div className="particles" aria-hidden>
        {dots.map((d) => (
          <span
            key={d.id}
            className="particle"
            style={{
              left: d.left,
              animationDelay: d.delay,
              animationDuration: d.duration,
              width: d.size,
              height: d.size,
            }}
          />
        ))}
      </div>

      <div className="scan-sweep" aria-hidden />
    </>
  );
}
