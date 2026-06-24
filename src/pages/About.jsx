import { motion } from 'framer-motion';
import { editorialImages } from '../data/products.js';
import { clipReveal, fadeUp } from '../utils/animations.js';

const items = [
  ['Brand Intro', 'Mad’ora is a modern men’s streetwear clothing brand focused on delivering oversized fits, baggy denim, stylish basics, and everyday essentials for the new generation.'],
  ['Mission', 'Deliver high-quality men’s streetwear and stylish everyday fashion at accessible prices.'],
  ['Vision', 'To build a trusted and recognizable men’s fashion brand in India.'],
  ['USP', 'Premium men’s streetwear plus stylish everyday fashion for Gen Z.'],
  ['Future Goals', 'Build stronger drops, smarter fits, and a recognizable men’s streetwear identity.'],
];

export default function About() {
  return (
    <div className="px-4 pb-24 pt-40 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div><p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-black/45">About Mad’ora</p><h1 className="text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-8xl">Built For India’s New Generation</h1></div>
          <motion.img variants={clipReveal} initial="hidden" animate="visible" className="h-[560px] w-full object-cover" src={editorialImages.studioSet} alt="Mad'ora men's streetwear about" />
        </div>
        <div className="mt-20 border-l border-black/15">
          {items.map(([title, copy], index) => (
            <motion.div className="relative grid gap-4 border-b border-black/10 py-10 pl-8 md:grid-cols-[220px_1fr]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={title}>
              <span className="absolute -left-[7px] top-11 h-3 w-3 rounded-full bg-ink" />
              <h2 className="text-2xl font-black uppercase">{title}</h2>
              <p className="max-w-3xl text-lg leading-8 text-black/60">{copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
