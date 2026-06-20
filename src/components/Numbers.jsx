import { useRef, useState, useEffect } from 'react';
import { Eyebrow } from './Shared';

function Counter({ value, suffix, label }) {
  const ref = useRef(null);
  const [n,setN] = useState(0);
  useEffect(()=>{
    let started=false, countId=null;
    const watch = setInterval(()=>{
      if(started || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      if(r.top < window.innerHeight*0.85 && r.bottom > 0){
        started = true; clearInterval(watch);
        const steps=64; let i=0;
        countId = setInterval(()=>{
          i++; const t=Math.min(1,i/steps); const e=1-Math.pow(1-t,3);
          setN(Math.round(e*value));
          if(t>=1) clearInterval(countId);
        }, 1900/steps);
      }
    }, 120);
    return ()=>{ clearInterval(watch); if(countId) clearInterval(countId); };
  },[value]);
  return (
    <div ref={ref} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
      <span style={{ fontFamily:'var(--font-display)', fontSize:'clamp(3.5rem,8vw,7rem)', fontWeight:600,
        letterSpacing:'-0.04em', lineHeight:0.85, color:'var(--text-primary)' }}>
        {n}<span style={{ color:'var(--accent)' }}>{suffix}</span></span>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'13px', letterSpacing:'.05em',
        textTransform:'uppercase', color:'var(--text-tertiary)' }}>{label}</span>
    </div>
  );
}

export default function Numbers() {
  const stats = [
    { value:280, suffix:'+', label:'LeetCode Problems' },
    { value:120, suffix:'+', label:'GeeksforGeeks Problems' },
    { value:150, suffix:'+', label:'Python Problems Created' },
    { value:5, suffix:'th', label:'National Hackathon' },
  ];
  return (
    <div style={{ paddingTop:'var(--section-pad-y)', paddingBottom:'var(--section-pad-y)',
      paddingLeft:'var(--section-pad-x)', paddingRight:'var(--section-pad-x)', position: 'relative' }}>
      
      {/* ── bg decorations to match Stack section brightness ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '10%', left: '-10%',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,168,197,0.035) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '10%', right: '-5%',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,168,197,0.035) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Eyebrow index="05">By the numbers</Eyebrow>
        <h2 style={{ margin:'var(--space-5) 0 var(--space-10)', fontFamily:'var(--font-display)', fontSize:'var(--fs-section)',
          fontWeight:600, lineHeight:0.92, letterSpacing:'-0.03em', color:'var(--text-primary)' }}>NUMBERS</h2>
        <div className="numbers-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'clamp(24px,4vw,60px)' }}>
          {stats.map(s=><Counter key={s.label} {...s} />)}
        </div>
      </div>
    </div>
  );
}
