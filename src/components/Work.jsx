import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Eyebrow } from './Shared';

gsap.registerPlugin(ScrollTrigger);

const WORK_PROJECTS = [
  { idx:'01', n:'Mythic Reverse',      cat:'WEB · 3D',  year:'2024',
    desc:'An immersive story-driven experience — real-time 3D environments, cinematic scroll, and layered depth.',
    stack:['React','Three.js','GSAP'] },
  { idx:'02', n:'SHRESHTA',            cat:'PLATFORM',  year:'2024',
    desc:'Full-stack community platform — custom auth, real-time dashboards, collaborative data flows.',
    stack:['Next.js','Node.js','PostgreSQL'] },
  { idx:'03', n:'CyberWarriors',       cat:'SECURITY',  year:'2025',
    desc:'Security toolkit and learning hub engineered for hackathon speed, scale, and resilience.',
    stack:['Python','FastAPI','Supabase'] },
  { idx:'04', n:'Air Quality Monitor', cat:'DATA · IOT', year:'2025',
    desc:'Sensor-driven dashboards with ML-powered air quality forecasting and real-time alerting.',
    stack:['Python','Pandas','NumPy'] },
];

/* ── Project screen mockups ─────────────────────────────────────────── */
function MythicScreen() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050505' }}>
      <img 
        src="/images/mythicreverse.png" 
        alt="Mythic Reverse Mockup" 
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} 
      />
    </div>
  );
}

function ShreshtaScreen() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050505' }}>
      <img 
        src="/images/shreshta.png" 
        alt="SHRESHTA Mockup" 
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} 
      />
    </div>
  );
}

function CyberScreen() {
  const lines = [
    '> initialising CyberWarriors v2.4.1...',
    '> scanning network perimeter...',
    '  [████████████████] 100%',
    '',
    '> SCAN COMPLETE — 3 issues found:',
    '  CRITICAL  SQL injection  · patched ✓',
    '  MEDIUM    Open port 8080 · reviewed ✓',
    '  LOW       Weak cipher   · pending',
    '',
    '> real-time monitoring active _',
  ];
  return (
    <div style={{ height:'100%', background:'#060e0c', overflow:'hidden', fontFamily:'var(--font-mono)' }}>
      <div style={{ padding:'12px 16px', background:'rgba(255,255,255,0.04)', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:'8px', alignItems:'center' }}>
        {['#ff5f57','#ffbd2e','#28c840'].map(c=><span key={c} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c, opacity:.7 }} />)}
        <span style={{ marginLeft:'10px', fontSize:'11px', color:'rgba(255,255,255,0.3)', letterSpacing:'.06em' }}>bash — CyberWarriors</span>
      </div>
      <div style={{ padding:'18px 20px', fontSize:'11.5px', lineHeight:1.75, overflow:'hidden' }}>
        {lines.map((l,i)=>(
          <div key={i} style={{ color: l.startsWith('  CRITICAL') ? 'rgba(255,100,100,0.85)' : l.startsWith('  MEDIUM') ? 'rgba(255,200,80,0.75)' : (l.includes('patched') || l.includes('reviewed')) ? 'rgba(160,220,160,0.75)' : l.startsWith('>') ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)', whiteSpace:'pre' }}>{l||' '}</div>
        ))}
      </div>
    </div>
  );
}

