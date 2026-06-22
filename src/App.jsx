import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from './context/ThemeContext';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import CodingStats from './components/CodingStats';
import Journey from './components/Journey';
import Work from './components/Work';
import Expertise from './components/Expertise';
import Numbers from './components/Numbers';
import Education from './components/Education';
import Contact from './components/Contact';
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      /* particles */
      const pc = document.getElementById('hero-particles');
      if (pc && !reduce) {
        for (let i = 0; i < 26; i++) {
          const d = document.createElement('span');
          const s = Math.random() * 2.5 + 1;
          Object.assign(d.style, {
            position: 'absolute', width: s+'px', height: s+'px', borderRadius: '50%',
            background: 'rgba(255,255,255,'+(Math.random()*0.2+0.04)+')',
            left: Math.random()*100+'%', top: Math.random()*100+'%',
          });
          pc.appendChild(d);
          gsap.to(d, { y:(Math.random()-.5)*90, x:(Math.random()-.5)*60,
            opacity:Math.random()*0.4+0.15, duration:Math.random()*6+5,
            repeat:-1, yoyo:true, ease:'sine.inOut', delay:Math.random()*4 });
        }
      }
      if (!reduce) {
        gsap.to('.fog-a', { xPercent:12, yPercent:-8, duration:18, repeat:-1, yoyo:true, ease:'sine.inOut' });
        gsap.to('.fog-b', { xPercent:-14, yPercent:6, duration:22, repeat:-1, yoyo:true, ease:'sine.inOut' });
        gsap.to('.godray', { opacity:0.55, duration:6, repeat:-1, yoyo:true, ease:'sine.inOut' });

        /* global grey floating particles — fixed overlay spans the full page */
        const gpc = document.getElementById('global-particles');
        if (gpc) {
          for (let i = 0; i < 60; i++) {
            const d = document.createElement('span');
            const size = Math.random() * 1.5 + 1;
            const alpha = Math.random() * 0.18 + 0.06;
            Object.assign(d.style, {
              position:'absolute', width:size+'px', height:size+'px',
              borderRadius:'50%', background:`rgba(160,160,165,${alpha})`,
              left:Math.random()*100+'%', top:Math.random()*100+'%',
              pointerEvents:'none',
            });
            gpc.appendChild(d);
            gsap.to(d, {
              y:(Math.random()-.5)*140, x:(Math.random()-.5)*100,
              opacity:Math.random()*0.2+0.05,
              duration:Math.random()*10+10,
              repeat:-1, yoyo:true, ease:'sine.inOut', delay:Math.random()*8,
            });
          }
        }
      }

      /* pinned hero reveal */
      ScrollTrigger.create({
        trigger:'.hero-sticky', start:'top top', end:'+=100%', pin:true, pinSpacing:false,
      });
      gsap.to('.hero-inner', {
        scale:0.92, opacity:0, filter:'blur(8px)', ease:'none',
        scrollTrigger:{ trigger:'.hero-sticky', start:'top top', end:'+=85%', scrub:true },
      });
      /* Fade in the bottom shadow gradient only when scrolling starts */
      gsap.to('.hero-fade-bottom', {
        opacity:1, ease:'none',
        scrollTrigger:{ trigger:'.hero-sticky', start:'top top', end:'+=60%', scrub:true },
      });
      gsap.to('.hero-mono img', {
        yPercent:14, ease:'none',
        scrollTrigger:{ trigger:'.hero-sticky', start:'top top', end:'+=100%', scrub:true },
      });

      /* about card reveal — side cards emerge from behind center */
      const aboutTl = gsap.timeline({
        scrollTrigger:{ trigger:'.ac-stage', start:'top 80%', end:'top 32%', scrub:0.7 },
      });
      aboutTl
        .to('.ac-left',  { x:-380, rotation:-10, scale:0.92, ease:'none' }, 0)
        .to('.ac-right', { x:380,  rotation:10,  scale:0.92, ease:'none' }, 0)
        .to('.ac-center',{ scale:1, y:-10, ease:'none' }, 0);

      /* reveals */
      if (!reduce) {
        ['.work-grid'].forEach((sel) => {
          const grid = document.querySelector(sel);
          if (!grid) return;
          Array.from(grid.children).forEach((child,i) => {
            child.setAttribute('data-reveal','');
            child.style.transitionDelay = (i*0.11)+'s';
          });
        });
        const armed = gsap.utils.toArray('[data-reveal]');
        armed.forEach((el) => el.classList.add('reveal-armed'));
        const checkReveals = () => {
          const vh = window.innerHeight;
          armed.forEach((el) => {
            if (el.classList.contains('reveal-in')) return;
            const r = el.getBoundingClientRect();
            if (r.top < vh*0.9 && r.bottom > 0) el.classList.add('reveal-in');
          });
        };
        checkReveals();
        const tickReveal = () => {
          checkReveals();
          if (!document.querySelector('.reveal-armed:not(.reveal-in)')) {
            gsap.ticker.remove(tickReveal); clearInterval(safety);
          }
        };
        gsap.ticker.add(tickReveal);
        window.addEventListener('scroll', checkReveals, { passive:true });
        const safety = setInterval(checkReveals, 250);

        gsap.utils.toArray('.milestone-year').forEach((y) => {
          gsap.fromTo(y, { yPercent:18 }, {
            yPercent:-18, ease:'none',
            scrollTrigger:{ trigger:y.closest('.milestone'), start:'top bottom', end:'bottom top', scrub:true },
          });
        });
      }

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
        <img
          src={isLight ? '/images/white_fog.png' : '/images/fog.png'}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {!isLight && (
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 90% 10%, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0) 50%)' }} />
        )}
      </div>
      <div id="global-particles" style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:50, overflow:'hidden' }} />
      <Navbar />
      <section id="hero" className="hero-sticky">
        <Hero />
        {/* Scroll-driven bottom fade — opacity controlled by GSAP, starts at 0 */}
        <div className="hero-fade-bottom" />
      </section>
      <main className="content">
        <section id="about" className="sec sec-about" data-reveal><About /></section>
        <section id="coding-stats" className="sec"><CodingStats /></section>
        <section id="work" className="sec" data-reveal><Work /></section>
        <section id="journey" className="sec"><Journey /></section>
        <section id="expertise" className="sec" data-reveal><Expertise /></section>
        <section id="numbers" className="sec" data-reveal><Numbers /></section>
        <section id="education" className="sec" data-reveal><Education /></section>
        <section id="contact" className="sec" data-reveal><Contact /></section>
      </main>
    </>
  );
}
