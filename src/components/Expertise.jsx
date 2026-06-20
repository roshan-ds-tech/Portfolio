import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Eyebrow } from './Shared';

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG icons ─── */
const ICONS = {
  React: (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="8" ry="22" stroke="currentColor" strokeWidth="5" transform="rotate(0 50 50)"/>
      <ellipse cx="50" cy="50" rx="8" ry="22" stroke="currentColor" strokeWidth="5" transform="rotate(60 50 50)"/>
      <ellipse cx="50" cy="50" rx="8" ry="22" stroke="currentColor" strokeWidth="5" transform="rotate(120 50 50)"/>
      <circle cx="50" cy="50" r="5" fill="currentColor"/>
    </svg>
  ),
  Nextjs: (
    <svg width="22" height="22" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 0C28.65 0 0 28.65 0 64s28.65 64 64 64 64-28.65 64-64S99.35 0 64 0zm27.8 89L56.9 44.8v34.4h-6.7V40.2h6.7L91.2 84.4V40.2h6.7v48.8H91.8z" fill="currentColor"/>
    </svg>
  ),
  Nodejs: (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 8L18 26V64L50 82L82 64V26L50 8Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round"/>
      <path d="M50 8V82" stroke="currentColor" strokeWidth="6" strokeDasharray="6 6"/>
      <circle cx="50" cy="45" r="8" fill="currentColor"/>
    </svg>
  ),
  Python: (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 10C27 10 27 22 27 22H37S37 18 48 18c11 0 11 4 11 4V32H25c-10 0-10 10-10 10v16s0 10 10 10h11v-8s0-8 8-8h21c8 0 8-8 8-8V25c0-15-15-15-15-15H48z" fill="currentColor"/>
      <path d="M52 90C73 90 73 78 73 78H63S63 82 52 82c-11 0-11-4-11-4V68h35c10 0 10-10 10-10V42S97 32 87 32H76v8s0 8-8 8H47c-8 0-8 8-8 8v30c0 15 15 15 15 15h8z" fill="currentColor" opacity="0.7"/>
    </svg>
  ),
  Pandas: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="14" width="4" height="8" rx="1" fill="currentColor"/>
      <rect x="8" y="8" width="4" height="14" rx="1" fill="currentColor"/>
      <rect x="14" y="11" width="4" height="11" rx="1" fill="currentColor"/>
      <rect x="20" y="3" width="4" height="19" rx="1" fill="currentColor"/>
    </svg>
  ),
  NumPy: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  ),
  ML: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="5" cy="5" r="2.5" fill="currentColor"/>
      <circle cx="19" cy="5" r="2.5" fill="currentColor"/>
      <circle cx="5" cy="19" r="2.5" fill="currentColor"/>
      <circle cx="19" cy="19" r="2.5" fill="currentColor"/>
      <line x1="5" y1="5" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
      <line x1="19" y1="5" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
      <line x1="5" y1="19" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
      <line x1="19" y1="19" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
    </svg>
  ),
  Flask: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3H15M10 3V8.5L5.5 18C4.5 20 6 21 8 21H16C18 21 19.5 20 18.5 18L14 8.5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="7.5" y1="14" x2="16.5" y2="14" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  FastAPI: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
    </svg>
  ),
  Postgres: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 5V19C3 20.66 7.03 22 12 22C16.97 22 21 20.66 21 19V5" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 12C3 13.66 7.03 15 12 15C16.97 15 21 13.66 21 12" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  Supabase: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.6 2.1L5.1 11.6C4.8 11.9 5 12.5 5.5 12.5H11.5L9.6 21.6C9.4 22.3 10.3 22.7 10.7 22.1L19.2 12.4C19.5 12.1 19.3 11.5 18.8 11.5H12.8L14.7 2.4C14.9 1.7 14 1.3 13.6 2.1Z" fill="currentColor"/>
    </svg>
  ),
  MongoDB: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 6 7 6 12C6 16.42 9.58 20 14 20C18.42 20 22 16.42 22 12C22 7 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2V20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
    </svg>
  ),
  Git: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 9V15" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 18H15" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  LayersIcon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  ),
  ChartIcon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  ServerIcon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  DbIcon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
};