function AirScreen() {
  const sensors = [['PM2.5','38 μg/m³'],['PM10','62 μg/m³'],['O₃','14 ppb'],['NO₂','22 ppb']];
  return (
    <div style={{ height:'100%', background:'linear-gradient(160deg,#0e1520,#080d16)', overflow:'hidden' }}>
      <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'.15em', color:'rgba(255,255,255,0.35)' }}>BANGALORE, IN</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'15px', fontWeight:600, color:'rgba(255,255,255,0.85)', letterSpacing:'-0.01em', marginTop:'2px' }}>Air Quality Monitor</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'28px', fontWeight:700, color:'rgba(255,200,80,0.9)', letterSpacing:'-0.03em' }}>142</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(255,200,80,0.5)', letterSpacing:'.1em' }}>AQI MODERATE</div>
        </div>
      </div>
      <div style={{ padding:'14px 22px' }}>
        <div style={{ height:'6px', borderRadius:'3px', background:'rgba(255,255,255,0.06)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', left:0, top:0, height:'100%', width:'38%', background:'linear-gradient(to right,rgba(120,220,120,0.7),rgba(255,200,80,0.8))', borderRadius:'3px' }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px', fontFamily:'var(--font-mono)', fontSize:'9px', color:'rgba(255,255,255,0.25)', letterSpacing:'.06em' }}>
          {['GOOD','MODERATE','UNHEALTHY','HAZARDOUS'].map(l=><span key={l}>{l}</span>)}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', padding:'0 22px' }}>
        {sensors.map(([k,v])=>(
          <div key={k} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', padding:'12px 14px' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'.1em' }}>{k}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'18px', fontWeight:600, color:'rgba(255,255,255,0.8)', letterSpacing:'-0.02em', marginTop:'4px' }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ margin:'14px 22px 0', height:'44px', background:'rgba(255,255,255,0.02)', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.05)', overflow:'hidden' }}>
        <svg viewBox="0 0 300 44" preserveAspectRatio="none" style={{ width:'100%', height:'100%' }}>
          <polyline points="0,30 40,26 80,32 120,18 160,22 200,28 240,14 300,20" fill="none" stroke="rgba(255,200,80,0.4)" strokeWidth="1.5"/>
          <polyline points="0,30 40,26 80,32 120,18 160,22 200,28 240,14 300,20 300,44 0,44" fill="rgba(255,200,80,0.06)" stroke="none"/>
        </svg>
      </div>
    </div>
  );
}

const SCREENS = [MythicScreen, ShreshtaScreen, CyberScreen, AirScreen];

