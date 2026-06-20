import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { MagneticButton } from './Shared';

export default function Hero() {
  const containerRef = useRef(null);

  const navItems = [
    { k:'develop', t:'DEVELOP', d:'M9 7L4 12L9 17M15 7L20 12L15 17' },
    { k:'design',  t:'DESIGN',  d:'M12 3L20 7.5V16.5L12 21L4 16.5V7.5Z' },
    { k:'optimize',t:'OPTIMIZE',d:'M13 3L4 14H11L11 21L20 10H13Z' },
    { k:'access',  t:'ACCESSIBLE', d:'M12 8A2.5 2.5 0 1012 3a2.5 2.5 0 000 5zM6 21c0-3.3 2.7-6 6-6s6 2.7 6 6' },
  ];

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Background image animation
      tl.fromTo('.hero-bg-img', 
        { scale: 1.15, opacity: 0, filter: 'blur(12px)' }, 
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power2.out' },
        0
      );

      // 2. Atmosphere elements fade in
      tl.fromTo(['.fog-a', '.fog-b', '.godray', '#hero-particles'], 
        { opacity: 0 }, 
        { 
          opacity: (i, target) => {
            if (target.classList.contains('fog-a') || target.classList.contains('fog-b')) return 0.6;
            if (target.classList.contains('godray')) return 0.3;
            return 1;
          }, 
          duration: 2.0 
        }, 
        0.2
      );

      // 3. Name slide up reveal
      tl.fromTo('.hero-name-line', 
        { yPercent: 100 }, 
        { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.15 }, 
        0.4
      );

      // 4. Roles staggered fade in up
      tl.fromTo('.hero-role-item', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 
        0.8
      );

      // 5. Terminal typing reveal
      tl.fromTo('.hero-term-prefix', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3 }, 
        1.1
      );
      tl.fromTo('.hero-term-text', 
        { width: '0ch' }, 
        { width: '28ch', duration: 1.4, ease: 'steps(28)' }, 
        1.2
      );

      // 6. CTA buttons stagger
      tl.fromTo('.hero-cta-btn', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 
        1.4
      );

      // 7. Nav indicators stagger
      tl.fromTo('.hero-nav-item',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
        1.6
      );

      // 8. Grey floating particles
      const pc = document.getElementById('hero-particles');
      if (pc) {
        for (let i = 0; i < 28; i++) {
          const d = document.createElement('span');
          const size = Math.random() * 1.5 + 1;
          const alpha = Math.random() * 0.18 + 0.06;
          Object.assign(d.style, {
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            borderRadius: '50%',
            background: `rgba(160,160,165,${alpha})`,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            pointerEvents: 'none',
          });
          pc.appendChild(d);
          gsap.to(d, {
            y: (Math.random() - 0.5) * 140,
            x: (Math.random() - 0.5) * 100,
            opacity: Math.random() * 0.2 + 0.05,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 8,
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="hero-inner grain-overlay" style={{ position:'relative', width:'100%', height:'100%',
      display:'grid', gridTemplateColumns:'1fr 1fr', alignItems:'center', overflow:'hidden' }}>
      
      {/* FULL SCREEN BACKGROUND IMAGE */}
      <div className="hero-bg-img" style={{ position:'absolute', inset:0, zIndex:0, overflow:'hidden' }}>
        <img src="/images/main_hero.png" alt="Hero background" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', animation: 'float-ds 3s ease-in-out infinite', mixBlendMode: 'screen' }} />
        <div style={{ position:'absolute', inset:0, background:'var(--grad-vignette)', pointerEvents:'none' }} />
      </div>

      {/* atmosphere */}
      <div className="fog fog-a" />
      <div className="fog fog-b" />
      <div className="godray" />
      <div id="hero-particles" style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:2 }} />
      <div style={{ position:'absolute', inset:0, background:'var(--grad-top-light)', zIndex:1, pointerEvents:'none' }} />

      {/* left copy */}
      <div className="hero-copy" style={{ position:'relative', zIndex:3, paddingLeft:'clamp(1.5rem,6vw,8rem)', paddingRight:'2rem' }}>
        <h1 className="hero-name" style={{ margin:0, fontFamily:'var(--font-display)',
          fontSize:'var(--fs-display)', fontWeight:600, lineHeight:0.95, letterSpacing:'-0.03em',
          color:'var(--text-primary)', textShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
          <div style={{ overflow: 'hidden' }}>
            <span className="hero-name-line" style={{ display: 'inline-block' }}>Roshan</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span className="hero-name-line" style={{ display: 'inline-block' }}>DS</span>
          </div>
        </h1>
        
        <div className="hero-roles" style={{ marginTop:'1.5rem', fontFamily:'var(--font-mono)',
          fontSize:'clamp(15px,1.3vw,18px)', lineHeight:1.6, color:'var(--text-secondary)' }}>
          <div className="hero-role-item" style={{ display:'inline-block' }}>
            <span style={{ color:'var(--accent)' }}>Full Stack Developer</span>
          </div><br/>
          <div className="hero-role-item" style={{ display:'inline-block' }}>
            Python Developer
          </div><br/>
          <div className="hero-role-item" style={{ display:'inline-block' }}>
            Data Science Enthusiast
          </div>
        </div>

        <div className="hero-term" style={{ marginTop:'1.25rem', fontFamily:'var(--font-mono)',
          fontSize:'clamp(14px,1.2vw,17px)', color:'var(--link)', display: 'flex', alignItems: 'center' }}>
          <span className="hero-term-prefix" style={{ marginRight: '8px' }}>
            <span style={{ opacity:.65 }}>&gt;</span> <span className="cursor" style={{ color:'#39FF14' }}>_</span>
          </span>
          <span className="hero-term-text" style={{ display:'inline-block', overflow:'hidden', whiteSpace:'nowrap', color:'#39FF14', verticalAlign:'bottom' }}>
            building digital experiences
          </span>
        </div>

        <div className="hero-cta" style={{ display:'flex', gap:'16px', marginTop:'2rem', flexWrap:'wrap' }}>
          <div className="hero-cta-btn">
            <MagneticButton variant="primary" href="#work">View Projects</MagneticButton>
          </div>
          <div className="hero-cta-btn">
            <MagneticButton variant="secondary" href="#contact">Contact Me</MagneticButton>
          </div>
        </div>

        {/* nav indicators */}
        <div className="hero-nav" style={{ display:'flex', alignItems:'center', gap:'0', marginTop:'3.5rem' }}>
          {navItems.map((n,i)=>(
            <div key={n.k} className="hero-nav-item" style={{ display:'flex', alignItems:'center', gap:'12px',
              padding:'0 22px', borderLeft: i?'1px solid var(--border-strong)':'none' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={n.d}/></svg>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.18em',
                color:'var(--text-secondary)' }}>{n.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
