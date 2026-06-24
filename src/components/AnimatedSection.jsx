import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations.js';

export default function AnimatedSection({ children, className = '', amount = 0.18, delay = 0 }) {
  return (
    <motion.section
      className={className}
      variants={{
        hidden: { ...fadeUp.hidden },
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.section>
  );
}
