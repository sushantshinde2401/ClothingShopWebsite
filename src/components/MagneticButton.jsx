import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

export default function MagneticButton({
  children,
  to,
  onClick,
  variant = 'dark',
  className = '',
  type = 'button',
  icon = true,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 250, damping: 18 });
  const smoothY = useSpring(y, { stiffness: 250, damping: 18 });
  const base =
    'group inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-[0.18em] transition-colors';
  const tone =
    variant === 'light'
      ? 'border border-white/40 bg-white text-ink hover:bg-offwhite'
      : variant === 'ghost'
        ? 'border border-current bg-transparent'
        : 'bg-ink text-offwhite hover:bg-charcoal';

  const props = {
    className: `${base} ${tone} ${className}`,
    style: { x: smoothX, y: smoothY },
    whileTap: { scale: 0.98 },
    onMouseMove: (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
      y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
    },
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
    },
  };

  const inner = (
    <>
      <span>{children}</span>
      {icon && <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={16} />}
    </>
  );

  if (to) {
    return (
      <MotionLink to={to} {...props}>
        {inner}
      </MotionLink>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...props}>
      {inner}
    </motion.button>
  );
}