/* ─── category data ─── */
const cats = [
  {
    t: 'FULL STACK',
    desc: 'Interactive UI layers, robust server runtimes, and fast client-side applications.',
    accent: '#A8C5B5',
    num: '01',
    catIcon: ICONS.LayersIcon,
    items: [
      { name: 'React',   icon: ICONS.React,  prof: 88 },
      { name: 'Next.js', icon: ICONS.Nextjs, prof: 75 },
      { name: 'Node.js', icon: ICONS.Nodejs, prof: 80 },
    ]
  },
  {
    t: 'DATA SCIENCE',
    desc: 'Numerical computing, predictive models, data analysis, and intelligent heuristics.',
    accent: '#B8A8C5',
    num: '02',
    catIcon: ICONS.ChartIcon,
    items: [
      { name: 'Python',           icon: ICONS.Python,  prof: 92 },
      { name: 'Pandas',           icon: ICONS.Pandas,  prof: 85 },
      { name: 'NumPy',            icon: ICONS.NumPy,   prof: 82 },
      { name: 'Machine Learning', icon: ICONS.ML,      prof: 72 },
    ]
  },
  {
    t: 'BACKEND',
    desc: 'RESTful endpoints, asynchronous task processing, API routing, and system speed.',
    accent: '#C5B8A8',
    num: '03',
    catIcon: ICONS.ServerIcon,
    items: [
      { name: 'Flask',   icon: ICONS.Flask,   prof: 78 },
      { name: 'FastAPI', icon: ICONS.FastAPI, prof: 74 },
    ]
  },
  {
    t: 'DATABASE',
    desc: 'Persistent storage layers, structured schemas, relational mapping, and caching.',
    accent: '#A8B8C5',
    num: '04',
    catIcon: ICONS.DbIcon,
    items: [
      { name: 'PostgreSQL', icon: ICONS.Postgres,  prof: 76 },
      { name: 'Supabase',   icon: ICONS.Supabase,  prof: 70 },
      { name: 'MongoDB',    icon: ICONS.MongoDB,   prof: 68 },
    ]
  },
];

/* ─── Skill badge with animated bar ─── */
function SkillBadge({ item, accent, visible, isLight }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        borderRadius: '12px',
        background: isLight
          ? (hov ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.03)')
          : (hov ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)'),
        border: `1px solid ${isLight ? (hov ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)') : 'var(--border)'}`,
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        cursor: 'default',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ color: isLight ? '#000000' : (hov ? 'var(--text-primary)' : 'var(--text-secondary)'), transition: 'color 0.3s', flexShrink: 0 }}>{item.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '13px',
          fontWeight: 500,
          color: isLight ? '#000000' : (hov ? 'var(--text-primary)' : 'var(--text-secondary)'),
          transition: 'color 0.3s',
          display: 'block',
          marginBottom: '5px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>{item.name}</span>
        {/* proficiency micro-bar */}
        <div style={{ height: '2px', background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: visible ? `${item.prof}%` : '0%',
            background: `linear-gradient(90deg, ${accent}, ${isLight ? 'rgba(0,0,0,0.1)' : 'transparent'})`,
            borderRadius: '2px',
            transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '0.3s',
          }} />
        </div>
      </div>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: isLight ? '#555555' : 'var(--text-tertiary)',
        flexShrink: 0,
        letterSpacing: '.05em',
      }}>{item.prof}%</span>
    </div>
  );
}

function CatCardContent({ cat, visible, isLight }) {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: isLight ? '#C9CDD6' : 'var(--bg-primary)',
      borderRadius: '24px',
      padding: '36px 36px 32px',
      border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)'}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* ambient glow blob */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '-60px',
        right: '-60px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${cat.accent}${isLight ? '1A' : '33'} 0%, transparent 70%)`,
        pointerEvents: 'none',
        opacity: isLight ? 1 : 0.5,
      }} />

      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '40px', height: '40px',
            borderRadius: '12px',
            background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: isLight ? '#000000' : 'var(--text-primary)',
            flexShrink: 0,
          }}>
            {cat.catIcon}
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '.18em',
              color: isLight ? '#666666' : 'var(--text-tertiary)',
              marginBottom: '8px',
            }}>/{cat.num}</div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '.16em',
              color: isLight ? '#000000' : 'var(--text-secondary)',
              textTransform: 'uppercase',
            }}>{cat.t}</div>
          </div>
        </div>
      </div>

      {/* desc */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '13.5px',
        lineHeight: 1.65,
        color: isLight ? '#333333' : 'var(--text-tertiary)',
        margin: '0 0 28px',
        maxWidth: '34ch',
      }}>{cat.desc}</p>

      {/* divider */}
      <div style={{ height: '1px', background: isLight ? 'rgba(0,0,0,0.1)' : 'var(--border)', marginBottom: '24px' }} />

      {/* skills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '30px' }}>
        {cat.items.map(it => (
          <SkillBadge key={it.name} item={it} accent={cat.accent} visible={visible} isLight={isLight} />
        ))}
      </div>

      {/* bottom count badge */}
      <div style={{
        marginTop: 'auto',
        alignSelf: 'flex-end',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '.10em',
        color: isLight ? '#666666' : 'var(--text-tertiary)',
      }}>{cat.items.length} TOOLS</div>
    </div>
  );
}

