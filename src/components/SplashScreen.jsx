import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('intro'); // intro → progress → exit
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [logs, setLogs] = useState([]);
  const intervalRef = useRef(null);
  const logIntervalRef = useRef(null);

  const sysLogs = [
    'INIT_CORE_MODULES...',
    'LOADING_USER_PREFS...',
    'ALLOCATING_MEMORY_BANKS...',
    'ESTABLISHING_WSS_UPLINK...',
    'VERIFYING_AUTH_TOKENS...',
    'SYNCING_DATA_NODES...',
    'COMPILING_ASSETS...',
    'RENDER_ENGINE_READY.',
  ];

  useEffect(() => {
    // Progress logic
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.random() * 8 + 2; // Smoother, slightly slower loading
      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef.current);
        setProgress(100);
        setTimeout(() => {
          setPhase('exit');
          setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 1000);
        }, 500);
      } else {
        setProgress(Math.min(current, 98));
      }
    }, 100);

    // Fake terminal logs
    let logIdx = 0;
    logIntervalRef.current = setInterval(() => {
      if (logIdx < sysLogs.length) {
        setLogs((prev) => [...prev, sysLogs[logIdx]].slice(-4));
        logIdx++;
      }
    }, 350);

    setTimeout(() => setPhase('progress'), 400);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(logIntervalRef.current);
    };
  }, [onComplete]);

  // Framer Motion variants
  const containerVariants = {
    exit: { opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

  const ringVariants = {
    animate: { rotate: 360, transition: { duration: 20, repeat: Infinity, ease: 'linear' } },
    animateReverse: { rotate: -360, transition: { duration: 25, repeat: Infinity, ease: 'linear' } }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          variants={containerVariants}
          exit="exit"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#030303', // Extremely dark for contrast
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            fontFamily: 'var(--font-mono, monospace)',
          }}
        >
          {/* Background Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              backgroundPosition: 'center center',
              maskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Ambient Lighting */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '60vw', height: '60vw', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200, 169, 126, 0.08) 0%, transparent 60%)',
                filter: 'blur(60px)'
              }}
            />
          </div>

          {/* HUD Elements (Corners) */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} style={{ position: 'absolute', inset: '32px', pointerEvents: 'none', zIndex: 1, color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '0.2em' }}>
            <div style={{ position: 'absolute', top: 0, left: 0 }}>SYS.BOOT_SEQ // V.1.0.4</div>
            <div style={{ position: 'absolute', top: 0, right: 0, textAlign: 'right', color: 'rgba(255,255,255,0.8)' }}>ENG: ACTIVE<br/>MEM: OK</div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px' }}>
              {logs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: '4px', opacity: 1 - (logs.length - 1 - i) * 0.2 }}>
                  &gt; {log}
                </motion.div>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0 }}>LAT: 34.0522 N / LON: 118.2437 W</div>
          </motion.div>

          {/* Central Emblem Group */}
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* High-Tech Monogram Rings */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 45 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px', perspective: '1000px' }}
            >
              {/* Outer Ring Dashed */}
              <motion.svg variants={ringVariants} animate="animate" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.8 }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4 12 4" />
              </motion.svg>
              {/* Inner Ring Partial */}
              <motion.svg variants={ringVariants} animate="animateReverse" style={{ position: 'absolute', width: '80%', height: '80%', opacity: 0.9 }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="var(--accent, #fff)" strokeWidth="1.5" strokeDasharray="60 140" strokeLinecap="round" />
                <circle cx="50" cy="50" r="48" fill="none" stroke="var(--accent, #fff)" strokeWidth="1.5" strokeDasharray="10 190" strokeLinecap="round" strokeDashoffset="-80" />
              </motion.svg>

              {/* Center Glass Pill */}
              <motion.div
                style={{
                  width: '80px', height: '80px', borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  position: 'relative', overflow: 'hidden'
                }}
              >
                {/* Shine sweep */}
                <motion.div
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  style={{ position: 'absolute', top: 0, width: '40%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', transform: 'skewX(-20deg)' }}
                />
                <span style={{ fontSize: '32px', fontWeight: '400', color: '#FFF', fontFamily: 'var(--font-display, serif)', letterSpacing: '-0.05em' }}>R</span>
              </motion.div>
            </motion.div>

            {/* Branding Details */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 500 }}>
                Roshan D S
              </div>
              <div style={{ color: '#FFF', fontSize: '18px', fontWeight: '400', letterSpacing: '0.05em', fontFamily: 'var(--font-display, serif)' }}>
                PORTFOLIO <span style={{ opacity: 0.6 }}>/ 2025</span>
              </div>
            </motion.div>

            {/* High-tech Progress Bar */}
            <motion.div initial={{ opacity: 0, scaleX: 0.8 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.8, duration: 0.8 }} style={{ width: '320px', marginTop: '64px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', fontWeight: 500 }}>
                  {progress < 100 ? 'LOADING ASSETS...' : 'SYSTEM READY'}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                  <motion.span style={{ fontSize: '24px', color: '#FFF', fontWeight: '400', fontFamily: 'var(--font-display, serif)', fontVariantNumeric: 'tabular-nums' }}>
                    {Math.round(progress)}
                  </motion.span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>%</span>
                </div>
              </div>

              {/* Progress Track */}
              <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', position: 'relative' }}>
                {/* Fill */}
                <motion.div
                  style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: 'rgba(255,255,255,1)', borderRadius: '2px', boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
                {/* Glow spark at the tip */}
                <motion.div
                  style={{ position: 'absolute', top: '-2px', height: '7px', width: '14px', background: '#FFF', borderRadius: '6px', boxShadow: '0 0 12px 3px rgba(255,255,255,0.8)', transform: 'translateX(-50%)' }}
                  animate={{ left: `${progress}%` }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </div>

            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

