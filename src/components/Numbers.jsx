import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Eyebrow } from './Shared';

gsap.registerPlugin(ScrollTrigger);

function NumberCard({ value, suffix, desc, index, startCount }) {
  const ref = useRef(null);
  const frameRef = useRef(0);
  const startedRef = useRef(false);
  const [n, setN] = useState(0);
  const [hovered, setHovered] = useState(false);

  useLayoutEffect(() => {
    if (!startCount || startedRef.current) return undefined;

    startedRef.current = true;
    const start = performance.now();
    const duration = 1900;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.round(eased * value));

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameRef.current);
  }, [startCount, value]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered ? 'var(--bg-elevated)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-strong)' : 'var(--border)'}`,
        borderRadius: '24px',
        padding: '36px 36px 32px',
        boxShadow: hovered
          ? `var(--glow-accent), var(--card-shadow-hover), var(--inset-top)`
          : `var(--card-shadow), var(--inset-top)`,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform var(--dur-base) var(--ease-out-expo), box-shadow var(--dur-base) var(--ease-out-expo), background var(--dur-base), border-color var(--dur-base)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minHeight: '220px',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
        }}
      >
        <span style={{ color: 'var(--accent)' }}>{index}</span>
        <span style={{ width: '28px', height: '1px', background: 'var(--border-strong)' }} />
        <span>NUMBERS</span>
      </div>

      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.2rem, 6vw, 4.8rem)',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          color: 'var(--text-primary)',
        }}
      >
        {n}
        <span style={{ color: 'var(--accent)' }}>{suffix}</span>
      </span>

      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: '14.5px',
          lineHeight: 1.5,
          color: 'var(--text-secondary)',
          marginTop: '-4px',
        }}
      >
        {desc}
      </p>
    </div>
  );
}

export default function Numbers() {
  const containerRef = useRef(null);
  const [startCount, setStartCount] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const stats = [
    { value: 280, suffix: '+', desc: 'LeetCode problems solved.', index: '01' },
    { value: 120, suffix: '+', desc: 'GeeksforGeeks problems solved.', index: '02' },
    { value: 150, suffix: '+', desc: 'Python problems created.', index: '03' },
    { value: 5, suffix: 'th', desc: 'Rank in National Hackathon.', index: '04' },
  ];

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!containerRef.current) return undefined;
    if (reduce) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setStartCount(true);
          observer.disconnect();
        });
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.18 }
    );

    observer.observe(containerRef.current);

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
        .fromTo('.num-eyebrow', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo('.num-title-char', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.045, ease: 'power4.out' }, '-=0.55');

      gsap.fromTo(
        '.num-card-anim',
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        paddingTop: 'var(--section-pad-y)',
        paddingBottom: 'var(--section-pad-y)',
        paddingLeft: 'var(--section-pad-x)',
        paddingRight: 'var(--section-pad-x)',
      }}
    >
      <div className="num-eyebrow" style={{ display: 'inline-block', opacity: 0 }}>
        <Eyebrow index="05">By the numbers</Eyebrow>
      </div>

      <h2
        style={{
          margin: 'var(--space-5) 0 var(--space-10)',
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-section)',
          fontWeight: 600,
          lineHeight: 0.92,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {'NUMBERS'.split('').map((char, idx) => (
          <span key={idx} className="num-title-char" style={{ display: 'inline-block' }}>
            {char}
          </span>
        ))}
      </h2>

      <div className="numbers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'clamp(20px,3vw,40px)' }}>
        {stats.map((s) => (
          <div key={s.index} className="num-card-anim" style={{ opacity: 0 }}>
            <NumberCard {...s} startCount={startCount} />
          </div>
        ))}
      </div>
    </div>
  );
}
