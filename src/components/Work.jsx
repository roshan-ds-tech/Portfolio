import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Eyebrow } from './Shared';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const WORK_PROJECTS = [
  { idx:'01', n:'Air Quality System', cat:'DATA · IOT', year:'2025',
    desc:'Sensor-driven dashboards with ML-powered air quality forecasting and real-time alerting.',
    stack:['Python','Pandas','NumPy'], glowText: 'IoT & ML Forecasting',
    popupDesc:'AeroGuard AI is a comprehensive, full-stack IoT safety system designed to proactively monitor air quality and predict environmental hazards. By integrating an ESP8266 microcontroller with an MQ135 gas sensor, the system captures real-time environmental data and streams it to a centralized Python/Flask backend. Instead of relying on static thresholds, AeroGuard AI utilizes a Multi-Output Random Forest classifier for instant risk assessment and a Deep Learning LSTM neural network to analyze rolling time-series data, successfully forecasting gas leaks and smoke buildup up to 10 minutes in advance. The ecosystem features multiple client interfaces, including a responsive React dashboard, a cross-platform Flutter mobile app, and interactive Streamlit/R-Shiny analytics platforms, providing seamless, real-time safety monitoring for smart homes and industrial facilities.',
    popupStack:['Python', 'Flask', 'React', 'Flutter', 'Streamlit', 'Scikit-learn', 'TensorFlow', 'IoT'],
    link: 'https://github.com/roshan-ds-tech/air-quality-monitoring-system.git', linkType: 'github' },
  { idx:'02', n:'COVID-19 Analysis',   cat:'DATA · WEB',  year:'2026',
    desc:'Full-stack data intelligence dashboard with a Python/FastAPI backend and Next.js frontend to analyze and forecast epidemiological data using Scikit-learn.',
    stack:['Python','FastAPI','Next.js'], glowText: 'Data Intelligence Dashboard',
    popupDesc:'Developed an enterprise-grade data intelligence platform to process, visualize, and forecast global COVID-19 trends. The architecture leverages a robust Python ETL pipeline to normalize wide-format raw datasets into a time-series analytical format. A high-performance FastAPI backend serves this data from memory, dynamically generating Scikit-learn linear regression models to predict future case trajectories based on user-selected criteria. The frontend is a modern Next.js React application featuring responsive Tailwind CSS styling and highly interactive Plotly.js charts, including global choropleth maps, correlation heatmaps, and mortality scatter plots. Containerized with Docker Compose, the project demonstrates a complete end-to-end data science lifecycle—from raw data ingestion to an interactive, predictive web interface.',
    popupStack:['Python', 'FastAPI', 'Next.js', 'Scikit-learn', 'Plotly.js', 'Docker', 'Tailwind CSS'],
    link: 'https://github.com/roshan-ds-tech/covid-19-Data-analysis-and-visualization.git', linkType: 'github' },
  { idx:'03', n:'SHRESHTA',            cat:'PLATFORM',  year:'2024',
    desc:'Full-stack community platform — custom auth, real-time dashboards, collaborative data flows.',
    stack:['Next.js','Node.js','PostgreSQL'], glowText: 'Community Platform',
    popupDesc:'Shreshta is a full-stack, direct-to-consumer (D2C) e-commerce application designed to bring premium agricultural products to the digital market. Built with a decoupled architecture, it leverages React, TypeScript, and Tailwind CSS to deliver a visually stunning and highly responsive frontend, animated seamlessly with Framer Motion. The robust backend, powered by Django REST Framework, handles secure user authentication, profile management, and cryptographically verified payment processing via Razorpay. By combining modern UI/UX principles with strict backend security measures, Shreshta provides a frictionless shopping experience from product discovery to secure checkout.',
    popupStack:['React', 'TypeScript', 'Tailwind CSS', 'Django REST Framework', 'Razorpay', 'PostgreSQL'],
    link: 'https://shreshtagro.com/', linkType: 'live' },
  { idx:'04', n:'Mythic Reverse',      cat:'WEB · 3D',  year:'2024',
    desc:'An immersive story-driven experience — real-time 3D environments, cinematic scroll, and layered depth.',
    stack:['React','Three.js','GSAP'], glowText: 'Immersive 3D Experience',
    popupDesc:'MythicReverse is a full-stack, hybrid platform designed to serve as both a premium EdTech portal and a digital agency frontend. Built with React, Vite, and Tailwind CSS, the application features a breathtaking user interface powered by Framer Motion and Aceternity UI. Under the hood, a robust serverless backend (Node.js/Vercel) orchestrates complex business logic, including a highly secure Razorpay payment integration, dynamic server-side coupon validation, and automated transactional emails via Resend. The data layer is governed by Supabase, ensuring transactional integrity across complex multi-step user registrations. This project demonstrates advanced capabilities in building scalable, secure, and commercially viable web applications.',
    popupStack:['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Supabase', 'Razorpay', 'Resend'],
    link: 'https://www.mythicreverse.com/', linkType: 'live' },
  { idx:'05', n:'Pharmacy Management', cat:'WEB · SYSTEM', year:'2024',
    desc:'A full-stack Flask application streamlining pharmacy inventory, customer tracking, and atomic multi-item billing.',
    stack:['Python', 'Flask', 'SQLite'], glowText: 'Automated Pharmacy Management',
    popupDesc:'PharmaSync is a robust, server-side rendered web application designed to digitalize the daily operations of a modern pharmacy. Built with Python, Flask, and SQLAlchemy, the system provides a seamless interface for administrators to track medicine inventory, monitor expiry dates, and manage customer records. The core of the application features a transactional billing engine capable of processing multi-item invoices while automatically deducting stock and ensuring data integrity via database rollbacks. Featuring a responsive dashboard built with Bootstrap 5, PharmaSync delivers real-time business insights, including low-stock alerts and total sales revenue, demonstrating a solid understanding of relational database design, MVC architecture, and backend transaction management.',
    popupStack:['Python', 'Flask', 'SQLAlchemy', 'SQLite', 'Bootstrap 5', 'HTML/CSS'],
    link: 'https://github.com/roshan-ds-tech/Pharmacy-Management-System.git', linkType: 'github' },
  { idx:'06', n:'111 International Spa', cat:'WEB · UI/UX', year:'2024',
    desc:'A luxurious, high-performance web experience for an international spa, featuring immersive animations and seamless performance.',
    stack:['React', 'Framer Motion', 'Tailwind CSS'], glowText: 'Premium Wellness Platform',
    popupDesc:'111 International Spa is a digital sanctuary built to mirror the physical luxury of a high-end wellness center. Engineered as a Single Page Application using React and Vite, the platform prioritizes an immersive user experience, utilizing Framer Motion and Lenis for physics-based smooth scrolling and complex parallax animations. It acts as a comprehensive catalog for premium treatments, driving user engagement through an interactive glassmorphic UI and a streamlined newsletter lead-generation pipeline.',
    popupStack:['React', 'Vite', 'Framer Motion', 'Lenis', 'Tailwind CSS', 'Vercel'],
    link: 'https://111internationalspas.vercel.app/', linkType: 'live' },
  { idx:'07', n:'Zenitsu Clothing', cat:'WEB · E-COMMERCE', year:'2024',
    desc:'A highly optimized, full-stack e-commerce web application utilizing React and Express to deliver a secure, seamless shopping experience.',
    stack:['React', 'Node.js', 'SQLite'], glowText: 'Full-Stack E-Commerce Platform',
    popupDesc:'Zenitsu Clothing is a complete e-commerce solution engineered from the ground up to deliver a premium online shopping experience. Built with a React/Vite frontend and an Express.js backend, the platform features a highly responsive UI with advanced multi-faceted product filtering, a slide-out persistent cart, and smooth animations. The backend utilizes a strictly typed SQLite database via Sequelize ORM, ensuring robust data integrity for users, products, and order histories. Security is prioritized through JWT-based stateless authentication, bcrypt password hashing, and API rate limiting.',
    popupStack:['React', 'Vite', 'Node.js', 'Express.js', 'Sequelize', 'SQLite', 'Tailwind CSS'],
    link: 'https://zenitsuclothing.vercel.app/', linkType: 'live' },
];

