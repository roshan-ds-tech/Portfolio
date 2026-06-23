import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
} from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {
  Activity,
  Code2,
  ExternalLink,
  GitBranch,
  ShieldCheck,
  Terminal,
  Trophy,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const T = {
  textPrimary: 'var(--text-primary)',
  textSub: 'var(--text-secondary)',
  textMuted: 'var(--text-tertiary)',
  cardBg: 'rgba(18, 18, 18, 0.88)',
  cardAlt: 'rgba(13, 13, 13, 0.92)',
  cardBorder: 'rgba(255,255,255,0.09)',
  cardBorderStrong: 'rgba(214,218,224,0.22)',
  cardGlow: 'rgba(190, 202, 214, 0.16)',
  blueGrey: 'rgba(158, 173, 189, 0.95)',
  silver: 'rgba(224, 226, 228, 0.92)',
  gold: 'rgba(197, 176, 128, 0.9)',
  radius: '24px',
};

const topics = ['Arrays', 'Strings', 'Trees', 'Graphs', 'Dynamic Programming', 'Sliding Window'];

function Counter({ target, suffix = '+', className, style }) {
  const ref = useRef(null);
  const value = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: '-12% 0px' });
  const [display, setDisplay] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = value.on('change', (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsubscribe;
  }, [value]);

  useEffect(() => {
    if (!isInView) return undefined;

    const controls = animate(value, target, {
      type: 'spring',
      stiffness: 112,
      damping: 20,
      mass: 0.9,
      onComplete: () => setComplete(true),
    });

    return () => controls.stop();
  }, [isInView, target, value]);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={style}
      animate={complete ? { scale: [1, 1.035, 1] } : { scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {display}
      {suffix}
    </motion.span>
  );
}

