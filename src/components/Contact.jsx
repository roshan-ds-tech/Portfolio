import { Eyebrow, MagneticButton } from './Shared';

export default function Contact() {
  const links = [
    { t:'Email', h:'mailto:hello@roshands.dev' },
    { t:'LinkedIn', h:'#' },
    { t:'GitHub', h:'#' },
    { t:'Resume', h:'#' },
  ];
  return (
    <div id="contact" className="contact-sec grain-overlay" style={{ position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column', justifyContent:'center',
      paddingLeft:'var(--section-pad-x)', paddingRight:'var(--section-pad-x)',
      paddingTop:'var(--space-10)', paddingBottom:'var(--space-9)', overflow:'hidden' }}>
      <div className="fog fog-a" style={{ opacity:.5 }} />
      <div style={{ position:'absolute', inset:0, background:'var(--grad-top-light)', pointerEvents:'none' }} />
      <div style={{ position:'relative', zIndex:2 }}>
        <Eyebrow index="07">Get in touch</Eyebrow>
        <h2 className="contact-head" style={{ margin:'var(--space-6) 0 0', fontFamily:'var(--font-display)',
          fontSize:'clamp(3rem,10vw,9rem)', fontWeight:600, lineHeight:0.92, letterSpacing:'-0.04em',
          color:'var(--text-primary)' }}>LET'S BUILD<br/>SOMETHING <span style={{ color:'var(--accent)' }}>AMAZING</span></h2>
        <div style={{ display:'flex', gap:'16px', flexWrap:'wrap', marginTop:'var(--space-8)' }}>
          {links.map((l,i)=>(
            <MagneticButton key={l.t} variant={i===0?'primary':'secondary'} href={l.h}>{l.t}</MagneticButton>
          ))}
        </div>
        <p style={{ marginTop:'var(--space-10)', fontFamily:'var(--font-mono)', fontSize:'13px',
          color:'var(--text-tertiary)' }}>© 2026 Roshan DS — <span style={{ color:'var(--accent)' }}>&gt;_</span> crafted with intent</p>
      </div>
    </div>
  );
}