/* ── Project screen mockups ─────────────────────────────────────────── */
function MythicScreen() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050505' }}>
      <img 
        src="/images/mythicreverse.png" 
        alt="Mythic Reverse Mockup" 
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} 
      />
    </div>
  );
}

function ShreshtaScreen() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050505' }}>
      <img 
        src="/images/shreshta.png" 
        alt="SHRESHTA Mockup" 
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} 
      />
    </div>
  );
}

function CovidScreen() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050505' }}>
      <img 
        src="/images/covid19_data_analysis.jpg" 
        alt="COVID-19 Analysis Mockup" 
        style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} 
      />
    </div>
  );
}

function AirScreen() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050505' }}>
      <img 
        src="/images/air_quality_monitoring.jpg" 
        alt="Air Quality Monitor Mockup" 
        style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} 
      />
    </div>
  );
}

function PharmacyScreen() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050505' }}>
      <img 
        src="/images/pharmacy_management.jpg" 
        alt="Pharmacy Management Mockup" 
        style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} 
      />
    </div>
  );
}

function SpaScreen() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050505' }}>
      <img 
        src="/images/111internationalspa.png" 
        alt="111 International Spa Mockup" 
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} 
      />
    </div>
  );
}

function ZenitsuScreen() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050505' }}>
      <img 
        src="/images/zenitsuclothing1.png" 
        alt="Zenitsu Clothing Mockup" 
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} 
      />
    </div>
  );
}

