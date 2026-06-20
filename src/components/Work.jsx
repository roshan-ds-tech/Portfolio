import { useState, useRef, useEffect } from 'react';
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
    <div style={{ height:'100%', position:'relative', overflow:'hidden', background:'linear-gradient(160deg,#12182e,#080c18)' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(70% 60% at 75% 20%, rgba(255,255,255,0.06), transparent)' }} />
      <div style={{ padding:'18px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'.18em', color:'rgba(255,255,255,0.7)' }}>MYTHIC</span>
        <div style={{ display:'flex', gap:'20px' }}>
          {['World','Story','Enter'].map(t=><span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'rgba(255,255,255,0.35)', letterSpacing:'.1em' }}>{t}</span>)}
        </div>
      </div>
      <div style={{ padding:'40px 24px 0', position:'relative', zIndex:1 }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.8rem,6vw,4.2rem)', fontWeight:700, lineHeight:.88, letterSpacing:'-0.04em', color:'rgba(255,255,255,0.95)' }}>REVERSE<br/>THE<br/>MYTH</div>
        <p style={{ margin:'20px 0 28px', fontFamily:'var(--font-body)', fontSize:'13px', color:'rgba(255,255,255,0.4)', lineHeight:1.6, maxWidth:'30ch' }}>A cinematic 3D experience that rewrites the rules of storytelling.</p>
        <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'10px 20px', borderRadius:'999px', border:'1px solid rgba(255,255,255,0.15)', fontFamily:'var(--font-mono)', fontSize:'12px', color:'rgba(255,255,255,0.7)', letterSpacing:'.08em' }}>Enter Experience ↗</div>
      </div>
      <div style={{ position:'absolute', right:'8%',  top:'22%',    width:'120px', height:'120px', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'50%' }} />
      <div style={{ position:'absolute', right:'18%', top:'38%',    width:'60px',  height:'60px',  border:'1px solid rgba(255,255,255,0.05)', transform:'rotate(45deg)' }} />
      <div style={{ position:'absolute', right:'5%',  bottom:'18%', width:'80px',  height:'80px',  border:'1px solid rgba(255,255,255,0.06)', borderRadius:'50%' }} />
    </div>
  );
}

function ShreshtaScreen() {
  const stats = [['2,840','Users'],['98.2%','Uptime'],['47','Services']];
  return (
    <div style={{ height:'100%', background:'linear-gradient(160deg,#1a1012,#0e0808)', display:'grid', gridTemplateRows:'auto 1fr', overflow:'hidden' }}>
      <div style={{ padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:'var(--font-display)', fontSize:'16px', fontWeight:600, color:'rgba(255,255,255,0.85)', letterSpacing:'-0.02em' }}>SHRESHTA</span>
        <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'rgba(255,255,255,0.08)' }} />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'48px 1fr', overflow:'hidden' }}>
        <div style={{ borderRight:'1px solid rgba(255,255,255,0.04)', display:'flex', flexDirection:'column', alignItems:'center', paddingTop:'20px', gap:'16px' }}>
          {[...Array(4)].map((_,i)=><div key={i} style={{ width:'20px', height:'20px', borderRadius:'5px', background: i===0 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)' }} />)}
        </div>
        <div style={{ padding:'20px', overflow:'hidden' }}>
          <div style={{ display:'flex', gap:'10px', marginBottom:'16px' }}>
            {stats.map(([v,l])=>(
              <div key={l} style={{ flex:1, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', padding:'12px 14px' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'20px', fontWeight:600, color:'rgba(255,255,255,0.9)', letterSpacing:'-0.02em' }}>{v}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'.08em', marginTop:'4px' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
            {['Activity Feed','Team Hub','Analytics','Settings'].map(t=>(
              <div key={t} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:'8px', padding:'14px', fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(255,255,255,0.35)', letterSpacing:'.08em' }}>
                {t}
                <div style={{ height:'28px', background:'rgba(255,255,255,0.03)', borderRadius:'4px', marginTop:'10px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
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

/* ── Single project row ─────────────────────────────────────────────── */
function WorkRow({ p, i, active, onEnter, onLeave }) {
  const hov = active === i;
  return (
    <div className="work-row" onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onEnter}
      style={{ display:'grid', gridTemplateColumns:'52px 1fr auto',
        gap:'clamp(12px,2vw,28px)',
        padding:'clamp(20px,2.8vw,34px) clamp(16px,2.4vw,32px)',
        margin:'12px 0',
        borderRadius:'16px',
        border:`1px solid ${hov ? 'var(--border-strong)' : 'var(--border)'}`,
        background: hov ? 'var(--bg-secondary)' : 'var(--bg-primary)',
        boxShadow: hov ? '0 30px 60px rgba(0,0,0,0.7)' : '0 10px 30px rgba(0,0,0,0.3)',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition:'background .4s, border-color .4s, box-shadow .4s, transform .4s', cursor:'default' }}>

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
  const listRef = useRef(null);

  useEffect(() => {
    const dismiss = () => setPreviewIdx(null);
    window.addEventListener('work-preview-dismiss', dismiss);
    return () => window.removeEventListener('work-preview-dismiss', dismiss);
  }, []);

  useEffect(() => {
    if (!listRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rows = listRef.current.querySelectorAll('.work-row');
    gsap.fromTo(rows, { x:-50, opacity:0 },
      { x:0, opacity:1, duration:1.0, ease:'power3.out', stagger:0.11,
        scrollTrigger:{ trigger:listRef.current, start:'top 78%', toggleActions:'play none none none' } });
  }, []);

  const p = WORK_PROJECTS[activeIdx];

  return (
    <div id="work" style={{ paddingTop:'var(--section-pad-y)', paddingBottom:'var(--section-pad-y)',
      paddingLeft:'var(--section-pad-x)', paddingRight:'var(--section-pad-x)' }}>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        marginBottom:'var(--space-9)', flexWrap:'wrap', gap:'16px' }}>
        <div>
          <Eyebrow index="02">Portfolio</Eyebrow>
          <h2 style={{ margin:'var(--space-5) 0 0', fontFamily:'var(--font-display)',
            fontSize:'var(--fs-display)', fontWeight:600, lineHeight:0.92,
            letterSpacing:'-0.03em', color:'var(--text-primary)' }}>SELECTED WORK</h2>
        </div>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-tertiary)',
          letterSpacing:'.1em', paddingBottom:'8px' }}>— 04 PROJECTS</span>
      </div>

      <div className="work-split" style={{ display:'grid', gridTemplateColumns:'1fr minmax(300px,0.72fr)',
        gap:'clamp(32px,5vw,80px)', alignItems:'start' }}>

        {/* LEFT — project list */}
        <div ref={listRef}>
          {WORK_PROJECTS.map((proj, i) => (
            <WorkRow key={proj.n} p={proj} i={i} active={activeIdx}
              onEnter={() => { setActiveIdx(i); setPreviewIdx(i); }}
              onLeave={() => setPreviewIdx(null)} />
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
        <div style={{ position:'sticky', top:'clamp(80px,10vh,120px)',
          height:'clamp(340px,55vh,520px)', borderRadius:'18px', overflow:'hidden',
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
    </div>
  );
}
