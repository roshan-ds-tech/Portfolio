import { Eyebrow } from './Shared';

export default function Journey() {
  const items = [
    { y:'2023', t:'Started Programming', d:'First lines of code. Foundations in Python, algorithms, and the craft of building.' },
    { y:'2024', t:'Hackathons & Projects', d:'Shipping under pressure. Competitive builds, late nights, and a 5th-place national finish.' },
    { y:'2025', t:'Full Stack Development', d:'End-to-end products — React, Node, databases, and the architecture that holds it together.' },
    { y:'2026', t:'Data Science & AI', d:'Machine learning, intelligent systems, and data-driven digital products.' },
  ];
  return (
    <div style={{ paddingTop:'var(--section-pad-y)', paddingBottom:'var(--section-pad-y)',
      paddingLeft:'var(--section-pad-x)', paddingRight:'var(--section-pad-x)' }}>
      <Eyebrow index="03">Timeline</Eyebrow>
      <h2 style={{ margin:'var(--space-5) 0 var(--space-10)', fontFamily:'var(--font-display)', fontSize:'var(--fs-display)',
        fontWeight:600, lineHeight:0.92, letterSpacing:'-0.03em', color:'var(--text-primary)' }}>THE JOURNEY</h2>
      <div className="journey-track" style={{ display:'flex', flexDirection:'column', gap:'0' }}>
        {items.map((it,i)=>(
          <div key={it.y} className="milestone" style={{ display:'grid', gridTemplateColumns:'minmax(160px,0.5fr) 1fr',
            gap:'clamp(24px,5vw,80px)', alignItems:'start', padding:'var(--space-8) 0',
            borderTop:'1px solid var(--border)' }}>
            <span className="milestone-year" style={{ fontFamily:'var(--font-display)',
              fontSize:'clamp(3rem,7vw,6.5rem)', fontWeight:600, lineHeight:0.85, letterSpacing:'-0.04em',
              color:'var(--text-primary)' }}>{it.y}</span>
            <div className="milestone-body" style={{ paddingTop:'8px' }}>
              <h3 style={{ margin:'0 0 12px', fontFamily:'var(--font-display)', fontSize:'clamp(1.4rem,2.4vw,2rem)',
                fontWeight:600, color:'var(--text-primary)', letterSpacing:'-0.02em' }}>{it.t}</h3>
              <p style={{ margin:0, maxWidth:'52ch', fontFamily:'var(--font-body)', fontSize:'17px',
                lineHeight:1.6, color:'var(--text-secondary)' }}>{it.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
