import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ExpandableTabs } from './ui/expandable-tabs';
import { Home, Briefcase, User, Mail, Code2 } from 'lucide-react';

import { ThemeToggle } from './ui/theme-toggle';
import { useSmoothScroll } from '../context/SmoothScrollContext';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const hiddenRef = useRef(false);
  const { scrollTo } = useSmoothScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const nextHidden = latest > previous && latest > 150;

    if (nextHidden !== hiddenRef.current) {
      hiddenRef.current = nextHidden;
      setHidden(nextHidden);
    }
  });

  const topNavTabs = [
    { title: 'Home', icon: Home, id: 'hero' },
    { type: 'separator' },
    { title: 'About', icon: User, id: 'about' },
    { type: 'separator' },
    { title: 'Stats', icon: Code2, id: 'coding-stats' },
    { type: 'separator' },
    { title: 'Work', icon: Briefcase, id: 'work' },
    { type: 'separator' },
    { title: 'Contact', icon: Mail, id: 'contact' },
  ];

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        top: '2rem',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        zIndex: 100, // Very high z-index to stay above everything
        pointerEvents: hidden ? 'none' : 'auto',
      }}
    >
      <ExpandableTabs 
        tabs={topNavTabs} 
        onChange={(index) => {
          if (index === null) return;
          const tab = topNavTabs[index];
          if (tab && tab.id) {
            if (tab.id === 'hero') {
              scrollTo(0);
            } else {
              const el = document.getElementById(tab.id);
              if (el) {
                scrollTo(el, { offset: -24 });
              }
            }
          }
        }}
      />
      <div style={{ pointerEvents: 'auto', position: 'absolute', right: '2rem' }}>
        <ThemeToggle />
      </div>
    </motion.div>
  );
}