/* ── Cursor-following preview popup ────────────────────────────────── */
function WorkPreview({ active }) {
  const elRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isMobile || !elRef.current) return;
    gsap.set(elRef.current, { left: window.innerWidth / 2, top: window.innerHeight / 2 });
    const xTo = gsap.quickTo(elRef.current, 'left', { duration:0.58, ease:'power3.out', unit:'px' });
    const yTo = gsap.quickTo(elRef.current, 'top',  { duration:0.58, ease:'power3.out', unit:'px' });
    const onMove = e => { xTo(e.clientX + 34); yTo(e.clientY - 140); };
    window.addEventListener('mousemove', onMove, { passive:true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  const p  = active !== null ? WORK_PROJECTS[active] : null;
  const Sc = active !== null ? SCREENS[active] : null;

  const base = {
    pointerEvents:'none', zIndex:9998, borderRadius:'16px', overflow:'hidden',
    opacity: p ? 1 : 0,
    boxShadow:'0 50px 100px rgba(0,0,0,0.78)',
    border:'1px solid rgba(255,255,255,0.09)',
  };
  const desktop = {
    position:'fixed', left:0, top:0, width:'320px', height:'210px',
    transform: p ? 'scale(1) rotate(-1deg)' : 'scale(0.84) rotate(2deg)',
    transition:'opacity .36s var(--ease-out-expo), transform .36s var(--ease-out-expo)',
  };
  const mobile = {
    position:'fixed', left:'50%', top:'50%',
    width:'min(85vw, 360px)', height:'220px',
    transform: p ? 'translate(-50%,-50%) scale(1)' : 'translate(-50%,-50%) scale(0.88)',
    transition:'opacity .4s var(--ease-out-expo), transform .4s var(--ease-out-expo)',
  };

  return ReactDOM.createPortal(
    <>
      {isMobile && (
        <div onClick={() => window.dispatchEvent(new CustomEvent('work-preview-dismiss'))}
          style={{ position:'fixed', inset:0, zIndex:9997, pointerEvents: p ? 'auto' : 'none',
            background: p ? 'rgba(0,0,0,0.55)' : 'transparent', transition:'background .35s' }} />
      )}
      <div ref={elRef} style={{ ...base, ...(isMobile ? mobile : desktop) }}>
        {Sc && (
          <div style={{ width:'100%', height:'100%', position:'relative' }}>
            <Sc />
            <div style={{ position:'absolute', bottom:0, left:0, right:0, pointerEvents:'none',
              background:'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)',
              padding:'24px 18px 14px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                <span style={{ fontFamily:'var(--font-display)', fontSize:'16px', fontWeight:600,
                  color:'rgba(255,255,255,0.92)', letterSpacing:'-0.02em' }}>{p?.n}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'.14em',
                  color:'rgba(255,255,255,0.35)' }}>{p?.cat}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}

/* ── Project Details Popup Modal ────────────────────────────────────── */
function ProjectModal({ projectIdx, onClose }) {
  const modalOverlayRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (projectIdx === null) return;
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      gsap.fromTo(modalOverlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(modalContentRef.current, 
        { opacity: 0, scale: 0.94, y: 40 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'power4.out', delay: 0.05 }
      );
      gsap.fromTo('.modal-reveal', 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    });

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [projectIdx]);

  if (projectIdx === null) return null;
  const p = WORK_PROJECTS[projectIdx];
  const Sc = SCREENS[projectIdx];

  const handleClose = () => {
    gsap.to(modalContentRef.current, {
      opacity: 0, scale: 0.94, y: 30, duration: 0.4, ease: 'power3.in',
      onComplete: onClose
    });
    gsap.to(modalOverlayRef.current, {
      opacity: 0, duration: 0.4, ease: 'power2.in'
    });
  };

  return (
    <div 
      ref={modalOverlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 5, 5, 0.85)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto'
      }}
      onClick={handleClose}
    >
      <div 
        ref={modalContentRef}
        className="grain-overlay"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          background: '#0a0a0a',
          borderRadius: '24px',
          border: '1px solid var(--border-strong)',
          boxShadow: '0 50px 100px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05)',
          overflow: 'hidden',
          cursor: 'default'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#F5F5F5',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.3s var(--ease-out-expo)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.style.color = '#050505';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.color = '#F5F5F5';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ✕
        </button>

        <div style={{ width: '100%', height: 'clamp(260px, 42vh, 440px)', borderBottom: '1px solid var(--border)', overflow: 'hidden', position: 'relative' }}>
          <Sc />
        </div>

        <div style={{ padding: 'clamp(24px, 5vw, 40px)' }}>
          <div className="modal-reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '.16em', color: 'rgba(255, 255, 255, 0.35)', textTransform: 'uppercase', marginBottom: '12px' }}>
            {p.year} · {p.cat}
          </div>
          <h2 className="modal-reveal" style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            {p.n}
          </h2>
          <div className="modal-reveal" style={{ width: '40px', height: '2px', background: 'var(--accent)', marginBottom: '24px' }} />
          <p className="modal-reveal" style={{ margin: '0 0 32px', fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '68ch' }}>
            {p.desc}
          </p>
          <div className="modal-reveal" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {p.stack.map(s => (
              <span key={s} style={{ 
                fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '.08em',
                padding: '6px 14px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.04)', 
                border: '1px solid rgba(255, 255, 255, 0.08)', color: 'var(--text-secondary)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Single project row ─────────────────────────────────────────────── */
function WorkRow({ p, i, active, onEnter, onLeave, onClick }) {
  const hov = active === i;
  return (
    <div className="work-row" onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onClick}
      style={{ display:'grid', gridTemplateColumns:'52px 1fr auto',
        gap:'clamp(12px,2vw,28px)',
        padding:'clamp(20px,2.8vw,34px) clamp(16px,2.4vw,32px)',
        margin:'12px 0',
        borderRadius:'16px',
        border:`1px solid ${hov ? 'var(--border-strong)' : 'var(--border)'}`,
        background: hov ? 'var(--bg-secondary)' : 'var(--bg-primary)',
        boxShadow: hov ? 'var(--glow-accent), 0 30px 60px rgba(0,0,0,0.7)' : '0 10px 30px rgba(0,0,0,0.3)',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition:'background .4s, border-color .4s, box-shadow .4s, transform .4s', cursor:'pointer' }}>

      <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'.1em', paddingTop:'6px',
        color: hov ? 'var(--text-secondary)' : 'var(--text-tertiary)', transition:'color .4s' }}>{p.idx}</span>

      <div>
        <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.6rem,3.2vw,2.8rem)',
          fontWeight:500, lineHeight:.92, letterSpacing:'-0.03em', marginBottom:'10px',
          color: hov ? 'var(--text-primary)' : 'var(--text-secondary)',
          transform: hov ? 'translateX(8px)' : 'translateX(0)',
          transition:'color .4s, transform .6s var(--ease-out-expo)' }}>{p.n}</div>
        <p style={{ margin:'0 0 14px', fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.55,
          color:'var(--text-tertiary)', maxWidth:'44ch',
          opacity: hov ? 1 : 0.55, transition:'opacity .4s' }}>{p.desc}</p>
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
          {p.stack.map(s=>(
            <span key={s} style={{ fontFamily:'var(--font-mono)', fontSize:'11px', padding:'4px 10px',
              borderRadius:'var(--radius-sm)',
              background: hov ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
              border:'1px solid var(--border)', color:'var(--text-tertiary)',
              transition:'background .4s' }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end',
        justifyContent:'space-between', paddingTop:'4px', gap:'12px' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'.14em', whiteSpace:'nowrap',
          color: hov ? 'var(--text-secondary)' : 'var(--text-tertiary)', transition:'color .4s' }}>{p.cat}</span>
        <div style={{ width:'40px', height:'40px', borderRadius:'50%', flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px',
          border:`1px solid ${hov ? 'var(--text-primary)' : 'var(--border-strong)'}`,
          background: hov ? 'var(--text-primary)' : 'transparent',
          color: hov ? '#050505' : 'var(--text-secondary)',
          transform: hov ? 'rotate(-45deg)' : 'rotate(0)',
          transition:'transform .55s var(--ease-out-expo), background .4s, border-color .4s, color .3s' }}>↗</div>
      </div>
    </div>
  );
}

/* ── Main Work section ──────────────────────────────────────────────── */
export default function Work() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [previewIdx, setPreviewIdx] = useState(null);
  const [modalProject, setModalProject] = useState(null);
  const listRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      });

      tl.fromTo('.work-eyebrow', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo('.work-title-char', { yPercent: 100 }, { yPercent: 0, duration: 1.0, stagger: 0.05, ease: 'power4.out' }, '-=0.6')
        .fromTo('.work-meta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

      const rows = listRef.current.querySelectorAll('.work-row');
      tl.fromTo(rows, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', stagger: 0.12 }, 
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const dismiss = () => setPreviewIdx(null);
    window.addEventListener('work-preview-dismiss', dismiss);
    return () => window.removeEventListener('work-preview-dismiss', dismiss);
  }, []);

  const p = WORK_PROJECTS[activeIdx];

  const titleWords = ["SELECTED", "WORK"];

  return (
    <div id="work" ref={containerRef} style={{ paddingTop:'var(--section-pad-y)', paddingBottom:'var(--section-pad-y)',
      paddingLeft:'var(--section-pad-x)', paddingRight:'var(--section-pad-x)' }}>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        marginBottom:'var(--space-9)', flexWrap:'wrap', gap:'16px' }}>
        <div>
          <div className="work-eyebrow" style={{ display: 'inline-block' }}>
            <Eyebrow index="02">Portfolio</Eyebrow>
          </div>
          <h2 className="work-title" style={{ margin:'var(--space-5) 0 0', fontFamily:'var(--font-display)',
            fontSize:'var(--fs-section)', fontWeight:600, lineHeight:0.92,
            letterSpacing:'-0.03em', color:'var(--text-primary)', display: 'flex', flexWrap: 'wrap', gap: '0 0.25em', overflow: 'hidden' }}>
            {titleWords.map((word, wordIdx) => (
              <span key={wordIdx} style={{ display: 'flex', overflow: 'hidden' }}>
                {word.split("").map((char, charIdx) => (
                  <span key={charIdx} className="work-title-char" style={{ display: 'inline-block' }}>
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>
        <span className="work-meta" style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-tertiary)',
          letterSpacing:'.1em', paddingBottom:'8px' }}>— 04 PROJECTS</span>
      </div>

      <div className="work-split" style={{ display:'grid', gridTemplateColumns:'1fr minmax(360px,0.85fr)',
        gap:'clamp(32px,5vw,80px)', alignItems:'start' }}>

        {/* LEFT — project list */}
        <div ref={listRef}>
          {WORK_PROJECTS.map((proj, i) => (
            <WorkRow key={proj.n} p={proj} i={i} active={activeIdx}
              onEnter={() => { setActiveIdx(i); setPreviewIdx(i); }}
              onLeave={() => setPreviewIdx(null)}
              onClick={() => setModalProject(i)} />
          ))}
          <div style={{ marginTop:'var(--space-7)' }}>
            <a href="#"
              style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'.12em',
                color:'var(--text-secondary)', textDecoration:'none', textTransform:'uppercase',
                borderBottom:'1px solid var(--border)', paddingBottom:'4px',
                transition:'color .3s, border-color .3s' }}
              onMouseEnter={e=>{e.currentTarget.style.color='var(--text-primary)';e.currentTarget.style.borderColor='rgba(255,255,255,0.4)';}}
              onMouseLeave={e=>{e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.borderColor='var(--border)';}}>
              All projects on GitHub ↗
            </a>
          </div>
        </div>

        {/* RIGHT — sticky live screen preview */}
        <div style={{ position:'sticky',
          height:'clamp(400px, 62vh, 600px)',
          top:'calc((100vh - clamp(400px, 62vh, 600px)) / 2)',
          borderRadius:'18px', overflow:'hidden',
          border:'1px solid var(--border)', boxShadow:'0 40px 90px rgba(0,0,0,0.6)' }}>
          {SCREENS.map((Sc, i) => (
            <div key={i} style={{ position:'absolute', inset:0,
              opacity: i === activeIdx ? 1 : 0,
              transform: i === activeIdx ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(14px)',
              transition:'opacity .6s var(--ease-out-expo), transform .6s var(--ease-out-expo)',
              pointerEvents: i === activeIdx ? 'auto' : 'none',
              zIndex: i === activeIdx ? 1 : 0 }}>
              <Sc />
            </div>
          ))}
          {/* project name label */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:2, pointerEvents:'none',
            background:'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
            padding:'28px 22px 18px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
              <span style={{ fontFamily:'var(--font-display)', fontSize:'18px', fontWeight:600,
                color:'rgba(255,255,255,0.9)', letterSpacing:'-0.02em' }}>{p.n}</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'.16em',
                color:'rgba(255,255,255,0.38)' }}>{p.cat}</span>
            </div>
          </div>
          {/* large index watermark */}
          <div style={{ position:'absolute', top:14, right:18, zIndex:2, pointerEvents:'none',
            fontFamily:'var(--font-display)', fontSize:'72px', fontWeight:700, lineHeight:1,
            color:'rgba(255,255,255,0.04)', letterSpacing:'-0.04em', userSelect:'none' }}>{p.idx}</div>
        </div>
      </div>

      <WorkPreview active={previewIdx} />
      <ProjectModal projectIdx={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
}
