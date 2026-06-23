/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext({
  scrollTo: (target, options = {}) => {
    if (typeof window === 'undefined') return;
    const behavior = options.immediate ? 'auto' : 'smooth';

    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior });
      return;
    }

    const element =
      typeof target === 'string' ? document.querySelector(target) : target;

    if (element) {
      element.scrollIntoView({ behavior, block: 'start' });
    }
  },
});

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  const scrollTo = useCallback((target, options = {}) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, options);
      return;
    }

    const behavior = options.immediate ? 'auto' : 'smooth';
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior });
      return;
    }

    const element =
      typeof target === 'string' ? document.querySelector(target) : target;

    if (element) {
      element.scrollIntoView({ behavior, block: 'start' });
    }
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    window.addEventListener('load', refresh);
    refresh();

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value = useMemo(() => ({ scrollTo }), [scrollTo]);

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