const SCREENS = [AirScreen, CovidScreen, ShreshtaScreen, MythicScreen, PharmacyScreen, SpaScreen, ZenitsuScreen];

/* ── Cursor-following preview popup ────────────────────────────────── */
function WorkPreview({ active }) {
  const elRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isMobile || !elRef.current) return;
    gsap.set(elRef.current, { left: window.innerWidth / 2, top: window.innerHeight / 2 });
    const xTo = gsap.quickTo(elRef.current, 'left', { duration:0.58, ease:'power3.out', unit:'px' });
    const yTo = gsap.quickTo(elRef.current, 'top',  { duration:0.58, ease:'power3.out', unit:'px' });
    const onMove = e => { xTo(e.clientX + 34); yTo(e.clientY - 140); };
    window.addEventListener('mousemove', onMove, { passive:true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  const p  = active !== null ? WORK_PROJECTS[active] : null;
  const Sc = active !== null ? SCREENS[active] : null;

  const base = {
    pointerEvents:'none', zIndex:9998, borderRadius:'16px', overflow:'hidden',
    opacity: p ? 1 : 0,
    boxShadow:'0 50px 100px rgba(0,0,0,0.78)',
    border:`1px solid var(--work-preview-border)`,
  };
  const desktop = {
    position:'fixed', left:0, top:0, width:'320px', height:'210px',
    transform: p ? 'scale(1) rotate(-1deg)' : 'scale(0.84) rotate(2deg)',
    transition:'opacity .36s var(--ease-out-expo), transform .36s var(--ease-out-expo)',
  };
  const mobile = {
    position:'fixed', left:'50%', top:'50%',
    width:'min(85vw, 360px)', height:'220px',
    transform: p ? 'translate(-50%,-50%) scale(1)' : 'translate(-50%,-50%) scale(0.88)',
    transition:'opacity .4s var(--ease-out-expo), transform .4s var(--ease-out-expo)',
  };

  return ReactDOM.createPortal(
    <>
      {isMobile && (
        <div onClick={() => window.dispatchEvent(new CustomEvent('work-preview-dismiss'))}
          style={{ position:'fixed', inset:0, zIndex:9997, pointerEvents: p ? 'auto' : 'none',
            background: p ? 'rgba(0,0,0,0.55)' : 'transparent', transition:'background .35s' }} />
      )}
      <div ref={elRef} style={{ ...base, ...(isMobile ? mobile : desktop) }}>
        {Sc && (
          <div style={{ width:'100%', height:'100%', position:'relative' }}>
            <Sc />
            <div style={{ position:'absolute', bottom:0, left:0, right:0, pointerEvents:'none',
              background:'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)',
              padding:'24px 18px 14px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                <span style={{ fontFamily:'var(--font-display)', fontSize:'16px', fontWeight:600,
                  color:'rgba(255,255,255,0.92)', letterSpacing:'-0.02em' }}>{p?.n}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'.14em',
                  color:'rgba(255,255,255,0.35)' }}>{p?.cat}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}

/* ── Project Details Popup Modal ────────────────────────────────────── */
function ProjectModal({ projectIdx, onClose, isLight }) {
  const modalOverlayRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (projectIdx === null) return;
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new Event('modal-opened'));

    const ctx = gsap.context(() => {
      gsap.fromTo(modalOverlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(modalContentRef.current, 
        { opacity: 0, scale: 0.94, y: 40 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'power4.out', delay: 0.05 }
      );
      gsap.fromTo('.modal-reveal', 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    });

    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new Event('modal-closed'));
      ctx.revert();
    };
  }, [projectIdx]);

  if (projectIdx === null) return null;
  const p = WORK_PROJECTS[projectIdx];
  const Sc = SCREENS[projectIdx];

  const handleClose = () => {
    gsap.to(modalContentRef.current, {
      opacity: 0, scale: 0.94, y: 30, duration: 0.4, ease: 'power3.in',
      onComplete: onClose
    });
    gsap.to(modalOverlayRef.current, {
      opacity: 0, duration: 0.4, ease: 'power2.in'
    });
  };

  return (
    <div
      ref={modalOverlayRef}
      data-lenis-prevent="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--modal-overlay-bg)',
        backdropFilter: 'blur(20px)',
        overflowY: 'auto',
        overscrollBehavior: 'contain'
      }}
      onClick={handleClose}
    >
      <div style={{ display: 'flex', minHeight: '100%', padding: '40px 24px' }}>
        <div 
          ref={modalContentRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto',
            cursor: 'default'
          }}
          onClick={e => e.stopPropagation()}
        >
        <div 
          className="pointer-events-none" 
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, top: '72%',
            borderRadius: '28px', background: 'rgba(230, 230, 230, 0.95)',
            zIndex: 0
          }}
        />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
            {p.glowText}
          </div>
        </div>

        <div
          className="grain-overlay"
          style={{
            position: 'relative',
            width: '100%',
            background: 'var(--modal-card-bg)',
            borderRadius: '24px',
            border: '1px solid var(--border-strong)',
            overflow: 'hidden',
            zIndex: 10
          }}
        >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--modal-close-bg)',
            border: '1px solid var(--modal-close-border)',
            color: 'var(--modal-close-color)',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.3s var(--ease-out-expo)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.95)';
            e.currentTarget.style.color = isLight ? '#FFFFFF' : '#050505';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
            e.currentTarget.style.color = isLight ? '#1E1E1E' : '#F5F5F5';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ✕
        </button>

        <div style={{ width: '100%', height: 'clamp(260px, 42vh, 440px)', borderBottom: '1px solid var(--border)', overflow: 'hidden', position: 'relative' }}>
          <Sc />
        </div>

        <div style={{ padding: 'clamp(24px, 5vw, 40px)' }}>
          <div className="modal-reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '.16em', color: 'var(--modal-meta-color)', textTransform: 'uppercase', marginBottom: '12px' }}>
            {p.year} · {p.cat}
          </div>
          <h2 className="modal-reveal" style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            {p.n}
          </h2>
          <div className="modal-reveal" style={{ width: '40px', height: '2px', background: 'var(--accent)', marginBottom: '24px' }} />
          <p className="modal-reveal" style={{ margin: '0 0 32px', fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '68ch' }}>
            {p.popupDesc || p.desc}
          </p>
          <div className="modal-reveal" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {(p.popupStack || p.stack).map(s => (
              <span key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '.08em',
                padding: '6px 14px', borderRadius: '8px', background: 'var(--modal-tag-bg)',
                border: `1px solid var(--modal-tag-border)`, color: 'var(--text-secondary)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
              >
                {s}
              </span>
            ))}
          </div>

          {p.link && (
            <div className="modal-reveal" style={{ marginTop: '32px' }}>
              <a href={p.link} target="_blank" rel="noopener noreferrer"
                 style={{
                   display: 'inline-flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   padding: '12px 24px',
                   borderRadius: '8px',
                   background: p.linkType === 'live' ? 'var(--text-primary)' : 'transparent',
                   border: `1px solid var(--text-primary)`,
                   color: p.linkType === 'live' ? 'var(--bg-primary)' : 'var(--text-primary)',
                   fontFamily: 'var(--font-mono)',
                   fontSize: '13px',
                   fontWeight: 600,
                   letterSpacing: '.05em',
                   textTransform: 'uppercase',
                   textDecoration: 'none',
                   transition: 'all 0.3s ease'
                 }}
                 onMouseEnter={e => {
                   if (p.linkType === 'live') {
                     e.currentTarget.style.opacity = '0.85';
                   } else {
                     e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)';
                   }
                 }}
                 onMouseLeave={e => {
                   if (p.linkType === 'live') {
                     e.currentTarget.style.opacity = '1';
                   } else {
                     e.currentTarget.style.background = 'transparent';
                   }
                 }}
              >
                {p.linkType === 'live' ? 'Live Demo ↗' : 'GitHub Repo ↗'}
              </a>
            </div>
          )}
        </div>
      </div>
      {/* Spacer to expand the container for the absolute banner */}
      <div style={{ height: '40px', width: '100%' }} />
      </div>
    </div>
  </div>
  );
}

