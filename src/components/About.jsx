import { Eyebrow } from './Shared';

function ProfileCard() {
  return (
    <div className="ac-card ac-center" style={{ width: '350px', height: '670px', borderRadius:'18px', overflow:'hidden', background: 'var(--bg-card)', border: '1px solid var(--border-strong)', boxShadow:'0 50px 110px rgba(0,0,0,0.6)', position:'absolute', willChange:'transform' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'18px 22px 12px',
        fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-tertiary)', letterSpacing:'.08em' }}>
        <span>STAGE 04</span><span>NOW</span>
      </div>
      <div style={{ padding:'0 22px 14px', fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:600,
        color:'var(--text-primary)', letterSpacing:'-0.02em' }}>Roshan DS</div>
      <div className="ac-portrait" style={{ margin:'0 22px', aspectRatio: '792/1070', height: 'auto', borderRadius:'12px',
        background:'radial-gradient(120% 90% at 70% 10%, rgba(255,255,255,.06), rgba(0,0,0,0)), var(--bg-tertiary)',
        border:'1px solid var(--border)', position:'relative', overflow:'hidden', display:'flex',
        alignItems:'center', justifyContent:'center' }}>
        <img 
          src="/images/roshan.png" 
          alt="Roshan DS" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <span style={{ position:'absolute', bottom:12, left:14, fontFamily:'var(--font-mono)',
          fontSize:'11px', color:'var(--accent)', zIndex: 1 }}>● ONLINE</span>
      </div>
      <div style={{ padding:'16px 22px 4px', fontFamily:'var(--font-mono)', fontSize:'12px',
        letterSpacing:'.16em', color:'var(--text-secondary)' }}>FULL STACK DEVELOPER</div>
      <div style={{ padding:'10px 22px 22px' }}>
        <span style={{ display:'inline-block', fontFamily:'var(--font-mono)', fontSize:'10px',
          letterSpacing:'.12em', padding:'4px 8px', borderRadius:'4px', background:'var(--accent-soft)',
          color:'var(--accent)', marginRight:'8px' }}>ABILITY</span>
        <span style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--text-primary)' }}>Ship Fast</span>
        <p style={{ margin:'10px 0 0', fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.6,
          color:'var(--text-secondary)' }}>Turns ideas into scalable software, AI systems and interactive web experiences — every detail considered.</p>
      </div>
    </div>
  );
}

function SideCard({ side, quote, name, role }) {
  return (
    <div className={`ac-card ac-${side}`} style={{ width: '300px', height: '480px', borderRadius:'18px', overflow:'hidden', background: '#f4f3ef', border: '1px solid rgba(0,0,0,0.06)', boxShadow:'0 50px 110px rgba(0,0,0,0.6)', position:'absolute', willChange:'transform', color:'#1a1a1a', padding:'40px 30px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'34px', color:'#cfcdc4', lineHeight:0.5 }}>“</span>
      <p style={{ margin:'18px 0 26px', fontFamily:'var(--font-body)', fontSize:'15px', lineHeight:1.7,
        color:'#3a3a3a' }}>{quote}</p>
      <div style={{ fontFamily:'var(--font-display)', fontSize:'17px', fontWeight:600 }}>{name}</div>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'.1em', color:'#888',
        marginTop:'4px' }}>{role}</div>
    </div>
  );
}

export default function About() {
  return (
    <div style={{ paddingTop:'var(--section-pad-y)', paddingBottom:'var(--section-pad-y)' }}>
      <div style={{ paddingLeft:'var(--section-pad-x)', paddingRight:'var(--section-pad-x)' }}>
        <Eyebrow index="01">Who I Am</Eyebrow>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginTop:'var(--space-5)' }}>
          <h2 style={{ margin:0, fontFamily:'var(--font-display)', fontSize:'var(--fs-display)', fontWeight:600,
            lineHeight:0.92, letterSpacing:'-0.03em', color:'var(--text-primary)' }}>ABOUT</h2>
          <p style={{ margin:0, maxWidth:'46ch', fontFamily:'var(--font-body)', fontSize:'var(--fs-lead)',
            lineHeight:1.5, color:'var(--text-secondary)' }}>
            I'm a Data Science student and Full Stack Developer focused on building scalable software,
            interactive web experiences, AI-powered systems, and modern digital products.
          </p>
        </div>
      </div>
      <div className="ac-stage" style={{ position:'relative', height:'740px', marginTop:'var(--space-9)',
        display:'flex', alignItems:'center', justifyContent:'center' }}>
        <SideCard side="left" quote="Roshan built us a polished web experience — professional, fast to respond, and with a deep grasp of the requirements. Real value to the team." name="Mike O'Dell" role="CEO · Media Group" />
        <SideCard side="right" quote="Remarkable design sense and a keen eye for detail. He consistently ships innovative, user-friendly solutions with genuine passion." name="Sanskar R. Sinha" role="Serial Entrepreneur" />
        <ProfileCard />
      </div>
    </div>
  );
}
