import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ExpandableTabs } from './ui/expandable-tabs';
import { Home, Briefcase, User, Mail } from 'lucide-react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const topNavTabs = [
    { title: 'Home', icon: Home },
    { type: 'separator' },
    { title: 'About', icon: User },
    { type: 'separator' },
    { title: 'Work', icon: Briefcase },
    { type: 'separator' },
    { title: 'Contact', icon: Mail },
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
        zIndex: 100, // Very high z-index to stay above everything
        pointerEvents: hidden ? 'none' : 'auto',
      }}
    >
      <ExpandableTabs tabs={topNavTabs} />
    </motion.div>
  );
}