/* ── Single project row ─────────────────────────────────────────────── */
function WorkRow({ p, i, active, onEnter, onLeave, onClick }) {
  const hov = active === i;
  return (
    <div className="work-row" onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onClick}
      style={{ display:'grid', gridTemplateColumns:'52px 1fr auto',
        gap:'clamp(12px,2vw,28px)',
        padding:'clamp(20px,2.8vw,34px) clamp(16px,2.4vw,32px)',
        margin:'12px 0',
        borderRadius:'16px',
        border:`1px solid ${hov ? 'var(--border-strong)' : 'var(--border)'}`,
        background: hov ? 'var(--bg-secondary)' : 'var(--bg-primary)',
        boxShadow: hov ? 'var(--glow-accent), 0 30px 60px rgba(0,0,0,0.7)' : '0 10px 30px rgba(0,0,0,0.3)',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition:'background .4s, border-color .4s, box-shadow .4s, transform .4s', cursor:'pointer' }}>

      <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'.1em', paddingTop:'6px',
        color: hov ? 'var(--text-secondary)' : 'var(--text-tertiary)', transition:'color .4s' }}>{p.idx}</span>

      <div>
        <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.6rem,3.2vw,2.8rem)',
          fontWeight:500, lineHeight:.92, letterSpacing:'-0.03em', marginBottom:'10px',
          color: hov ? 'var(--text-primary)' : 'var(--text-secondary)',
          transform: hov ? 'translateX(8px)' : 'translateX(0)',
          transition:'color .4s, transform .6s var(--ease-out-expo)' }}>{p.n}</div>
        <p style={{ margin:'0 0 14px', fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.55,
          color:'var(--text-tertiary)', maxWidth:'44ch',
          opacity: hov ? 1 : 0.55, transition:'opacity .4s' }}>{p.desc}</p>
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
          {p.stack.map(s=>(
            <span key={s} style={{ fontFamily:'var(--font-mono)', fontSize:'11px', padding:'4px 10px',
              borderRadius:'var(--radius-sm)',
              background: hov ? 'var(--work-row-stack-bg-hov)' : 'var(--work-row-stack-bg)',
              border:'1px solid var(--border)', color:'var(--text-tertiary)',
              transition:'background .4s' }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end',
        justifyContent:'space-between', paddingTop:'4px', gap:'12px' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'.14em', whiteSpace:'nowrap',
          color: hov ? 'var(--text-secondary)' : 'var(--text-tertiary)', transition:'color .4s' }}>{p.cat}</span>
        <div style={{ width:'40px', height:'40px', borderRadius:'50%', flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px',
          border:`1px solid ${hov ? 'var(--text-primary)' : 'var(--border-strong)'}`,
          background: hov ? 'var(--text-primary)' : 'transparent',
          color: hov ? 'var(--work-row-arrow-color)' : 'var(--text-secondary)',
          transform: hov ? 'rotate(-45deg)' : 'rotate(0)',
          transition:'transform .55s var(--ease-out-expo), background .4s, border-color .4s, color .3s' }}>↗</div>
      </div>
    </div>
  );
}

