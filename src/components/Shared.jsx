import { useRef } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';

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
  const { scrollTo } = useSmoothScroll();

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * 0.3;
    const y = (e.clientY - r.top - r.height/2) * 0.4;
    ref.current.style.transform = `translate(${x}px,${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };
  const styles = {
    primary:{ background:'var(--btn-primary-bg)', color:'var(--btn-primary-color)', border:'1px solid var(--btn-primary-border)' },
    secondary:{ background:'transparent', color:'var(--btn-secondary-color)', border:'1px solid var(--btn-secondary-border)' },
  };

  const handleClick = (event) => {
    if (!href?.startsWith('#')) return;
    event.preventDefault();

    if (href === '#') {
      scrollTo(0);
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      scrollTo(target, { offset: -24 });
    }
  };

  return (
    <a ref={ref} href={href} onMouseMove={onMove}
       onClick={handleClick}
       onMouseLeave={reset}
       style={{ display:'inline-flex', alignItems:'center', gap:'10px',
         fontFamily:'var(--font-mono)', fontWeight:500, fontSize:'14px',
         letterSpacing:'0.04em', textTransform:'uppercase', textDecoration:'none',
         padding:'15px 30px', borderRadius:'var(--radius-pill)',
         transition:'transform .5s var(--ease-out-expo), background .25s, border-color .25s, color .25s, box-shadow .5s',
         ...styles[variant] }} {...rest}>
      {children}
    </a>
  );
}
