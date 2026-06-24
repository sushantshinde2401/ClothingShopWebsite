import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function Toast() {
  const { toast, setToast } = useCart();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(timer);
  }, [toast, setToast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="fixed right-4 top-24 z-[70] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-white/15 bg-ink px-4 py-3 text-sm font-semibold text-offwhite shadow-soft"
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 30, scale: 0.96 }}
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-offwhite text-ink"><Check size={14} /></span>
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