/* ─── Category card ─── */
function CatCard({ cat, visible }) {
  const [hov, setHov] = useState(false);
  const overlayRef = useRef(null);
  
  // 3D card effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const startClip = "circle(0px at 56px 56px)";
  const expandClip = "circle(150% at 56px 56px)";

  useLayoutEffect(() => {
    if(overlayRef.current) {
      gsap.set(overlayRef.current, { clipPath: startClip });
    }
  }, []);

  const handleMouseEnter = () => {
    setHov(true);
    gsap.to(overlayRef.current, {
      clipPath: expandClip,
      duration: 0.8,
      ease: "expo.inOut",
    });
  };

  const handleMouseLeave = () => {
    setHov(false);
    mouseX.set(0);
    mouseY.set(0);
    gsap.to(overlayRef.current, {
      clipPath: startClip,
      duration: 1,
      ease: "expo.out(1, 1)",
    });
  };

  return (
    <div style={{ perspective: 1500, height: '100%', display: 'flex', flexDirection: 'column' }} className="exp-card">
      <motion.div
        style={{
          height: '100%',
          rotateX,
          rotateY,
          position: 'relative',
          borderRadius: '24px',
          cursor: 'default',
          zIndex: hov ? 10 : 1,
          boxShadow: hov
            ? '0 30px 60px rgba(0,0,0,0.7)'
            : '0 10px 30px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.02)',
          transition: 'box-shadow 0.4s',
        }}
        whileHover={{ scale: 1.02, y: -8 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Base Layer (Dark) */}
        <CatCardContent cat={cat} visible={visible} isLight={false} />
        
        {/* Overlay Layer (Light, Revealed via GSAP clipPath) */}
        <div 
          ref={overlayRef} 
          style={{ position: 'absolute', inset: 0, zIndex: 2 }}
        >
          <CatCardContent cat={cat} visible={visible} isLight={true} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── floating marquee ─── */
const ALL_TOOLS_DETAILED = [
  { name: 'React', icon: ICONS.React, accent: '#A8C5B5' },
  { name: 'Next.js', icon: ICONS.Nextjs, accent: '#A8C5B5' },
  { name: 'Node.js', icon: ICONS.Nodejs, accent: '#A8C5B5' },
  { name: 'Python', icon: ICONS.Python, accent: '#B8A8C5' },
  { name: 'Pandas', icon: ICONS.Pandas, accent: '#B8A8C5' },
  { name: 'NumPy', icon: ICONS.NumPy, accent: '#B8A8C5' },
  { name: 'ML', icon: ICONS.ML, accent: '#B8A8C5' },
  { name: 'Flask', icon: ICONS.Flask, accent: '#C5B8A8' },
  { name: 'FastAPI', icon: ICONS.FastAPI, accent: '#C5B8A8' },
  { name: 'PostgreSQL', icon: ICONS.Postgres, accent: '#A8B8C5' },
  { name: 'Supabase', icon: ICONS.Supabase, accent: '#A8B8C5' },
  { name: 'MongoDB', icon: ICONS.MongoDB, accent: '#A8B8C5' },
];
const ALL_TOOLS_DETAILED_REV = [...ALL_TOOLS_DETAILED].reverse();

export default function Expertise() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !containerRef.current) return;

    const ctx = gsap.context(() => {

      /* header entrance */
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      })
      .fromTo('.exp-eyebrow', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo('.exp-char',    { yPercent: 110 },       { yPercent: 0, duration: 1.1, stagger: 0.04, ease: 'power4.out' }, '-=0.55')
      .fromTo('.exp-subtitle',{ opacity: 0, y: 16 },   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');

      /* cards stagger entrance */
      gsap.fromTo('.exp-card',
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            onEnter: () => setVisible(true),
          }
        }
      );

      /* marquee (just CSS animation override via gsap set) */

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ['TECHNICAL', 'EXPERTISE'];

  return (
    <section id="expertise" ref={containerRef} style={{
      paddingTop: 'var(--section-pad-y)',
      paddingBottom: 'var(--section-pad-y)',
      paddingLeft: 'var(--section-pad-x)',
      paddingRight: 'var(--section-pad-x)',
      position: 'relative',
    }}>

      {/* ── bg decorations ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '5%', right: '0',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,168,197,0.035) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── header ── */}
      <div className="exp-eyebrow" style={{ display: 'inline-block' }}>
        <Eyebrow index="04">Stack</Eyebrow>
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
              <span key={ci} className="exp-char" style={{ display: 'inline-block' }}>{ch}</span>
            ))}
          </span>
        ))}
      </h2>

      <p className="exp-subtitle" style={{
        marginTop: '20px',
        marginBottom: '64px',
        fontFamily: 'var(--font-body)',
        fontSize: '15px',
        lineHeight: 1.6,
        color: 'var(--text-secondary)',
        maxWidth: '44ch',
        opacity: 0,
      }}>
        A curated set of tools, frameworks, and platforms that power every project I build.
      </p>

      {/* ── 2×2 masonry grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
      }}>
        {cats.map(cat => (
          <CatCard key={cat.t} cat={cat} visible={visible} />
        ))}
      </div>

      {/* ── rolling marquee ── */}
      <div style={{
        marginTop: '88px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Ambient backlight glow */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          bottom: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '180px',
          background: 'radial-gradient(50% 50% at 50% 100%, rgba(201, 205, 214, 0.04) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: -1,
        }} />

        {/* Row 1: Left to Right */}
        <div style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}>
          <div className="marquee-track" style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee-left 35s linear infinite',
          }}>
            {[...ALL_TOOLS_DETAILED, ...ALL_TOOLS_DETAILED, ...ALL_TOOLS_DETAILED].map((tool, i) => (
              <div
                key={i}
                className={`marquee-item ${i % 2 === 0 ? 'style-hollow' : 'style-solid'}`}
                style={{
                  '--tool-accent': tool.accent,
                  '--tool-accent-glow': `${tool.accent}30`,
                }}
              >
                <span className="marquee-icon">{tool.icon}</span>
                <span className="marquee-text">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}>
          <div className="marquee-track" style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee-right 35s linear infinite',
          }}>
            {[...ALL_TOOLS_DETAILED_REV, ...ALL_TOOLS_DETAILED_REV, ...ALL_TOOLS_DETAILED_REV].map((tool, i) => (
              <div
                key={i}
                className={`marquee-item ${i % 2 === 1 ? 'style-hollow' : 'style-solid'}`}
                style={{
                  '--tool-accent': tool.accent,
                  '--tool-accent-glow': `${tool.accent}30`,
                }}
              >
                <span className="marquee-icon">{tool.icon}</span>
                <span className="marquee-text">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* marquee keyframes & styles */}
      <style>{`
        .marquee-track {
          display: flex;
          gap: 0;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-right: 80px;
          cursor: pointer;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .marquee-track:hover .marquee-item {
          opacity: 0.2;
        }
        .marquee-track .marquee-item:hover {
          opacity: 1;
          transform: scale(1.05);
        }
        .marquee-item .marquee-icon {
          display: flex;
          align-items: center;
          justifyContent: center;
          color: rgba(255, 255, 255, 0.25);
          transition: color 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .marquee-item:hover .marquee-icon {
          color: var(--tool-accent);
          transform: scale(1.2) rotate(6deg);
          filter: drop-shadow(0 0 12px var(--tool-accent));
        }
        .marquee-item .marquee-text {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.2vw, 2.8rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          white-space: nowrap;
          line-height: 1;
          user-select: none;
          transition: color 0.4s cubic-bezier(0.16, 1, 0.3, 1), -webkit-text-stroke 0.4s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .marquee-item.style-hollow .marquee-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.18);
        }
        .marquee-item.style-solid .marquee-text {
          color: rgba(255, 255, 255, 0.3);
          -webkit-text-stroke: 1px transparent;
        }
        .marquee-item:hover .marquee-text {
          color: #ffffff;
          -webkit-text-stroke: 1px transparent;
          text-shadow: 0 0 16px var(--tool-accent-glow);
        }
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