/* ── Main Work section ──────────────────────────────────────────────── */
export default function Work() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeIdx, setActiveIdx] = useState(0);
  const [previewIdx, setPreviewIdx] = useState(null);
  const [modalProject, setModalProject] = useState(null);
  const listRef = useRef(null);
  const containerRef = useRef(null);
  const isMobileDevice = useRef(typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      });

      tl.fromTo('.work-eyebrow', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo('.work-title-char', { yPercent: 100 }, { yPercent: 0, duration: 1.0, stagger: 0.05, ease: 'power4.out' }, '-=0.6')
        .fromTo('.work-meta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

      const rows = listRef.current.querySelectorAll('.work-row');
      tl.fromTo(rows, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', stagger: 0.12 }, 
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const dismiss = () => setPreviewIdx(null);
    window.addEventListener('work-preview-dismiss', dismiss);
    return () => window.removeEventListener('work-preview-dismiss', dismiss);
  }, []);

  const p = WORK_PROJECTS[activeIdx];

  const titleWords = ["SELECTED", "WORK"];

  return (
    <div id="work" ref={containerRef} style={{ paddingTop:'var(--section-pad-y)', paddingBottom:'var(--section-pad-y)',
      paddingLeft:'var(--section-pad-x)', paddingRight:'var(--section-pad-x)' }}>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        marginBottom:'var(--space-9)', flexWrap:'wrap', gap:'16px' }}>
        <div>
          <div className="work-eyebrow" style={{ display: 'inline-block' }}>
            <Eyebrow index="02">Portfolio</Eyebrow>
          </div>
          <h2 className="work-title" style={{ margin:'var(--space-5) 0 0', fontFamily:'var(--font-display)',
            fontSize:'var(--fs-section)', fontWeight:600, lineHeight:0.92,
            letterSpacing:'-0.03em', color:'var(--text-primary)', display: 'flex', flexWrap: 'wrap', gap: '0 0.25em', overflow: 'hidden' }}>
            {titleWords.map((word, wordIdx) => (
              <span key={wordIdx} style={{ display: 'flex', overflow: 'hidden' }}>
                {word.split("").map((char, charIdx) => (
                  <span key={charIdx} className="work-title-char" style={{ display: 'inline-block' }}>
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>
        <span className="work-meta" style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-tertiary)',
          letterSpacing:'.1em', paddingBottom:'8px' }}>— 07 PROJECTS</span>
      </div>

      <div className="work-split" style={{ display:'grid', gridTemplateColumns:'1fr minmax(360px,0.85fr)',
        gap:'clamp(32px,5vw,80px)', alignItems:'start' }}>

        {/* LEFT — project list */}
        <div ref={listRef}>
          {WORK_PROJECTS.map((proj, i) => (
            <WorkRow key={proj.n} p={proj} i={i} active={activeIdx}
              onEnter={() => { setActiveIdx(i); if (!isMobileDevice.current) setPreviewIdx(i); }}
              onLeave={() => setPreviewIdx(null)}
              onClick={() => { setPreviewIdx(null); setModalProject(i); }} />
          ))}
          <div style={{ marginTop:'var(--space-7)' }}>
            <a href="https://github.com/roshan-ds-tech"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', fontFamily:'var(--font-mono)', fontSize:'13px', fontWeight: 600, letterSpacing:'.12em',
                color:'var(--text-primary)', textDecoration:'none', textTransform:'uppercase',
                borderBottom:'1px solid var(--text-primary)', paddingBottom:'4px',
                transition:'opacity .3s' }}
              onMouseEnter={e=>{e.currentTarget.style.opacity='0.7';}}
              onMouseLeave={e=>{e.currentTarget.style.opacity='1';}}>
              All projects on GitHub ↗
            </a>
          </div>
        </div>

        {/* RIGHT — sticky live screen preview */}
        <div style={{ position:'sticky',
          height:'clamp(400px, 62vh, 600px)',
          top:'calc((100vh - clamp(400px, 62vh, 600px)) / 2)',
          borderRadius:'18px', overflow:'hidden',
          border:'1px solid var(--border)', boxShadow:'0 40px 90px rgba(0,0,0,0.6)' }}>
          {SCREENS.map((Sc, i) => (
            <div key={i} style={{ position:'absolute', inset:0,
              opacity: i === activeIdx ? 1 : 0,
              transform: i === activeIdx ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(14px)',
              transition:'opacity .6s var(--ease-out-expo), transform .6s var(--ease-out-expo)',
              pointerEvents: i === activeIdx ? 'auto' : 'none',
              zIndex: i === activeIdx ? 1 : 0 }}>
              <Sc />
            </div>
          ))}
          {/* project name label */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:2, pointerEvents:'none',
            background:'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
            padding:'28px 22px 18px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
              <span style={{ fontFamily:'var(--font-display)', fontSize:'18px', fontWeight:600,
                color:'rgba(255,255,255,0.9)', letterSpacing:'-0.02em' }}>{p.n}</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'.16em',
                color:'rgba(255,255,255,0.38)' }}>{p.cat}</span>
            </div>
          </div>
          {/* large index watermark */}
          <div style={{ position:'absolute', top:14, right:18, zIndex:2, pointerEvents:'none',
            fontFamily:'var(--font-display)', fontSize:'72px', fontWeight:700, lineHeight:1,
            color:'rgba(255,255,255,0.04)', letterSpacing:'-0.04em', userSelect:'none' }}>{p.idx}</div>
        </div>
      </div>

      <WorkPreview active={modalProject !== null ? null : previewIdx} />
      <ProjectModal projectIdx={modalProject} onClose={() => setModalProject(null)} isLight={isLight} />
    </div>
  );
}
