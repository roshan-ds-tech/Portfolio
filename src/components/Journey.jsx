import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Eyebrow } from './Shared';

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    y: '2023',
    t: 'Started Programming',
    d: 'First lines of code. Foundations in Python, algorithms, data structures, and the craft of building scalable logic.',
    tag: 'Foundations',
    icon: '{ }',
    color: '#00FFAA',   // Neon green
    num: '01'
  },
  {
    y: '2024',
    t: 'Hackathons & Projects',
    d: 'Shipping under pressure. Competitive builds, late-night prototyping, and a 5th-place finish at the national level.',
    tag: '5th National Hackathon',
    icon: '⚡',
    color: '#FF4D4D',   // Neon Red
    num: '02'
  },
  {
    y: '2025',
    t: 'Full Stack Development',
    d: 'End-to-end applications — building interactive frontend layers with React, scalable servers, databases, and structural APIs.',
    tag: 'React & Node.js',
    icon: '◈',
    color: '#00AAFF',   // Neon blue
    num: '03'
  },
  {
    y: '2026',
    t: 'Data Science & AI',
    d: 'Diving deep into machine learning model pipelines, predictive analysis, and data-driven intelligent digital products.',
    tag: 'Machine Learning',
    icon: '◎',
    color: '#B266FF',   // Neon purple
    num: '04'
  },
];