function PremiumCard({ children, style = {}, delay = 0, className = '', onClick }) {
  const [hovered, setHovered] = useState(false);
  const glowOrbRef = useRef(null);
  const xToRef = useRef(null);
  const yToRef = useRef(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useLayoutEffect(() => {
    if (!glowOrbRef.current) return undefined;

    xToRef.current = gsap.quickTo(glowOrbRef.current, 'x', {
      duration: 0.38,
      ease: 'power3.out',
    });
    yToRef.current = gsap.quickTo(glowOrbRef.current, 'y', {
      duration: 0.38,
      ease: 'power3.out',
    });

    return () => {
      xToRef.current = null;
      yToRef.current = null;
    };
  }, []);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (xToRef.current) xToRef.current(x - rect.width / 2);
    if (yToRef.current) yToRef.current(y - rect.height / 2);
  };

  return (
    <motion.div
      className={`cs-card ${className}`}
      initial={{ opacity: 0, y: 34, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.003 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handlePointerMove}
      onClick={onClick}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: T.radius,
        border: isLight
          ? `1px solid ${hovered ? 'rgba(200,169,126,0.32)' : 'rgba(74, 60, 42, 0.10)'}`
          : `1px solid ${hovered ? T.cardBorderStrong : T.cardBorder}`,
        background: isLight
          ? hovered
            ? 'rgba(255, 253, 249, 0.90)'
            : 'rgba(255, 251, 245, 0.72)'
          : hovered
            ? 'rgba(19, 19, 19, 0.92)'
            : T.cardBg,
        boxShadow: hovered
          ? isLight
            ? '0 28px 60px rgba(82, 60, 30, 0.12), 0 12px 26px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.55)'
            : `0 34px 84px rgba(0,0,0,0.48), 0 0 0 1px rgba(255,255,255,0.04), 0 0 40px ${T.cardGlow}`
          : isLight
            ? '0 18px 42px rgba(70, 48, 20, 0.08), 0 6px 16px rgba(0,0,0,0.05)'
            : '0 20px 48px rgba(0,0,0,0.32)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div className="cs-card-base" />
      <div className="cs-card-noise" />
      <div className="cs-card-particles">
        {[0, 1, 2, 3].map((index) => (
          <motion.span
            key={index}
            className={`cs-card-particle particle-${index + 1}`}
            animate={{
              y: [0, -10 - index * 2, 0],
              opacity: [0.15, 0.32, 0.12],
            }}
            transition={{
              duration: 7 + index,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.9,
            }}
          />
        ))}
      </div>
      <motion.div
        className="cs-card-trace"
        animate={{ opacity: hovered ? 0.84 : 0.36, scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
      <motion.div
        className="cs-card-light"
        animate={{ opacity: hovered ? 1 : 0.46 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <div ref={glowOrbRef} className="cs-card-light-orb" />
      </motion.div>
      <div className="cs-card-content">{children(hovered)}</div>
    </motion.div>
  );
}

function MetricLabel({ children }) {
  return <p className="cs-metric-label">{children}</p>;
}

function MetricValue({ target, suffix = '+', className = '' }) {
  return (
    <div className={`cs-metric-value ${className}`}>
      <Counter target={target} suffix={suffix} />
    </div>
  );
}

function CardChrome({ icon, hovered, link = true }) {
  return (
    <div className="cs-card-chrome">
      <div className="cs-card-icon-wrap">{icon}</div>
      {link ? (
        <motion.div
          animate={{ opacity: hovered ? 0.65 : 0.18, x: hovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <ExternalLink size={13} color="var(--text-primary)" />
        </motion.div>
      ) : (
        <div className="cs-card-beacon" />
      )}
    </div>
  );
}

function LeetCodeCardInner({ hovered, difficulty, iconColor }) {
  const panelRef = useRef(null);
  const tagRefs = useRef([]);

  useLayoutEffect(() => {
    if (!panelRef.current) return undefined;

    const tags = tagRefs.current.filter(Boolean);
    const ctx = gsap.context(() => {
      gsap.set(panelRef.current, {
        autoAlpha: 0,
        y: 12,
        height: 0,
        marginTop: 0,
        overflow: 'hidden',
      });
      gsap.set(tags, { autoAlpha: 0, y: 8 });
    }, panelRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!panelRef.current) return undefined;

    const tags = tagRefs.current.filter(Boolean);
    gsap.killTweensOf([panelRef.current, ...tags]);

    if (hovered) {
      gsap.to(panelRef.current, {
        autoAlpha: 1,
        y: 0,
        height: 'auto',
        marginTop: 18,
        duration: 0.28,
        ease: 'power3.out',
        overwrite: true,
      });
      gsap.to(tags, {
        autoAlpha: 1,
        y: 0,
        duration: 0.22,
        stagger: 0.025,
        ease: 'power3.out',
        delay: 0.03,
        overwrite: true,
      });
      return undefined;
    }

    gsap.to(tags, {
      autoAlpha: 0,
      y: 6,
      duration: 0.14,
      stagger: 0.015,
      ease: 'power2.in',
      overwrite: true,
    });
    gsap.to(panelRef.current, {
      autoAlpha: 0,
      y: 10,
      height: 0,
      marginTop: 0,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: true,
    });

    return undefined;
  }, [hovered]);

  return (
    <>
      <CardChrome hovered={hovered} icon={<Code2 size={18} color={iconColor} />} />

      <div className="cs-card-head">
        <MetricLabel>LeetCode Console</MetricLabel>
        <MetricValue target={280} className="cs-stat-lead" />
        <p className="cs-support-copy">Problems solved with a deep bias toward interview-grade patterns and long-form repetition.</p>
      </div>

      <div className="cs-difficulty">
        {difficulty.map((item, index) => (
          <div key={item.label} className="cs-difficulty-row">
            <div className="cs-difficulty-meta">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="cs-difficulty-track">
              <motion.div
                className="cs-difficulty-fill"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div ref={panelRef} className="cs-hover-panel">
        <p className="cs-hover-label">Problem clusters</p>
        <div className="cs-tag-cloud">
          {topics.map((topic, index) => (
            <span
              key={topic}
              ref={(node) => {
                tagRefs.current[index] = node;
              }}
              className="cs-tag"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function LeetCodeCard({ style }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const difficulty = [
    { label: 'Easy', value: 38 },
    { label: 'Medium', value: 46 },
    { label: 'Hard', value: 16 },
  ];

  return (
    <PremiumCard
      style={{ ...style, padding: '28px', display: 'flex', flexDirection: 'column' }}
      onClick={() => window.open('https://leetcode.com', '_blank', 'noopener,noreferrer')}
    >
      {(hovered) => (
        <LeetCodeCardInner
          hovered={hovered}
          difficulty={difficulty}
          iconColor={isLight ? 'rgba(153, 126, 88, 0.96)' : T.blueGrey}
        />
      )}
    </PremiumCard>
  );
}

function GFGCard({ style }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const stats = [
    { label: 'Profile strength', value: 'Steady' },
    { label: 'Practice cadence', value: 'Weekly' },
    { label: 'Core focus', value: 'DSA' },
  ];

  return (
    <PremiumCard
      style={{ ...style, padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      onClick={() => window.open('https://geeksforgeeks.org', '_blank', 'noopener,noreferrer')}
    >
      {(hovered) => (
        <>
          <CardChrome hovered={hovered} icon={<Terminal size={18} color={isLight ? 'rgba(153, 126, 88, 0.96)' : T.silver} />} />

          <div className="cs-platform-stack">
            <MetricLabel>GeeksforGeeks</MetricLabel>
            <MetricValue target={120} />
            <p className="cs-support-copy">A quieter profile layer for foundational repetitions, speed work, and structured problem review.</p>
          </div>

          <div className="cs-profile-preview">
            <motion.div
              className="cs-profile-underline"
              animate={{ scaleX: hovered ? 1 : 0.34, opacity: hovered ? 1 : 0.5 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                className="cs-profile-row"
                animate={{ x: hovered ? 0 : -2, opacity: hovered ? 1 : 0.84 }}
                transition={{ duration: 0.28, delay: index * 0.04 }}
              >
                <span>{item.label}</span>
                <span>{item.value}</span>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </PremiumCard>
  );
}

function PythonCard({ style }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const lines = ['def solve(case):', '    trace(case)', '    return publish(result)'];

  return (
    <PremiumCard style={{ ...style, padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {(hovered) => (
        <>
          <CardChrome hovered={hovered} icon={<GitBranch size={18} color={isLight ? 'rgba(153, 126, 88, 0.96)' : T.gold} />} link={false} />

          <div className="cs-terminal-window">
            <div className="cs-terminal-topbar">
              <span />
              <span />
              <span />
            </div>
            <div className="cs-terminal-body">
              {lines.map((line, index) => (
                <motion.p
                  key={line}
                  className="cs-terminal-line"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.18 + index * 0.12 }}
                >
                  <span className="cs-terminal-index">0{index + 1}</span>
                  <span>{line}</span>
                  {index === lines.length - 1 && <motion.span className="cs-cursor" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="cs-platform-stack">
            <MetricLabel>Python Problems</MetricLabel>
            <MetricValue target={150} />
            <p className="cs-support-copy">Created and published with a terminal-first workflow, balancing scripting discipline and implementation speed.</p>
          </div>
        </>
      )}
    </PremiumCard>
  );
}

function DSACore({ style }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <PremiumCard style={{ ...style, padding: '34px 36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} delay={0.08}>
      {(hovered) => (
        <div className="cs-core">
          <div className="cs-core-visual">
            <motion.div
              className="cs-core-ring ring-a"
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="cs-core-ring ring-b"
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="cs-core-ring ring-c"
              animate={{ rotate: 360 }}
              transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
            />

            <svg className="cs-core-network" viewBox="0 0 320 320">
              <motion.path
                d="M86 184 L122 122 L167 152 L214 98 L246 138"
                fill="none"
                stroke={isLight ? 'rgba(146, 124, 91, 0.58)' : 'rgba(194,202,211,0.6)'}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray="8 12"
                animate={{ pathLength: [0.12, 1, 0.12], opacity: [0.28, 0.82, 0.28] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.path
                d="M96 208 L146 226 L190 192 L236 214"
                fill="none"
                stroke={isLight ? 'rgba(124, 146, 168, 0.54)' : 'rgba(164,178,191,0.42)'}
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="5 14"
                animate={{ pathLength: [0.18, 1, 0.18], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />
              {[
                [86, 184], [122, 122], [167, 152], [214, 98], [246, 138], [96, 208], [146, 226], [190, 192], [236, 214],
              ].map(([cx, cy], index) => (
                <motion.circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r={index === 2 ? 4.8 : 3.4}
                  fill={
                    isLight
                      ? index === 2
                        ? 'rgba(164, 139, 102, 0.94)'
                        : 'rgba(126, 145, 165, 0.82)'
                      : index === 2
                        ? 'rgba(235, 238, 240, 0.95)'
                        : 'rgba(160, 176, 193, 0.78)'
                  }
                  animate={{ opacity: [0.34, 1, 0.34], scale: [1, 1.12, 1] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.17 }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              ))}
            </svg>

            <motion.div
              className="cs-core-orbit orbit-a"
              animate={{ rotate: 360 }}
              transition={{ duration: 7.2, repeat: Infinity, ease: 'linear' }}
            >
              <span />
            </motion.div>
            <motion.div
              className="cs-core-orbit orbit-b"
              animate={{ rotate: -360 }}
              transition={{ duration: 9.5, repeat: Infinity, ease: 'linear' }}
            >
              <span />
            </motion.div>
            <motion.div
              className="cs-core-orbit orbit-c"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              <span />
            </motion.div>

            <motion.div
              className="cs-core-pulse"
              animate={{ scale: [1, 1.16, 1], opacity: [0.28, 0.08, 0.28] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="cs-core-center-icon">
              <Activity size={22} color={isLight ? 'rgba(134, 111, 82, 0.95)' : 'rgba(216, 220, 225, 0.8)'} />
            </div>
          </div>

          <div className="cs-core-copy">
            <MetricLabel>Problem Solver</MetricLabel>
            <MetricValue target={400} className="cs-core-total" />
            <p className="cs-core-body">
              Building algorithmic thinking through deliberate daily practice, pattern recognition, and clean execution under pressure.
            </p>
            <div className="cs-core-platforms">
              {['LeetCode', 'GeeksforGeeks', 'Python'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <motion.div
              className="cs-core-signal"
              animate={{ opacity: hovered ? 1 : 0.72, scaleX: hovered ? 1 : 0.82 }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
      )}
    </PremiumCard>
  );
}

function JourneyCard({ style }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
        },
      });

      timeline.fromTo(
        '.cs-journey-progress',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.4, ease: 'power3.out' }
      );

      timeline.fromTo(
        '.cs-journey-node',
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.42,
          stagger: 0.16,
          ease: 'back.out(2.2)',
        },
        0.24
      );

      timeline.fromTo(
        '.cs-journey-pulse',
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.52,
          stagger: 0.16,
          ease: 'power2.out',
        },
        0.32
      );

      timeline.fromTo(
        '.cs-journey-item',
        { y: 26, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.14,
          ease: 'power3.out',
        },
        0.38
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const milestones = [
    { year: '2023', title: 'Started Coding', note: 'Learned the rhythm of debugging and repetition.' },
    { year: 'Mid 2023', title: 'First 50 Problems', note: 'Built consistency around arrays, strings, and maps.' },
    { year: 'Early 2024', title: '100 Problems', note: 'Shifted from memorizing to spotting transferable patterns.' },
    { year: '2025', title: 'Hackathons', note: 'Applied problem solving in competitive, real-time settings.' },
    { year: 'Present', title: '400+ Total', note: 'A durable practice system with sharper algorithmic instincts.' },
  ];

  return (
    <PremiumCard style={{ ...style, padding: '30px 32px' }} delay={0.22}>
      {() => (
        <div ref={rootRef} className="cs-journey">
          <div className="cs-journey-head">
            <MetricLabel>Problem Solving Journey</MetricLabel>
            <p className="cs-section-blurb">A timeline of discipline rather than isolated streaks.</p>
          </div>

          <div className="cs-journey-track">
            <div className="cs-journey-line" />
            <div className="cs-journey-progress" />
            {milestones.map((item) => (
              <div key={item.title} className="cs-journey-stop">
                <div className="cs-journey-pulse" />
                <div className="cs-journey-node" />
              </div>
            ))}
          </div>

          <div className="cs-journey-grid">
            {milestones.map((item) => (
              <div key={item.title} className="cs-journey-item">
                <p className="cs-journey-year">{item.year}</p>
                <p className="cs-journey-title">{item.title}</p>
                <p className="cs-journey-note">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PremiumCard>
  );
}

function AchievementsCard({ style }) {
  const trophies = [
    { title: '5th Place National Hackathon', meta: 'Competitive build pressure, shipping speed, and teamwork.' },
    { title: '280+ LeetCode Solved', meta: 'Pattern library built through deliberate repetition.' },
  ];

  return (
    <PremiumCard style={{ ...style, padding: '26px', display: 'flex', flexDirection: 'column' }} delay={0.28}>
      {(hovered) => (
        <>
          <div className="cs-vault-head">
            <MetricLabel>Achievement Vault</MetricLabel>
            <motion.div
              className="cs-vault-shine"
              animate={{ x: hovered ? '140%' : '-40%', opacity: hovered ? 0.95 : 0.25 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </div>

          <div className="cs-vault-list">
            {trophies.map((item, index) => (
              <motion.div
                key={item.title}
                className="cs-vault-item"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: 0.12 + index * 0.08 }}
              >
                <div className="cs-vault-medal">
                  <Trophy size={13} color={index === 0 ? T.gold : T.silver} />
                </div>
                <div>
                  <p className="cs-vault-title">{item.title}</p>
                  <p className="cs-vault-meta">{item.meta}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="cs-vault-footer">
            <ShieldCheck size={14} color={T.blueGrey} />
            <span>Proof of consistent work, not vanity metrics.</span>
          </div>
        </>
      )}
    </PremiumCard>
  );
}

export default function CodingStats() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cs-header-line',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.cs-header-meta',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.cs-section-shell',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 78%' },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="coding-stats-section"
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: 'var(--section-pad-y)',
        paddingBottom: 'var(--section-pad-y)',
        paddingLeft: 'var(--section-pad-x)',
        paddingRight: 'var(--section-pad-x)',
        overflow: 'hidden',
      }}
    >
      <div className="cs-shell cs-section-shell">
        <div className="cs-header">
          <div className="cs-header-row">
            <div className="cs-header-line" />
            <span className="cs-header-kicker cs-header-meta">Command Center</span>
          </div>
          <h2 className="cs-header-title cs-header-meta">
            Algorithmic <em>Discipline</em>
          </h2>
          <p className="cs-header-copy cs-header-meta">
            A cinematic snapshot of sustained problem solving across platforms, practice systems, and competitive execution.
          </p>
        </div>

        <div className="coding-bento">
          <LeetCodeCard style={{ gridColumn: '1', gridRow: '1 / 3' }} />
          <DSACore style={{ gridColumn: '2 / 4', gridRow: '1 / 3' }} />
          <GFGCard style={{ gridColumn: '4', gridRow: '1' }} />
          <PythonCard style={{ gridColumn: '4', gridRow: '2' }} />
          <JourneyCard style={{ gridColumn: '1 / 4', gridRow: '3' }} />
          <AchievementsCard style={{ gridColumn: '4', gridRow: '3' }} />
        </div>
      </div>

      <style>{`
        .coding-stats-section {
          --cs-divider: rgba(255,255,255,0.08);
          --cs-faint: rgba(255,255,255,0.04);
          --cs-copy: rgba(215, 219, 224, 0.78);
          --cs-muted: rgba(148, 153, 160, 0.76);
          --cs-muted-strong: rgba(186, 192, 198, 0.92);
          --cs-beige: rgba(190, 178, 151, 0.92);
        }

        .cs-shell {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
        }

        .cs-header {
          position: relative;
          margin-bottom: 34px;
          max-width: 760px;
        }

        .cs-header-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
        }

        .cs-header-line {
          width: 42px;
          height: 1px;
          background: linear-gradient(90deg, rgba(224,228,232,0.9), rgba(224,228,232,0));
          transform-origin: left center;
        }

        .cs-header-kicker,
        .cs-metric-label,
        .cs-hover-label,
        .cs-journey-year {
          margin: 0;
          color: var(--cs-muted);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-family: var(--font-mono, monospace);
        }

        .cs-header-title {
          margin: 0;
          font-size: clamp(2rem, 4vw, 3.65rem);
          line-height: 1.02;
          font-weight: 300;
          letter-spacing: -0.04em;
          color: ${T.textPrimary};
        }

        .cs-header-title em {
          color: rgba(202, 210, 218, 0.76);
          font-style: italic;
          font-weight: 300;
        }

        .cs-header-copy,
        .cs-support-copy,
        .cs-core-body,
        .cs-section-blurb,
        .cs-vault-meta,
        .cs-journey-note {
          margin: 0;
          color: var(--cs-copy);
          font-size: 13px;
          line-height: 1.72;
        }

        .cs-header-copy {
          max-width: 620px;
          margin-top: 12px;
        }

        .coding-bento {
          display: grid;
          grid-template-columns: 1.05fr 1.12fr 1.12fr 1.06fr;
          grid-template-rows: 290px 290px 266px;
          gap: 16px;
          align-items: stretch;
        }

        .cs-card {
          min-width: 0;
          will-change: transform;
        }

        .cs-card-base,
        .cs-card-noise,
        .cs-card-particles,
        .cs-card-trace,
        .cs-card-light,
        .cs-card-content {
          position: absolute;
          inset: 0;
        }

        .cs-card-base {
          background:
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0) 18%),
            radial-gradient(circle at 20% 18%, rgba(167,177,188,0.08), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,0.015), rgba(0,0,0,0));
        }

        .cs-card-noise {
          opacity: 0.12;
          background-image: radial-gradient(rgba(255,255,255,0.5) 0.6px, transparent 0.6px);
          background-size: 12px 12px;
          mix-blend-mode: soft-light;
        }

        .cs-card-particles {
          opacity: 0.45;
        }

        .cs-card-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 999px;
          background: rgba(235, 239, 242, 0.65);
          box-shadow: 0 0 18px rgba(221,225,229,0.24);
          will-change: transform, opacity;
        }

        .particle-1 { top: 16%; left: 14%; }
        .particle-2 { top: 28%; right: 18%; }
        .particle-3 { bottom: 18%; left: 30%; }
        .particle-4 { bottom: 24%; right: 24%; }

        .cs-card-trace {
          inset: 0;
          border-radius: inherit;
          background:
            linear-gradient(135deg, rgba(208,214,220,0.12), transparent 24%, transparent 76%, rgba(208,214,220,0.16)),
            linear-gradient(180deg, rgba(255,255,255,0.08), transparent 14%);
          pointer-events: none;
          will-change: opacity, transform;
        }

        .cs-card-light {
          overflow: hidden;
          pointer-events: none;
          will-change: opacity;
        }

        .cs-card-light-orb {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          transform: translate3d(-50%, -50%, 0);
          background: radial-gradient(circle, rgba(236,239,242,0.14) 0%, rgba(236,239,242,0.08) 34%, transparent 70%);
          filter: blur(24px);
          will-change: transform;
        }

        .cs-card-content {
          position: relative;
          z-index: 1;
          inset: auto;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .cs-card-chrome {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .cs-card-icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
          display: grid;
          place-items: center;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .cs-card-beacon {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(210, 192, 147, 0.9);
          box-shadow: 0 0 16px rgba(210, 192, 147, 0.24);
        }

        .cs-metric-value {
          font-size: clamp(2.4rem, 4vw, 4rem);
          line-height: 0.95;
          letter-spacing: -0.06em;
          font-weight: 300;
          color: ${T.textPrimary};
        }

        .cs-stat-lead {
          margin-bottom: 8px;
        }

        .cs-card-head,
        .cs-platform-stack {
          position: relative;
          z-index: 1;
        }

        .cs-support-copy {
          margin-top: 10px;
          max-width: 240px;
          color: var(--cs-muted-strong);
        }

        .cs-difficulty {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cs-difficulty-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cs-difficulty-meta,
        .cs-profile-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: var(--cs-muted-strong);
          font-size: 11px;
          line-height: 1.4;
        }

        .cs-difficulty-track {
          height: 4px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,0.06);
        }

        .cs-difficulty-fill {
          height: 100%;
          transform-origin: left center;
          border-radius: inherit;
          background: linear-gradient(90deg, rgba(225,228,232,0.18), rgba(225,228,232,0.78));
        }

        .cs-hover-panel {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .cs-hover-label {
          margin-bottom: 12px;
        }

        .cs-tag-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .cs-tag,
        .cs-core-platforms span {
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: var(--cs-muted-strong);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: var(--font-mono, monospace);
        }

        .cs-profile-preview {
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
          position: relative;
        }

        .cs-profile-underline {
          position: absolute;
          top: -1px;
          left: 0;
          width: 56%;
          height: 1px;
          transform-origin: left center;
          background: linear-gradient(90deg, rgba(219,223,227,0.88), transparent);
        }

        .cs-profile-row + .cs-profile-row {
          margin-top: 10px;
        }

        .cs-terminal-window {
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
          overflow: hidden;
          margin-bottom: 20px;
        }

        .cs-terminal-topbar {
          display: flex;
          gap: 6px;
          padding: 10px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .cs-terminal-topbar span {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: rgba(255,255,255,0.2);
        }

        .cs-terminal-body {
          padding: 12px 14px 14px;
        }

        .cs-terminal-line {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          color: rgba(219,224,228,0.88);
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          line-height: 1.7;
        }

        .cs-terminal-index {
          color: rgba(139, 148, 157, 0.8);
          min-width: 16px;
        }

        .cs-cursor {
          display: inline-block;
          width: 8px;
          height: 1em;
          margin-left: 6px;
          vertical-align: middle;
          background: rgba(223,226,229,0.9);
        }

        .cs-core {
          display: grid;
          grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
          align-items: center;
          gap: 34px;
          width: 100%;
          height: 100%;
        }

        .cs-core-visual {
          position: relative;
          width: min(100%, 300px);
          aspect-ratio: 1;
          margin: 0 auto;
        }

        .cs-core-ring,
        .cs-core-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
        }

        .cs-core-ring {
          border: 1px solid rgba(255,255,255,0.06);
        }

        .ring-a {
          inset: 8%;
          border-top-color: rgba(220,225,229,0.5);
        }

        .ring-b {
          inset: 20%;
          border-right-color: rgba(182,191,201,0.45);
        }

        .ring-c {
          inset: 33%;
          border-bottom-color: rgba(190,177,144,0.36);
        }

        .cs-core-network {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.96;
        }

        .cs-core-orbit {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
        }

        .cs-core-orbit span {
          display: block;
          width: 10px;
          height: 10px;
          margin-top: 8px;
          border-radius: 50%;
          background: rgba(233,236,239,0.95);
          box-shadow: 0 0 18px rgba(232,236,240,0.24);
        }

        .orbit-b span {
          width: 8px;
          height: 8px;
          margin-top: auto;
          margin-bottom: 16px;
          background: rgba(177,191,203,0.92);
        }

        .orbit-c span {
          width: 6px;
          height: 6px;
          margin-top: 56px;
          margin-left: auto;
          margin-right: 22px;
          background: rgba(198,179,135,0.9);
        }

        .cs-core-pulse {
          inset: 38%;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 0 0 14px rgba(255,255,255,0.015);
        }

        .cs-core-center-icon {
          position: absolute;
          inset: 41%;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(11,11,11,0.88);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .cs-core-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          min-width: 0;
        }

        .cs-core-total {
          font-size: clamp(3.7rem, 7vw, 6rem);
          margin-top: 6px;
        }

        .cs-core-body {
          margin-top: 14px;
          max-width: 380px;
        }

        .cs-core-platforms {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        .cs-core-signal {
          width: min(100%, 240px);
          height: 1px;
          margin-top: 20px;
          transform-origin: left center;
          background: linear-gradient(90deg, rgba(224,228,232,0.88), rgba(224,228,232,0));
        }

        .cs-journey {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }

        .cs-journey-head {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-end;
          margin-bottom: 24px;
        }

        .cs-section-blurb {
          max-width: 320px;
          text-align: right;
        }

        .cs-journey-track {
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          align-items: center;
          margin-bottom: 24px;
        }

        .cs-journey-line,
        .cs-journey-progress {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          transform: translateY(-50%);
        }

        .cs-journey-line {
          background: rgba(255,255,255,0.08);
        }

        .cs-journey-progress {
          background: linear-gradient(90deg, rgba(236,239,242,0.9), rgba(167,178,189,0.35));
          transform-origin: left center;
        }

        .cs-journey-stop {
          position: relative;
          display: flex;
          justify-content: center;
          z-index: 1;
        }

        .cs-journey-node,
        .cs-journey-pulse {
          border-radius: 50%;
        }

        .cs-journey-node {
          width: 12px;
          height: 12px;
          background: rgba(14,14,14,0.96);
          border: 1.5px solid rgba(234,238,242,0.78);
          box-shadow: 0 0 0 5px rgba(255,255,255,0.02);
        }

        .cs-journey-pulse {
          position: absolute;
          width: 24px;
          height: 24px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255,255,255,0.1);
          opacity: 0;
        }

        .cs-journey-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          margin-top: auto;
        }

        .cs-journey-item {
          min-width: 0;
        }

        .cs-journey-year {
          margin-bottom: 8px;
        }

        .cs-journey-title,
        .cs-vault-title {
          margin: 0 0 6px;
          color: ${T.textPrimary};
          font-size: 13px;
          line-height: 1.4;
        }

        .cs-journey-note {
          color: var(--cs-muted);
          font-size: 11px;
          line-height: 1.55;
        }

        .cs-vault-head {
          position: relative;
          overflow: hidden;
          padding-bottom: 14px;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .cs-vault-shine {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 38%;
          background: linear-gradient(90deg, transparent, rgba(245,234,205,0.22), transparent);
          filter: blur(10px);
        }

        .cs-vault-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cs-vault-item {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 12px;
          align-items: flex-start;
        }

        .cs-vault-medal {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .cs-vault-meta {
          color: var(--cs-muted);
          font-size: 11px;
          line-height: 1.5;
        }

        .cs-vault-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: auto;
          padding-top: 16px;
          color: var(--cs-muted-strong);
          font-size: 11px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        [data-theme="light"] .coding-stats-section {
          --cs-copy: rgba(72, 60, 44, 0.92);
          --cs-muted: rgba(127, 109, 86, 0.88);
          --cs-muted-strong: rgba(58, 48, 36, 0.92);
          --cs-beige: rgba(200, 169, 126, 0.9);
        }

        [data-theme="light"] .coding-stats-section .cs-header-title {
          color: #1f1d1b;
          text-shadow: 0 1px 0 rgba(255,255,255,0.6);
        }

        [data-theme="light"] .coding-stats-section .cs-header-title em {
          color: rgba(176, 148, 108, 0.96);
          text-shadow: 0 1px 0 rgba(255,255,255,0.72);
        }

        [data-theme="light"] .coding-stats-section .cs-header-line {
          background: linear-gradient(90deg, rgba(200,169,126,0.7), rgba(200,169,126,0));
        }

        [data-theme="light"] .coding-stats-section .cs-card-base {
          background:
            linear-gradient(180deg, rgba(255,255,255,0.68), rgba(255,255,255,0.06) 24%),
            radial-gradient(circle at 18% 16%, rgba(213,194,164,0.20), transparent 34%),
            linear-gradient(180deg, rgba(255,248,239,0.42), rgba(244,238,228,0.14));
        }

        [data-theme="light"] .coding-stats-section .cs-card-noise {
          opacity: 0.06;
          mix-blend-mode: multiply;
        }

        [data-theme="light"] .coding-stats-section .cs-card-particles {
          opacity: 0.3;
        }

        [data-theme="light"] .coding-stats-section .cs-card-particle {
          background: rgba(178, 154, 114, 0.55);
          box-shadow: 0 0 12px rgba(200,169,126,0.14);
        }

        [data-theme="light"] .coding-stats-section .cs-card-trace {
          background:
            linear-gradient(135deg, rgba(200,169,126,0.22), transparent 24%, transparent 76%, rgba(174,153,125,0.18)),
            linear-gradient(180deg, rgba(255,255,255,0.52), transparent 14%);
        }

        [data-theme="light"] .coding-stats-section .cs-card-light-orb {
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(225,210,186,0.34) 34%, transparent 72%);
          filter: blur(30px);
        }

        [data-theme="light"] .coding-stats-section .cs-card-icon-wrap,
        [data-theme="light"] .coding-stats-section .cs-vault-medal {
          border-color: rgba(74, 60, 42, 0.08);
          background: rgba(255,255,255,0.44);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.85);
        }

        [data-theme="light"] .coding-stats-section .cs-card-icon-wrap svg,
        [data-theme="light"] .coding-stats-section .cs-vault-medal svg,
        [data-theme="light"] .coding-stats-section .cs-vault-footer svg {
          color: rgba(153, 126, 88, 0.96) !important;
          stroke: rgba(153, 126, 88, 0.96) !important;
        }

        [data-theme="light"] .coding-stats-section .cs-card-chrome > div:last-child svg {
          color: rgba(132, 110, 82, 0.72) !important;
          stroke: rgba(132, 110, 82, 0.72) !important;
        }

        [data-theme="light"] .coding-stats-section .cs-card-beacon {
          background: rgba(200,169,126,0.92);
          box-shadow: 0 0 14px rgba(200,169,126,0.18);
        }

        [data-theme="light"] .coding-stats-section .cs-difficulty-track,
        [data-theme="light"] .coding-stats-section .cs-profile-preview,
        [data-theme="light"] .coding-stats-section .cs-hover-panel,
        [data-theme="light"] .coding-stats-section .cs-vault-head,
        [data-theme="light"] .coding-stats-section .cs-vault-footer,
        [data-theme="light"] .coding-stats-section .cs-terminal-topbar,
        [data-theme="light"] .coding-stats-section .cs-journey-line {
          border-color: rgba(74, 60, 42, 0.08);
        }

        [data-theme="light"] .coding-stats-section .cs-difficulty-track {
          background: rgba(74, 60, 42, 0.08);
        }

        [data-theme="light"] .coding-stats-section .cs-difficulty-fill {
          background: linear-gradient(90deg, rgba(200,169,126,0.38), rgba(138,118,94,0.92));
        }

        [data-theme="light"] .coding-stats-section .cs-tag,
        [data-theme="light"] .coding-stats-section .cs-core-platforms span {
          border-color: rgba(74, 60, 42, 0.08);
          background: rgba(255,255,255,0.48);
          color: rgba(84, 66, 42, 0.9);
        }

        [data-theme="light"] .coding-stats-section .cs-terminal-window {
          border-color: rgba(74, 60, 42, 0.08);
          background: linear-gradient(180deg, rgba(255,255,255,0.54), rgba(245,239,229,0.42));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
        }

        [data-theme="light"] .coding-stats-section .cs-terminal-topbar span {
          background: rgba(74, 60, 42, 0.16);
        }

        [data-theme="light"] .coding-stats-section .cs-terminal-line,
        [data-theme="light"] .coding-stats-section .cs-journey-title,
        [data-theme="light"] .coding-stats-section .cs-vault-title {
          color: rgba(38, 33, 26, 0.96);
        }

        [data-theme="light"] .coding-stats-section .cs-terminal-index,
        [data-theme="light"] .coding-stats-section .cs-journey-note,
        [data-theme="light"] .coding-stats-section .cs-vault-meta {
          color: rgba(105, 90, 70, 0.82);
        }

        [data-theme="light"] .coding-stats-section .cs-cursor {
          background: rgba(84, 66, 42, 0.82);
        }

        [data-theme="light"] .coding-stats-section .cs-core-ring {
          border-color: rgba(74, 60, 42, 0.08);
        }

        [data-theme="light"] .coding-stats-section .ring-a {
          border-top-color: rgba(150,124,91,0.78);
        }

        [data-theme="light"] .coding-stats-section .ring-b {
          border-right-color: rgba(122,140,160,0.66);
        }

        [data-theme="light"] .coding-stats-section .ring-c {
          border-bottom-color: rgba(200,169,126,0.72);
        }

        [data-theme="light"] .coding-stats-section .cs-core-pulse {
          border-color: rgba(74, 60, 42, 0.08);
          box-shadow: 0 0 0 14px rgba(200,169,126,0.06);
        }

        [data-theme="light"] .coding-stats-section .cs-core-center-icon {
          border-color: rgba(74, 60, 42, 0.08);
          background: rgba(255,252,247,0.92);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);
        }

        [data-theme="light"] .coding-stats-section .cs-core-center-icon svg {
          color: rgba(134, 111, 82, 0.95) !important;
          stroke: rgba(134, 111, 82, 0.95) !important;
        }

        [data-theme="light"] .coding-stats-section .cs-core-signal {
          background: linear-gradient(90deg, rgba(150,124,91,0.7), rgba(150,124,91,0));
        }

        [data-theme="light"] .coding-stats-section .cs-journey-progress {
          background: linear-gradient(90deg, rgba(200,169,126,0.92), rgba(153,128,98,0.34));
        }

        [data-theme="light"] .coding-stats-section .cs-journey-node {
          background: rgba(255,252,247,0.95);
          border-color: rgba(150,124,91,0.66);
          box-shadow: 0 0 0 5px rgba(200,169,126,0.06);
        }

        [data-theme="light"] .coding-stats-section .cs-journey-pulse {
          border-color: rgba(150,124,91,0.18);
        }

        [data-theme="light"] .coding-stats-section .cs-core-network {
          opacity: 1;
        }

        [data-theme="light"] .coding-stats-section .cs-core-orbit span {
          background: rgba(133, 150, 170, 0.92);
          box-shadow: 0 0 16px rgba(133, 150, 170, 0.18);
        }

        [data-theme="light"] .coding-stats-section .orbit-b span {
          background: rgba(161, 136, 101, 0.88);
        }

        [data-theme="light"] .coding-stats-section .orbit-c span {
          background: rgba(206, 175, 128, 0.92);
          box-shadow: 0 0 16px rgba(206, 175, 128, 0.16);
        }

        @media (max-width: 1080px) {
          .coding-bento {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: auto;
          }

          .coding-bento > * {
            grid-column: auto !important;
            grid-row: auto !important;
            min-height: 260px;
          }

          .cs-core {
            grid-template-columns: 1fr;
            gap: 20px;
            text-align: center;
          }

          .cs-core-copy {
            align-items: center;
          }

          .cs-journey-head {
            flex-direction: column;
            align-items: flex-start;
          }

          .cs-section-blurb {
            text-align: left;
          }

          .cs-journey-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .cs-journey-track {
            grid-template-columns: 1fr;
            gap: 22px;
            margin-left: 11px;
            margin-bottom: 18px;
          }

          .cs-journey-line,
          .cs-journey-progress {
            left: 0;
            right: auto;
            top: 0;
            bottom: 0;
            width: 1px;
            height: auto;
            transform: none;
          }

          .cs-journey-progress {
            transform-origin: top center;
          }

          .cs-journey-stop {
            justify-content: flex-start;
            min-height: 28px;
          }
        }

        @media (max-width: 720px) {
          .coding-bento {
            grid-template-columns: 1fr;
          }

          .cs-header {
            margin-bottom: 26px;
          }

          .cs-card {
            min-height: 240px;
          }

          .cs-core-total {
            font-size: clamp(3rem, 16vw, 4.5rem);
          }

          .cs-card-head,
          .cs-platform-stack {
            max-width: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cs-card,
          .cs-core-orbit,
          .cs-core-ring,
          .cs-card-particle,
          .cs-vault-shine,
          .cs-atmosphere-ray {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
