import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, FileText, ArrowUpRight, ArrowUp } from 'lucide-react';
import { Eyebrow } from './Shared';
import { useSmoothScroll } from '../context/SmoothScrollContext';

const GithubIcon = ({ size = 24, strokeWidth = 2, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.5 6.5-7a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5.5 3.3 6.6 6.5 7a4.8 4.8 0 0 0-1 3.02V22" />
    <path d="M9 20.5 8 21a2 2 0 0 1-2-2v-1" />
  </svg>
);

const LinkedinIcon = ({ size = 24, strokeWidth = 2, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollTo } = useSmoothScroll();

  const links = [
    { t: 'Email', d: 'roshands00270@gmail.com', h: 'mailto:roshands00270@gmail.com', icon: Mail, color: '#B266FF' },
    { t: 'LinkedIn', d: 'Connect professionally', h: 'https://www.linkedin.com/in/roshan-ds-4226a8308', icon: LinkedinIcon, color: '#00AAFF', ext: true },
    { t: 'GitHub', d: 'View my repositories', h: 'https://github.com/roshan-ds-tech', icon: GithubIcon, color: '#FFFFFF', ext: true },
    { t: 'Resume', d: 'Download my CV', h: '/images/Roshan_Resume.pdf', icon: FileText, color: '#00FFAA', download: 'Roshan_Resume.pdf' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
  };

  const scrollToTop = () => {
    scrollTo(0);
  };

  return (
    <footer ref={containerRef} style={{
      position: 'relative',
      paddingTop: 'var(--space-12)',
      paddingBottom: 'var(--space-6)',
      paddingLeft: 'var(--section-pad-x)',
      paddingRight: 'var(--section-pad-x)',
      overflow: 'hidden',
      borderTop: '1px solid var(--contact-ft-border)'
    }}>
      {/* Background Atmosphere */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '80vw', height: '50vh',
        background: 'var(--contact-atm)',
        pointerEvents: 'none',
        zIndex: 0
      }} />



      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
      >
        <motion.div variants={itemVariants}>
          <Eyebrow index="07">Get in touch</Eyebrow>
        </motion.div>

        <motion.h2 
          variants={itemVariants}
          style={{ 
            margin: 'var(--space-6) 0 var(--space-10)', 
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            fontWeight: 500, 
            lineHeight: 1.1, 
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)' 
          }}
        >
          LET'S BUILD SOMETHING AMAZING
        </motion.h2>

        <motion.div 
          variants={itemVariants}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '24px', 
            width: '100%', 
            marginBottom: 'var(--space-12)'
          }}
        >
          {links.map((l) => (
            <motion.a
              key={l.t}
              href={l.h}
              target={l.ext ? "_blank" : undefined}
              rel={l.ext ? "noopener noreferrer" : undefined}
              download={l.download ? l.download : undefined}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="contact-card"
              style={{
                background: 'var(--contact-card-bg)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--contact-card-border)',
                borderRadius: '24px',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                transition: 'border-color 0.3s, background 0.3s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '32px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'var(--contact-icon-bg)',
                  border: '1px solid var(--contact-icon-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-primary)'
                }}>
                  <l.icon size={24} strokeWidth={1.5} />
                </div>
                <ArrowUpRight size={20} color="var(--contact-arrow)" className="arrow-icon" style={{ transition: 'color 0.3s, transform 0.3s' }} />
              </div>
              
              <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {l.t}
              </h3>
              <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)' }}>
                {l.d}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          variants={itemVariants}
          className="contact-footer-bottom"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            borderTop: '1px solid var(--contact-footer-border)',
            paddingTop: 'var(--space-6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--contact-avatar-border)' }}>
              <img src="/images/roshan.png" alt="Roshan DS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Roshan DS</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>Based in India</span>
            </div>
          </div>

          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} — <span style={{ color: 'var(--accent)' }}>&gt;_</span> crafted with intent
          </p>

          <button
            onClick={scrollToTop}
            className="back-to-top"
            style={{
              background: 'var(--back-top-bg)',
              border: '1px solid var(--back-top-border)',
              borderRadius: '999px',
              padding: '12px 24px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.3s, color 0.3s'
            }}
          >
            Back to Top <ArrowUp size={16} />
          </button>
        </motion.div>
      </motion.div>

      <style>{`
        .contact-card:hover {
          background: rgba(255,255,255,0.02) !important;
          border-color: rgba(255,255,255,0.2) !important;
          box-shadow: var(--glow-accent), 0 30px 60px rgba(0,0,0,0.6) !important;
        }
        .contact-card:hover .arrow-icon {
          color: var(--text-primary) !important;
          transform: translate(4px, -4px);
        }
        .back-to-top:hover {
          background: var(--text-primary) !important;
          color: var(--text-inverse) !important;
        }
      `}</style>
      {/* Light-theme overrides for .contact-card:hover are in index.css via [data-theme="light"] selectors */}
    </footer>
  );
}
