export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const pageTransition = {
  initial: { opacity: 0, y: prefersReduced() ? 0 : 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: prefersReduced() ? 0 : -12 },
  transition: { duration: prefersReduced() ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

export const clipReveal = {
  hidden: { clipPath: 'inset(16% 0 16% 0)', opacity: 0.2 },
  visible: {
    clipPath: 'inset(0% 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export const springPop = {
  type: 'spring',
  stiffness: 380,
  damping: 18,
};
