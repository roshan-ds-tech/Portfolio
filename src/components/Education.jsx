import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, Calendar, ChevronRight } from 'lucide-react';
import { Eyebrow } from './Shared';

export default function Education() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 20 }
    }
  };

  return (
    <section id="education" ref={containerRef} style={{ 
      paddingTop:'var(--section-pad-y)', paddingBottom:'calc(var(--section-pad-y) + 80px)',
      paddingLeft:'var(--section-pad-x)', paddingRight:'var(--section-pad-x)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}
      >
        <motion.div variants={itemVariants}>
          <Eyebrow index="06">Background</Eyebrow>
        </motion.div>

        <motion.h2 
          variants={itemVariants}
          style={{ 
            margin:'var(--space-5) 0 var(--space-9)', fontFamily:'var(--font-display)', fontSize:'var(--fs-section)',
            fontWeight:600, lineHeight:0.92, letterSpacing:'-0.03em', color:'var(--text-primary)' 
          }}
        >
          EDUCATION
        </motion.h2>

        <motion.div variants={itemVariants}>
          <motion.div 
            style={{ position: 'relative', marginBottom: '40px', borderRadius: '32px' }}
            whileHover={{ y: -5, boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Glow Tab */}
            <div 
              className="pointer-events-none" 
              style={{
                position: 'absolute', left: 0, right: 0, bottom: '-40px', top: '72%',
                borderRadius: '28px', background: 'rgba(230, 230, 230, 0.95)',
                boxShadow: '0 20px 40px -16px rgba(230, 230, 230, 0.5)',
                zIndex: 0
              }}
            />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: '-40px', zIndex: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                B.E Computer Science
              </div>
            </div>

            {/* Stunning Glassmorphism Card */}
            <div 
              className="edu-card-inner"
              style={{
                background: 'rgba(15, 15, 15, 0.6)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '32px',
                padding: 'clamp(30px, 5vw, 60px)',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '40px',
                alignItems: 'center',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 10
              }}
            >
            {/* Top Accent Line */}
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)'
            }} />

            <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
              {/* Floating Icon Container */}
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                style={{
                  width: '72px', height: '72px', borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-primary)',
                  flexShrink: 0,
                  boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.02), 0 10px 20px rgba(0,0,0,0.1)'
                }}
              >
                <GraduationCap size={36} strokeWidth={1.5} />
              </motion.div>

              <div>
                <h3 style={{ 
                  margin:'0 0 12px', fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight:600, letterSpacing:'-0.02em', color:'var(--text-primary)' 
                }}>Sapthagiri NPS University</h3>
                
                <p style={{ 
                  margin:'0 0 24px', fontFamily:'var(--font-body)', fontSize:'clamp(16px, 1.8vw, 18px)', 
                  color:'var(--text-secondary)' 
                }}>Bachelor of Engineering in Computer Science</p>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontFamily: 'var(--font-mono)', fontSize: '13px',
                    color: 'rgba(255,255,255,0.6)',
                    background: 'rgba(255,255,255,0.02)', padding: '8px 16px', borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <Calendar size={14} color="rgba(255,255,255,0.4)" /> Currently pursuing
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontFamily: 'var(--font-mono)', fontSize: '13px',
                    color: 'rgba(255,255,255,0.6)',
                    background: 'rgba(255,255,255,0.02)', padding: '8px 16px', borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <ChevronRight size={14} color="rgba(255,255,255,0.4)" /> 2nd Year
                  </div>
                </div>
              </div>
            </div>

            {/* CGPA Section */}
            <div className="edu-cgpa-container" style={{ 
              display:'flex', flexDirection:'column', alignItems: 'flex-end', gap:'8px',
              paddingLeft: '50px', borderLeft: '1px solid rgba(255,255,255,0.25)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={16} color="var(--text-tertiary)" />
                <span style={{ 
                  fontFamily:'var(--font-mono)', fontSize:'13px', letterSpacing:'.2em',
                  textTransform:'uppercase', color:'var(--text-tertiary)' 
                }}>CGPA</span>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
                style={{ 
                  fontFamily:'var(--font-display)', fontSize:'clamp(4rem, 7vw, 6rem)', fontWeight:700,
                  letterSpacing:'-0.03em', 
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  paddingRight: '4px' // Prevent clipping of italic/large fonts
                }}
              >
                8.745
              </motion.div>
            </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .edu-card-inner {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .edu-cgpa-container {
            align-items: flex-start !important;
            padding-left: 0 !important;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.25);
            padding-top: 30px;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
