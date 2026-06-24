import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function useMouseParallax(strength = 24) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 24 });
  const x = useTransform(smoothX, [-0.5, 0.5], [-strength, strength]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-strength, strength]);

  useEffect(() => {
    const onMove = (event) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [mouseX, mouseY]);

  return { x, y };
}
