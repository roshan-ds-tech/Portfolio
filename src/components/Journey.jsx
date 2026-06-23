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
    color: '#00FFAA',
    num: '01',
  },
  {
    y: '2024',
    t: 'Hackathons & Projects',
    d: 'Shipping under pressure. Competitive builds, late-night prototyping, and a 5th-place finish at the national level.',
    tag: '5th National Hackathon',
    icon: '⚡',
    color: '#FF4D4D',
    num: '02',
  },
  {
    y: '2025',
    t: 'Full Stack Development',
    d: 'End-to-end applications - building interactive frontend layers with React, scalable servers, databases, and structural APIs.',
    tag: 'React & Node.js',
    icon: '◈',
    color: '#00AAFF',
    num: '03',
  },
  {
    y: '2026',
    t: 'Data Science & AI',
    d: 'Diving deep into machine learning model pipelines, predictive analysis, and data-driven intelligent digital products.',
    tag: 'Machine Learning',
    icon: '◎',
    color: '#B266FF',
    num: '04',
  },
];

export default function Journey() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!containerRef.current || reduce) return undefined;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
        .fromTo('.jrn-eyebrow', { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo('.jrn-char', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.045, ease: 'power4.out' }, '-=0.55')
        .fromTo('.jrn-subtitle', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');

      gsap.fromTo(
        '.jrn-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 68%',
            end: 'bottom 40%',
            scrub: 0.55,
          },
        }
      );

      ScrollTrigger.batch('.jrn-card-wrapper', {
        start: 'top 82%',
        once: true,
        onEnter: (batch) => {
          batch.forEach((card, index) => {
            const isLeft = card.classList.contains('left');
            const year = card.querySelector('.jrn-year');
            const node = card.querySelector('.jrn-node-fill');
            const inner = card.querySelector('.jrn-card-inner');
            const tag = card.querySelector('.jrn-tag');
            const barFill = card.querySelector('.jrn-bar-fill');

            gsap
              .timeline({ delay: index * 0.08 })
              .fromTo(year, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
              .fromTo(node, { scale: 0 }, { scale: 1, duration: 0.42, ease: 'back.out(2)' }, 0.06)
              .fromTo(
                inner,
                { opacity: 0, x: isLeft ? -34 : 34, y: 24 },
                { opacity: 1, x: 0, y: 0, duration: 0.68, ease: 'power3.out' },
                0.1
              )
              .fromTo(tag, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.34, ease: 'power2.out' }, 0.22)
              .fromTo(barFill, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.out' }, 0.24);
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ['THE', 'JOURNEY'];

  return (
    <section
      id="journey"
      ref={containerRef}
      style={{
        paddingTop: 'var(--section-pad-y)',
        paddingBottom: 'var(--section-pad-y)',
        paddingLeft: 'var(--section-pad-x)',
        paddingRight: 'var(--section-pad-x)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <style>{`
        .jrn-spine {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--jrn-spine);
        }
        .jrn-card-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          padding-bottom: 100px;
          content-visibility: auto;
          contain: layout paint style;
        }
        .jrn-card-wrapper.left {
          justify-content: flex-start;
        }
        .jrn-card-wrapper.right {
          justify-content: flex-end;
        }
        .jrn-card-inner {
          width: 45%;
          background: color-mix(in srgb, var(--glass-bg) 88%, transparent);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 32px 36px;
          position: relative;
          z-index: 5;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.38);
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease;
          will-change: transform, opacity;
          transform: translateZ(0);
        }
        .jrn-card-inner:hover {
          transform: translate3d(0, -5px, 0);
          box-shadow: var(--glow-accent), 0 24px 54px rgba(0, 0, 0, 0.52);
          border-color: var(--glass-hover-border);
          background: var(--glass-hover-bg);
        }
        .jrn-node {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid var(--jrn-node-border);
          background: var(--jrn-node-bg);
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .jrn-node-fill {
          will-change: transform;
          transform: scale(0);
        }
        .jrn-connector {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 5%;
          height: 2px;
          background: var(--jrn-connector);
          z-index: 1;
        }
        .jrn-connector.left { left: 45%; right: auto; }
        .jrn-connector.right { right: 45%; left: auto; }
        .jrn-year {
          position: absolute;
          font-family: var(--font-display);
          font-size: clamp(6rem, 12vw, 10rem);
          font-weight: 800;
          line-height: 1;
          color: var(--jrn-year-color);
          -webkit-text-stroke: 1px var(--jrn-year-stroke);
          user-select: none;
          z-index: 0;
          transition: -webkit-text-stroke-color 0.3s ease, text-shadow 0.3s ease;
          will-change: transform, opacity;
        }
        .jrn-year:hover {
          -webkit-text-stroke: 1px var(--jrn-year-hover-stroke);
          text-shadow: 0 0 15px var(--jrn-year-hover-shadow);
        }
        .jrn-year.left { left: 52%; text-align: left; right: auto; }
        .jrn-year.right { right: 52%; text-align: right; left: auto; }
        .jrn-bar-fill {
          transform-origin: left center;
          will-change: transform;
        }
        @media (max-width: 900px) {
          .jrn-spine {
            left: 20px;
            transform: none;
          }
          .jrn-node {
            left: 20px;
          }
          .jrn-card-wrapper,
          .jrn-card-wrapper.left {
            justify-content: flex-end;
            padding-bottom: 60px;
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

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 170, 255, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '-8%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(178, 102, 255, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="jrn-eyebrow" style={{ display: 'inline-block' }}>
        <Eyebrow index="03">Timeline</Eyebrow>
      </div>

      <h2
        style={{
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
        }}
      >
        {titleWords.map((word, wi) => (
          <span key={wi} style={{ display: 'flex', overflow: 'hidden' }}>
            {word.split('').map((ch, ci) => (
              <span key={ci} className="jrn-char" style={{ display: 'inline-block' }}>{ch}</span>
            ))}
          </span>
        ))}
      </h2>

      <p
        className="jrn-subtitle"
        style={{
          marginTop: '20px',
          marginBottom: '100px',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          maxWidth: '44ch',
          opacity: 0,
        }}
      >
        Four years of relentless growth - from curious beginner to full-stack data scientist.
      </p>

      <div ref={trackRef} style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="jrn-spine">
          <div
            className="jrn-progress"
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--jrn-progress-grad)',
              boxShadow: '0 0 10px var(--jrn-progress-glow)',
              scaleY: 0,
              transformOrigin: 'top',
            }}
          />
        </div>

        <div>
          {items.map((it, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div key={it.y} className={`jrn-card-wrapper ${isLeft ? 'left' : 'right'}`}>
                <div className={`jrn-year ${isLeft ? 'left' : 'right'}`} style={{ opacity: 0 }}>
                  {it.y}
                </div>

                <div className={`jrn-connector ${isLeft ? 'left' : 'right'}`} />

                <div className="jrn-node">
                  <div
                    className="jrn-node-fill"
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: it.color,
                      boxShadow: `0 0 15px ${it.color}`,
                    }}
                  />
                </div>

                <div className="jrn-card-inner" style={{ opacity: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            letterSpacing: '.15em',
                            color: it.color,
                            flexShrink: 0,
                            fontWeight: 600,
                          }}
                        >
                          /{it.num}
                        </span>
                        <div style={{ height: '1px', width: '32px', background: 'var(--jrn-divider)' }} />
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            letterSpacing: '.12em',
                            color: 'var(--jrn-year-meta)',
                            textTransform: 'uppercase',
                          }}
                        >
                          {it.y}
                        </span>
                      </div>

                      <h3
                        style={{
                          margin: '0 0 14px',
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
                          fontWeight: 600,
                          letterSpacing: '-0.025em',
                          color: 'var(--jrn-title)',
                          lineHeight: 1.3,
                        }}
                      >
                        {it.t}
                      </h3>

                      <p
                        style={{
                          margin: '0 0 24px',
                          fontFamily: 'var(--font-body)',
                          fontSize: '14.5px',
                          lineHeight: 1.7,
                          color: 'var(--jrn-body)',
                          maxWidth: '48ch',
                        }}
                      >
                        {it.d}
                      </p>

                      <div style={{ height: '3px', background: 'var(--jrn-progress-track)', borderRadius: '3px', overflow: 'hidden', width: '100%', maxWidth: '200px' }}>
                        <div
                          className="jrn-bar-fill"
                          style={{
                            height: '100%',
                            width: '100%',
                            background: `linear-gradient(90deg, ${it.color}, transparent)`,
                            borderRadius: '3px',
                            transform: 'scaleX(0)',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '16px',
                          background: 'var(--jrn-icon-bg)',
                          border: '1px solid var(--jrn-icon-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          flexShrink: 0,
                          color: it.color,
                          boxShadow: `inset 0 0 20px ${it.color}11`,
                        }}
                      >
                        {it.icon}
                      </div>

                      <span
                        className="jrn-tag"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          letterSpacing: '.10em',
                          textTransform: 'uppercase',
                          color: 'var(--jrn-tag-color)',
                          background: 'var(--jrn-tag-bg)',
                          padding: '6px 12px',
                          borderRadius: '999px',
                          border: '1px solid var(--jrn-tag-border)',
                          whiteSpace: 'nowrap',
                          opacity: 0,
                        }}
                      >
                        {it.tag}
                      </span>
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
