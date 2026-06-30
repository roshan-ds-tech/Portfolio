import { useLayoutEffect, useRef, useState } from 'react';
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
import SplashScreen from './components/SplashScreen';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const heroParticlesRef = useRef(null);
  const globalParticlesRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Lock scroll while splash is showing
  useLayoutEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loaded]);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanup = [];
    const heroParticles = heroParticlesRef.current;
    const globalParticles = globalParticlesRef.current;

    const registerTween = (target, vars) => {
      const tween = gsap.to(target, vars);
      cleanup.push(() => tween.kill());
      return tween;
    };

    const ctx = gsap.context(() => {
      if (heroParticles && !reduce) {
        for (let i = 0; i < 20; i += 1) {
          const dot = document.createElement('span');
          const size = Math.random() * 2.5 + 1;

          Object.assign(dot.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: `rgba(255,255,255,${Math.random() * 0.2 + 0.04})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: 'transform, opacity',
          });

          heroParticles.appendChild(dot);
          registerTween(dot, {
            x: (Math.random() - 0.5) * 60,
            y: (Math.random() - 0.5) * 90,
            opacity: Math.random() * 0.4 + 0.15,
            duration: Math.random() * 6 + 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 4,
          });
        }
      }

      if (!reduce) {
        registerTween('.fog-a', { xPercent: 12, yPercent: -8, duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        registerTween('.fog-b', { xPercent: -14, yPercent: 6, duration: 22, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        registerTween('.godray', { opacity: 0.55, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

        if (globalParticles) {
          for (let i = 0; i < 36; i += 1) {
            const dot = document.createElement('span');
            const size = Math.random() * 1.5 + 1;
            const alpha = Math.random() * 0.18 + 0.06;

            Object.assign(dot.style, {
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: `rgba(160,160,165,${alpha})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              pointerEvents: 'none',
              willChange: 'transform, opacity',
            });

            globalParticles.appendChild(dot);
            registerTween(dot, {
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 140,
              opacity: Math.random() * 0.2 + 0.05,
              duration: Math.random() * 10 + 10,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: Math.random() * 8,
            });
          }
        }
      }

      ScrollTrigger.create({
        trigger: '.hero-sticky',
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: false,
      });

      gsap.to('.hero-inner', {
        scale: 0.94,
        opacity: 0,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: '.hero-sticky',
          start: 'top top',
          end: '+=85%',
          scrub: true,
        },
      });

      gsap.to('.hero-fade-bottom', {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-sticky',
          start: 'top top',
          end: '+=60%',
          scrub: true,
        },
      });

      if (window.innerWidth > 900) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.ac-stage',
            start: 'top 80%',
            end: 'top 32%',
            scrub: 0.7,
          },
        });

        aboutTl
          .to('.ac-left', { x: -380, rotation: -10, scale: 0.92, ease: 'none' }, 0)
          .to('.ac-right', { x: 380, rotation: 10, scale: 0.92, ease: 'none' }, 0)
          .to('.ac-center', { scale: 1, y: -10, ease: 'none' }, 0);
      } else {
        gsap.set('.ac-center', { scale: 1, y: 0 });
      }

      if (!reduce) {
        const revealTargets = Array.from(document.querySelectorAll('[data-reveal]'));
        if (revealTargets.length) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('reveal-armed', 'reveal-in');
                observer.unobserve(entry.target);
              });
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
          );

          revealTargets.forEach((element) => observer.observe(element));
          cleanup.push(() => observer.disconnect());
        }
      }

      ScrollTrigger.refresh();
    });

    return () => {
      cleanup.forEach((fn) => fn());
      if (heroParticles) heroParticles.innerHTML = '';
      if (globalParticles) globalParticles.innerHTML = '';
      ctx.revert();
    };
  }, []);

  return (
    <>
      <SplashScreen onComplete={() => setLoaded(true)} />
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease', pointerEvents: loaded ? 'auto' : 'none' }}>
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
        <div ref={globalParticlesRef} id="global-particles" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }} />
        <Navbar />
        <section id="hero" className="hero-sticky">
          <Hero particlesRef={heroParticlesRef} loaded={loaded} />
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
      </div>
    </>
  );
}
