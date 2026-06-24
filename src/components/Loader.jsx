import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [show, setShow] = useState(true);
  const letters = "MAD'ORA".split('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 420);
    }, 2350);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink text-offwhite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-[min(420px,82vw)] text-center">
            <div className="mb-4 flex justify-center gap-1 text-5xl font-black tracking-[0.08em] sm:text-7xl">
              {letters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: index * 0.085, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <motion.p
              className="text-xs font-bold uppercase tracking-[0.38em] text-white/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              New Gen Streetwear
            </motion.p>
            <div className="mx-auto mt-8 h-px w-full overflow-hidden bg-white/15">
              <motion.div
                className="h-full bg-offwhite"
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.45, delay: 0.55, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
