import { Eyebrow } from './Shared';

export default function Education() {
  return (
    <div style={{ paddingTop:'var(--section-pad-y)', paddingBottom:'var(--section-pad-y)',
      paddingLeft:'var(--section-pad-x)', paddingRight:'var(--section-pad-x)' }}>
      <Eyebrow index="06">Background</Eyebrow>
      <h2 style={{ margin:'var(--space-5) 0 var(--space-9)', fontFamily:'var(--font-display)', fontSize:'var(--fs-display)',
        fontWeight:600, lineHeight:0.92, letterSpacing:'-0.03em', color:'var(--text-primary)' }}>EDUCATION</h2>
      <div style={{ borderTop:'1px solid var(--border)', paddingTop:'var(--space-7)',
        display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'clamp(30px,6vw,90px)', alignItems:'start' }}>
        <div>
          <h3 style={{ margin:'0 0 12px', fontFamily:'var(--font-display)', fontSize:'clamp(1.6rem,3vw,2.6rem)',
            fontWeight:600, letterSpacing:'-0.02em', color:'var(--text-primary)' }}>Sapthagiri NPS University</h3>
          <p style={{ margin:0, fontFamily:'var(--font-body)', fontSize:'18px', color:'var(--text-secondary)' }}>
            Bachelor of Science in Data Science</p>
          <p style={{ margin:'8px 0 0', fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text-tertiary)' }}>
            Currently pursuing · 2nd Year</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'.18em',
            textTransform:'uppercase', color:'var(--text-tertiary)' }}>CGPA</span>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'clamp(3rem,6vw,5rem)', fontWeight:600,
            letterSpacing:'-0.03em', color:'var(--text-primary)' }}>8.745</span>
        </div>
      </div>
    </div>
  );
}
