import { useRef, useState } from 'react';

export function Eyebrow({ index, children }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:'12px',
      fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.22em',
      textTransform:'uppercase', color:'var(--text-tertiary)' }}>
      {index && <span style={{ color:'var(--accent)' }}>{index}</span>}
      <span style={{ width:'34px', height:'1px', background:'var(--border-strong)' }} />
      {children}
    </div>
  );
}

export function MagneticButton({ children, variant='primary', href='#', ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * 0.3;
    const y = (e.clientY - r.top - r.height/2) * 0.4;
    ref.current.style.transform = `translate(${x}px,${y}px)`;
  };
  const reset = () => { ref.current.style.transform = 'translate(0,0)'; };
  const styles = {
    primary:{ background:'var(--btn-primary-bg)', color:'var(--btn-primary-color)', border:'1px solid var(--btn-primary-border)' },
    secondary:{ background:'transparent', color:'var(--btn-secondary-color)', border:'1px solid var(--btn-secondary-border)' },
  };
  const [hover,setHover] = useState(false);
  const hv = variant==='primary'
    ? (hover?{ background:'var(--btn-primary-hover-bg)', boxShadow:'var(--glow-accent)' }:{})
    : (hover?{ background:'var(--btn-secondary-hover-bg)', borderColor:'var(--btn-secondary-hover-border)', color:'var(--btn-secondary-hover-color)' }:{});
  return (
    <a ref={ref} href={href} onMouseMove={onMove}
       onMouseEnter={()=>setHover(true)} onMouseLeave={()=>{reset();setHover(false);}}
       style={{ display:'inline-flex', alignItems:'center', gap:'10px',
         fontFamily:'var(--font-mono)', fontWeight:500, fontSize:'14px',
         letterSpacing:'0.04em', textTransform:'uppercase', textDecoration:'none',
         padding:'15px 30px', borderRadius:'var(--radius-pill)',
         transition:'transform .5s var(--ease-out-expo), background .25s, border-color .25s, color .25s, box-shadow .5s',
         ...styles[variant], ...hv }} {...rest}>
      {children}
    </a>
  );
}
