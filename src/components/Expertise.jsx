import { Eyebrow } from './Shared';

export default function Expertise() {
  const cats = [
    { t:'FULL STACK', items:['React','Next.js','Node.js'] },
    { t:'DATA SCIENCE', items:['Python','Pandas','NumPy','Machine Learning'] },
    { t:'BACKEND', items:['Flask','FastAPI'] },
    { t:'DATABASE', items:['PostgreSQL','Supabase','MongoDB'] },
  ];
  return (
    <div style={{ paddingTop:'var(--section-pad-y)', paddingBottom:'var(--section-pad-y)',
      paddingLeft:'var(--section-pad-x)', paddingRight:'var(--section-pad-x)' }}>
      <Eyebrow index="04">Stack</Eyebrow>
      <h2 style={{ margin:'var(--space-5) 0 var(--space-10)', fontFamily:'var(--font-display)', fontSize:'var(--fs-display)',
        fontWeight:600, lineHeight:0.92, letterSpacing:'-0.03em', color:'var(--text-primary)' }}>TECHNICAL<br/>EXPERTISE</h2>
      <div className="exp-list">
        {cats.map((c,i)=>(
          <div key={c.t} className="exp-row" style={{ display:'grid', gridTemplateColumns:'minmax(180px,0.4fr) 1fr',
            gap:'clamp(20px,4vw,60px)', alignItems:'center', padding:'var(--space-7) 0',
            borderTop:'1px solid var(--border)' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'13px', letterSpacing:'.2em',
              color:'var(--accent)' }}>{c.t}</span>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'clamp(16px,2.5vw,40px)' }}>
              {c.items.map(it=>(
                <span key={it} className="exp-item" style={{ fontFamily:'var(--font-display)',
                  fontSize:'clamp(1.6rem,3.4vw,3rem)', fontWeight:500, letterSpacing:'-0.02em',
                  color:'var(--text-primary)', transition:'color .35s, opacity .35s', cursor:'default' }}
                  onMouseEnter={e=>{e.currentTarget.style.color='var(--accent)';}}
                  onMouseLeave={e=>{e.currentTarget.style.color='var(--text-primary)';}}>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