export default function Journey() {
  const containerRef = useRef(null);
  const trackRef    = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !containerRef.current) return;

    const ctx = gsap.context(() => {

      /* ── header reveal ── */
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      })
      .fromTo('.jrn-eyebrow',  { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo('.jrn-char',     { yPercent: 110 },       { yPercent: 0, duration: 1.1, stagger: 0.045, ease: 'power4.out' }, '-=0.55')
      .fromTo('.jrn-subtitle', { opacity: 0, y: 16 },   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');

      /* ── scrub progress bar ── */
      gsap.fromTo('.jrn-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 68%',
            end: 'bottom 40%',
            scrub: 0.6,
          }
        }
      );

      /* ── staggered card entrance ── */
      const cards = containerRef.current.querySelectorAll('.jrn-card-wrapper');
      cards.forEach((card, i) => {
        const isLeft = card.classList.contains('left');
        const node   = card.querySelector('.jrn-node-fill');
        const year   = card.querySelector('.jrn-year');
        const inner  = card.querySelector('.jrn-card-inner');
        const tag    = card.querySelector('.jrn-tag');
        const barFill = card.querySelector('.jrn-bar-fill');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 78%',
            toggleActions: 'play none none none',
          }
        });

        // Alternate animation direction based on left/right side
        const xOffset = isLeft ? -50 : 50;

        tl.fromTo(year,  { opacity: 0, scale: 0.8 }, { opacity: 0.15, scale: 1, duration: 0.8, ease: 'power3.out' })
          .fromTo(node,  { scale: 0 },            { scale: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.6')
          .fromTo(inner, { opacity: 0, x: xOffset, y: 30 }, { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
          .fromTo(tag,   { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.35')
          .fromTo(barFill, { width: '0%' }, { width: '100%', duration: 1.2, ease: 'power2.out' }, '-=0.4');
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ['THE', 'JOURNEY'];

  return (
    <section id="journey" ref={containerRef} style={{
      paddingTop: 'var(--section-pad-y)',
      paddingBottom: 'var(--section-pad-y)',
      paddingLeft: 'var(--section-pad-x)',
      paddingRight: 'var(--section-pad-x)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{`
        .jrn-spine {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255, 255, 255, 0.05);
        }
        .jrn-card-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          padding-bottom: 100px;
        }
        .jrn-card-wrapper.left {
          justify-content: flex-start;
        }
        .jrn-card-wrapper.right {
          justify-content: flex-end;
        }
        .jrn-card-inner {
          width: 45%;
          background: rgba(15, 15, 15, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 32px 36px;
          position: relative;
          z-index: 5;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease;
        }
        .jrn-card-inner:hover {
          transform: translateY(-5px);
          box-shadow: var(--glow-accent), 0 30px 60px rgba(0, 0, 0, 0.8);
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(20, 20, 20, 0.8);
        }
        .jrn-node {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.1);
          background: #0d0d0d;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .jrn-connector {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 5%;
          height: 2px;
          background: rgba(255, 255, 255, 0.05);
          z-index: 1;
        }
        .jrn-connector.left { right: 45%; }
        .jrn-connector.right { left: 45%; }
        
        .jrn-year {
          position: absolute;
          font-family: var(--font-display);
          font-size: clamp(6rem, 12vw, 10rem);
          font-weight: 800;
          line-height: 1;
          color: rgba(255, 255, 255, 0.15); /* More visible watermark */
          user-select: none;
          z-index: 0;
          pointer-events: none;
        }
        .jrn-year.left { right: 48%; text-align: right; }
        .jrn-year.right { left: 48%; text-align: left; }

        @media (max-width: 900px) {
          .jrn-spine {
            left: 20px;
            transform: none;
          }
          .jrn-node {
            left: 20px;
          }
          .jrn-card-wrapper {
            justify-content: flex-end;
            padding-bottom: 60px;
          }
          .jrn-card-wrapper.left {
            justify-content: flex-end;
          }
          .jrn-card-inner {
            width: calc(100% - 60px);
          }
          .jrn-connector {
            display: none;
          }
          .jrn-year.left, .jrn-year.right {
            left: 60px;
            right: auto;
            text-align: left;
            top: -30px;
            font-size: 5rem;
          }
        }
      `}</style>

      {/* ── decorative background blobs ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '10%', right: '-10%',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 170, 255, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '15%', left: '-8%',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(178, 102, 255, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── section header ── */}
      <div className="jrn-eyebrow" style={{ display: 'inline-block' }}>
        <Eyebrow index="03">Timeline</Eyebrow>
      </div>

      <h2 style={{
        margin: 'var(--space-5) 0 0',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-section)',
        fontWeight: 600,
        lineHeight: 0.92,
        letterSpacing: '-0.03em',
        color: 'var(--text-primary)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0 0.25em',
        overflow: 'hidden',
      }}>
        {titleWords.map((word, wi) => (
          <span key={wi} style={{ display: 'flex', overflow: 'hidden' }}>
            {word.split('').map((ch, ci) => (
              <span key={ci} className="jrn-char" style={{ display: 'inline-block' }}>{ch}</span>
            ))}
          </span>
        ))}
      </h2>

      <p className="jrn-subtitle" style={{
        marginTop: '20px',
        marginBottom: '100px',
        fontFamily: 'var(--font-body)',
        fontSize: '15px',
        lineHeight: 1.6,
        color: 'var(--text-secondary)',
        maxWidth: '44ch',
        opacity: 0,
      }}>
        Four years of relentless growth — from curious beginner to full-stack data scientist.
      </p>

      {/* ── timeline track ── */}
      <div ref={trackRef} style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>

        {/* vertical spine */}
        <div className="jrn-spine">
          <div className="jrn-progress" style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%)',
            boxShadow: '0 0 10px rgba(255,255,255,0.5)',
            scaleY: 0,
            transformOrigin: 'top',
          }} />
        </div>

        {/* milestones */}
        <div>
          {items.map((it, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={it.y} className={`jrn-card-wrapper ${isLeft ? 'left' : 'right'}`}>
                
                {/* YEAR — Highly visible watermark behind/beside card */}
                <div className={`jrn-year ${isLeft ? 'left' : 'right'}`} style={{ opacity: 0 }}>
                  {it.y}
                </div>

                {/* connector tick */}
                <div className={`jrn-connector ${isLeft ? 'left' : 'right'}`} />

                {/* node on spine */}
                <div className="jrn-node">
                  <div className="jrn-node-fill" style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: it.color,
                    boxShadow: `0 0 15px ${it.color}`,
                    transform: 'scale(0)',
                  }} />
                </div>

                {/* CARD */}
                <div className="jrn-card-inner" style={{ opacity: 0 }}>
                  
                  {/* flex container for card content */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'start' }}>
                    
                    {/* left content */}
                    <div>
                      {/* num + title row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          letterSpacing: '.15em',
                          color: it.color,
                          flexShrink: 0,
                          fontWeight: 600,
                        }}>/{it.num}</span>
                        <div style={{ height: '1px', width: '32px', background: 'rgba(255,255,255,0.1)' }} />
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          letterSpacing: '.12em',
                          color: 'rgba(255,255,255,0.4)',
                          textTransform: 'uppercase',
                        }}>{it.y}</span>
                      </div>

                      <h3 style={{
                        margin: '0 0 14px',
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.025em',
                        color: 'rgba(255,255,255,0.95)',
                        lineHeight: 1.3,
                      }}>{it.t}</h3>

                      <p style={{
                        margin: '0 0 24px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14.5px',
                        lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: '48ch',
                      }}>{it.d}</p>

                      {/* progress bar */}
                      <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', width: '100%', maxWidth: '200px' }}>
                        <div className="jrn-bar-fill" style={{
                          height: '100%',
                          width: '0%',
                          background: `linear-gradient(90deg, ${it.color}, transparent)`,
                          borderRadius: '3px',
                        }} />
                      </div>
                    </div>

                    {/* right side — tag + icon */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        flexShrink: 0,
                        color: it.color,
                        boxShadow: `inset 0 0 20px ${it.color}11`
                      }}>{it.icon}</div>

                      <span className="jrn-tag" style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        letterSpacing: '.10em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.8)',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '6px 12px',
                        borderRadius: '999px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        whiteSpace: 'nowrap',
                        opacity: 0,
                      }}>{it.tag}</span>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
